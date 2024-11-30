import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const paymentService = {
  async initializePayment(amount, currency = 'usd') {
    try {
      const response = await fetch(`${API_URL}/payment/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ amount, currency }),
      });

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      throw new Error('Failed to initialize payment');
    }
  },

  async handleCardPayment(clientSecret, paymentMethod) {
    try {
      const stripe = await stripePromise;
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod,
      });

      if (error) {
        throw new Error(error.message);
      }

      return paymentIntent;
    } catch (error) {
      throw new Error(`Payment failed: ${error.message}`);
    }
  },

  async initializeApplePay(amount, currency = 'usd') {
    try {
      const stripe = await stripePromise;
      const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency,
        total: {
          label: 'Eflix Subscription',
          amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      const canMakePayment = await paymentRequest.canMakePayment();
      if (!canMakePayment || !canMakePayment.applePay) {
        throw new Error('Apple Pay is not available');
      }

      return paymentRequest;
    } catch (error) {
      throw new Error(`Apple Pay initialization failed: ${error.message}`);
    }
  },

  async initializeCashApp(amount, currency = 'usd') {
    try {
      const stripe = await stripePromise;
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'cashapp',
        billing_details: {
          name: 'Cash App Payment',
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      return paymentMethod;
    } catch (error) {
      throw new Error(`Cash App initialization failed: ${error.message}`);
    }
  },

  async createSubscription(priceId) {
    try {
      const response = await fetch(`${API_URL}/subscriptions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ priceId }),
      });

      const subscription = await response.json();
      return subscription;
    } catch (error) {
      throw new Error('Failed to create subscription');
    }
  },

  async cancelSubscription(subscriptionId) {
    try {
      const response = await fetch(`${API_URL}/subscriptions/${subscriptionId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error('Failed to cancel subscription');
    }
  },
};

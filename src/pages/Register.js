import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

const steps = ['Create Account', 'Choose Plan', 'Payment Method'];

const plans = [
  {
    name: 'Basic',
    price: 8.99,
    quality: 'Good',
    resolution: '720p',
    devices: 1,
  },
  {
    name: 'Standard',
    price: 13.99,
    quality: 'Better',
    resolution: '1080p',
    devices: 2,
  },
  {
    name: 'Premium',
    price: 17.99,
    quality: 'Best',
    resolution: '4K+HDR',
    devices: 4,
  },
];

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    plan: 'Standard',
    paymentMethod: 'apple_pay',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
    navigate('/browse');
  };

  const AccountForm = () => (
    <Box component="form" sx={{ width: '100%' }}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
    </Box>
  );

  const PlanForm = () => (
    <Box sx={{ width: '100%' }}>
      <RadioGroup
        name="plan"
        value={formData.plan}
        onChange={handleChange}
      >
        {plans.map((plan) => (
          <FormControlLabel
            key={plan.name}
            value={plan.name}
            control={<Radio />}
            label={
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">{plan.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${plan.price}/month • {plan.quality} quality • {plan.resolution} • {plan.devices} device(s)
                </Typography>
              </Box>
            }
            sx={{
              border: '1px solid',
              borderColor: formData.plan === plan.name ? 'primary.main' : 'divider',
              borderRadius: 1,
              p: 2,
              mb: 2,
              width: '100%',
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );

  const PaymentForm = () => (
    <Box sx={{ width: '100%' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel
            value="apple_pay"
            control={<Radio />}
            label="Apple Pay"
          />
          <FormControlLabel
            value="cash_app"
            control={<Radio />}
            label="Cash App"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AccountForm />;
      case 1:
        return <PlanForm />;
      case 2:
        return <PaymentForm />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(https://source.unsplash.com/random/1920x1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 4, color: 'primary.main', fontWeight: 'bold' }}>
            Join EFLIX
          </Typography>

          <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            >
              {activeStep === steps.length - 1 ? 'Start Membership' : 'Next'}
            </Button>
          </Box>

          {activeStep === 0 && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" variant="body2">
                  Sign in
                </Link>
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;

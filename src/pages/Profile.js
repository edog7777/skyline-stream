import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { profileService } from '../services/profileService';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    plan: '',
    paymentMethod: '',
    autoRenew: true,
    notifications: {
      email: true,
      push: true,
    },
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const profile = await profileService.getUserProfile();
      setUserData(profile);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const updatedProfile = await profileService.updateProfile({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
      setUserData(prev => ({ ...prev, ...updatedProfile }));
      setEditMode(false);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = async (type, value) => {
    try {
      setLoading(true);
      const updatedNotifications = await profileService.updateNotificationPreferences({
        ...userData.notifications,
        [type]: value,
      });
      setUserData(prev => ({ ...prev, notifications: updatedNotifications }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionChange = async (autoRenew) => {
    try {
      setLoading(true);
      const updatedSubscription = await profileService.updateSubscription({
        plan: userData.plan,
        autoRenew,
      });
      setUserData(prev => ({ ...prev, ...updatedSubscription }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentMethodChange = async (method) => {
    try {
      // This would typically integrate with the actual payment provider's SDK
      const paymentToken = await requestPaymentMethodToken(method);
      setLoading(true);
      const updatedPayment = await profileService.updatePaymentMethod(method, paymentToken);
      setUserData(prev => ({ ...prev, paymentMethod: updatedPayment.paymentMethod }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const requestPaymentMethodToken = async (method) => {
    // This is a placeholder for the actual payment provider SDK integration
    if (method === 'apple_pay') {
      // Integrate with Apple Pay SDK here
      return 'mock_apple_pay_token';
    } else if (method === 'cash_app') {
      // Integrate with Cash App SDK here
      return 'mock_cash_app_token';
    }
    throw new Error('Unsupported payment method');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 12, pb: 6 }}>
      <Container maxWidth="md">
        {showSuccessAlert && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setShowSuccessAlert(false)}
          >
            Profile updated successfully!
          </Alert>
        )}

        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Account Settings
        </Typography>

        <Grid container spacing={4}>
          {/* Profile Information */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Profile Information</Typography>
                <Button
                  variant={editMode ? 'contained' : 'outlined'}
                  onClick={() => editMode ? handleSaveProfile() : setEditMode(true)}
                >
                  {editMode ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={(e) =>
                      setUserData({ ...userData, firstName: e.target.value })
                    }
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={(e) =>
                      setUserData({ ...userData, lastName: e.target.value })
                    }
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    disabled={!editMode}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Subscription */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Subscription Plan
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                  Current Plan: <strong>{userData.plan}</strong>
                </Typography>
                <Button variant="outlined" color="primary">
                  Change Plan
                </Button>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={userData.autoRenew}
                    onChange={(e) =>
                      handleSubscriptionChange(e.target.checked)
                    }
                  />
                }
                label="Auto-renew subscription"
              />
            </Paper>
          </Grid>

          {/* Payment Method */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Payment Method
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      border: '2px solid',
                      borderColor:
                        userData.paymentMethod === 'apple_pay'
                          ? 'primary.main'
                          : 'divider',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AppleIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">Apple Pay</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Connected
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      border: '2px solid',
                      borderColor:
                        userData.paymentMethod === 'cash_app'
                          ? 'primary.main'
                          : 'divider',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AccountBalanceIcon sx={{ mr: 1 }} />
                        <Typography variant="subtitle1">Cash App</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Not connected
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Notifications
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={userData.notifications.email}
                    onChange={(e) =>
                      handleNotificationChange('email', e.target.checked)
                    }
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={userData.notifications.push}
                    onChange={(e) =>
                      handleNotificationChange('push', e.target.checked)
                    }
                  />
                }
                label="Push Notifications"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;

import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  Paper,
} from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    navigate('/browse');
  };

  const handleApplePay = async () => {
    // TODO: Implement Apple Pay login/payment
  };

  const handleCashApp = async () => {
    // TODO: Implement Cash App login/payment
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
      <Container maxWidth="xs">
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
            Sign In to EFLIX
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Divider sx={{ my: 3 }}>or</Divider>

            {/* Apple Pay Button */}
            <Button
              fullWidth
              variant="contained"
              startIcon={<AppleIcon />}
              onClick={handleApplePay}
              sx={{
                mb: 2,
                bgcolor: '#000000',
                '&:hover': {
                  bgcolor: '#333333',
                },
              }}
            >
              Sign in with Apple Pay
            </Button>

            {/* Cash App Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleCashApp}
              sx={{
                mb: 2,
                bgcolor: '#00D632',
                '&:hover': {
                  bgcolor: '#00B82B',
                },
              }}
            >
              Sign in with Cash App
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                New to EFLIX?{' '}
                <Link component={RouterLink} to="/register" variant="body2">
                  Sign up now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

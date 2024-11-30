import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Watch from './pages/Watch';

// Create a custom theme with black, gold, and white
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700', // Gold
      light: '#FFE44D', // Lighter Gold
      dark: '#CCAC00', // Darker Gold
      contrastText: '#000000', // Black text on gold
    },
    secondary: {
      main: '#FFFFFF', // White
      contrastText: '#000000', // Black text on white
    },
    background: {
      default: '#000000', // Black background
      paper: '#121212', // Slightly lighter black for cards/papers
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#FFD700', // Gold text for secondary
    },
    action: {
      active: '#FFD700', // Gold for active elements
      hover: 'rgba(255, 215, 0, 0.08)', // Transparent gold for hover
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: '#FFD700', // Gold headers
    },
    h2: {
      color: '#FFD700',
    },
    h3: {
      color: '#FFD700',
    },
    h4: {
      color: '#FFD700',
    },
    h5: {
      color: '#FFD700',
    },
    h6: {
      color: '#FFD700',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 'bold',
        },
        contained: {
          backgroundColor: '#FFD700',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#FFE44D',
          },
        },
        outlined: {
          borderColor: '#FFD700',
          color: '#FFD700',
          '&:hover': {
            borderColor: '#FFE44D',
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          color: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          borderRadius: 8,
          '&:hover': {
            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.15)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFD700',
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/browse"
              element={
                <PrivateRoute>
                  <Browse />
                </PrivateRoute>
              }
            />
            <Route
              path="/watch/:id"
              element={
                <PrivateRoute>
                  <Watch />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

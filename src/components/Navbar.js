import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  // TODO: Replace with actual auth state
  const isAuthenticated = false;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'background.default', boxShadow: 'none' }}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            letterSpacing: 1,
          }}
        >
          SKYLINE STREAM by EDH
        </Typography>

        {isAuthenticated ? (
          <>
            {/* Navigation Links */}
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/browse"
              >
                Browse
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/movies"
              >
                Movies
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/tv-shows"
              >
                TV Shows
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/my-list"
              >
                My List
              </Button>
            </Box>

            {/* Search Icon */}
            <IconButton color="inherit" sx={{ mr: 2 }}>
              <SearchIcon />
            </IconButton>

            {/* Profile Menu */}
            <div>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <AccountCircle />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                <MenuItem
                  component={RouterLink}
                  to="/profile"
                  onClick={handleClose}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <Box>
            <Button
              color="primary"
              component={RouterLink}
              to="/login"
              sx={{ mr: 1 }}
              variant="outlined"
            >
              Login
            </Button>
            <Button
              color="primary"
              component={RouterLink}
              to="/register"
              variant="contained"
            >
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

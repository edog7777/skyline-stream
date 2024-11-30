import React from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderRadius: theme.spacing(1),
  border: '1px solid #FFD700',
}));

const ContactForm = () => {
  return (
    <Container maxWidth="sm">
      <StyledForm
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don't fill this out: <input name="bot-field" />
          </label>
        </p>
        
        <Typography variant="h4" component="h2" sx={{ color: '#FFD700', mb: 3 }}>
          Contact Us
        </Typography>

        <TextField
          required
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ 
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: '#FFD700' },
              '&:hover fieldset': { borderColor: '#FFD700' },
            },
            '& .MuiInputLabel-root': { color: '#FFD700' }
          }}
        />

        <TextField
          required
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ 
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: '#FFD700' },
              '&:hover fieldset': { borderColor: '#FFD700' },
            },
            '& .MuiInputLabel-root': { color: '#FFD700' }
          }}
        />

        <TextField
          required
          name="message"
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ 
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: '#FFD700' },
              '&:hover fieldset': { borderColor: '#FFD700' },
            },
            '& .MuiInputLabel-root': { color: '#FFD700' }
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#FFD700',
            color: 'black',
            '&:hover': {
              backgroundColor: '#FFC500',
            }
          }}
        >
          Send Message
        </Button>
      </StyledForm>
    </Container>
  );
};

export default ContactForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// Sample data - replace with API calls
const categories = [
  {
    id: 1,
    title: 'Continue Watching',
    content: [
      { id: 1, title: 'Stranger Things', image: 'https://source.unsplash.com/random/300x450', progress: 65 },
      { id: 2, title: 'The Crown', image: 'https://source.unsplash.com/random/300x450', progress: 30 },
      { id: 3, title: 'Breaking Bad', image: 'https://source.unsplash.com/random/300x450', progress: 80 },
    ],
  },
  {
    id: 2,
    title: 'Trending Now',
    content: [
      { id: 4, title: 'The Witcher', image: 'https://source.unsplash.com/random/300x450' },
      { id: 5, title: 'Money Heist', image: 'https://source.unsplash.com/random/300x450' },
      { id: 6, title: 'Dark', image: 'https://source.unsplash.com/random/300x450' },
    ],
  },
  {
    id: 3,
    title: 'Popular on EFLIX',
    content: [
      { id: 7, title: 'The Queens Gambit', image: 'https://source.unsplash.com/random/300x450' },
      { id: 8, title: 'Bridgerton', image: 'https://source.unsplash.com/random/300x450' },
      { id: 9, title: 'The Mandalorian', image: 'https://source.unsplash.com/random/300x450' },
    ],
  },
];

const ContentCard = ({ item, onPlay }) => {
  const [showControls, setShowControls] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card
        sx={{
          position: 'relative',
          bgcolor: 'transparent',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            zIndex: 1,
          },
        }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <CardMedia
          component="img"
          height="450"
          image={item.image}
          alt={item.title}
          sx={{ borderRadius: 1 }}
        />
        {item.progress && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              bgcolor: 'grey.700',
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${item.progress}%`,
                bgcolor: 'primary.main',
              }}
            />
          </Box>
        )}
        {showControls && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 1,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.300' } }}
              onClick={() => onPlay(item.id)}
            >
              <PlayArrowIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.3)', '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' } }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.3)', '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' } }}
            >
              <ThumbUpIcon />
            </IconButton>
            <Typography
              variant="button"
              sx={{
                ml: 'auto',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
              onClick={() => setShowDetails(true)}
            >
              More Info
            </Typography>
          </Box>
        )}
      </Card>

      <Dialog
        open={showDetails}
        onClose={() => setShowDetails(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{item.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Cast: John Doe, Jane Smith, Bob Johnson
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Genre: Drama, Thriller
          </Typography>
          <Typography variant="subtitle1">
            Rating: TV-MA
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDetails(false)}>Close</Button>
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={() => onPlay(item.id)}
          >
            Play
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Browse = () => {
  const navigate = useNavigate();

  const handlePlay = (contentId) => {
    navigate(`/watch/${contentId}`);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 8 }}>
      {categories.map((category) => (
        <Container key={category.id} maxWidth="xl" sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            {category.title}
          </Typography>
          <Grid container spacing={2}>
            {category.content.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ContentCard item={item} onPlay={handlePlay} />
              </Grid>
            ))}
          </Grid>
        </Container>
      ))}
    </Box>
  );
};

export default Browse;

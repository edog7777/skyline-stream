import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';

const Home = () => {
  const navigate = useNavigate();
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  // Featured content
  const featuredContent = {
    title: "Sundown",
    description: "Coming home from meeting the parents, Damon and Kelly's car breaks down in a Sundown town full of people who hate anyone who is not white. Damon and Kelly fight for their lives praying to make it home.",
    image: "/images/sundown-featured.jpg",
    backgroundImage: "/images/sundown-featured.jpg",
    genre: "Thriller",
    rating: "R",
    year: "2024",
    duration: "1h 52m",
    trailerUrl: "https://www.youtube.com/embed/9IcCEV_G_q4?autoplay=1&rel=0&showinfo=0",
  };

  const handlePlayClick = () => {
    setVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoOpen(false);
  };

  // Coming Soon content
  const comingSoonContent = [
    {
      id: 1,
      title: "Pray Hard",
      description: "Ex military Chaplin John Riley finds himself in the middle of a siege on mega church New Hope. With lives in the balance and a ticking bomb John must use faith and muscle to save the day.",
      image: "/images/pray-hard-poster.png",
      genre: "Action/Thriller",
      year: "2024",
      rating: "R"
    },
    {
      id: 2,
      title: "Deliverance",
      description: "Fred and his family find themselves at the hands of a self sacrificing cult determined to take back their land by any means necessary.",
      image: "/images/deliverance-poster.png",
      genre: "Psychological Thriller",
      year: "2024",
      rating: "R"
    },
    {
      id: 3,
      title: "Dreams And Nightmares",
      description: "A man wins the chance of a life time as he is gifted with AGI. A computer program in his pocket that can make his dreams come true or his nightmares unfurl.",
      image: "/images/dreams-and-nightmares-poster.png",
      genre: "Psychological Thriller",
      year: "2024",
      rating: "R"
    },
    {
      id: 4,
      title: "Homeless",
      description: "A woman looses everything ending up on the streets forcing her to rebuild her life in the world of the homeless.",
      image: "/images/homeless-poster.png",
      genre: "Social Drama",
      year: "2024",
      rating: "PG-13"
    },
  ];

  // Quick Flicks content
  const quickFlicksContent = [
    {
      id: 1,
      title: "THE GREAT DIVIDE",
      description: "A gripping action thriller that explores the intense dynamics of conflict and survival.",
      image: "/images/great-divide-poster-final.png",
      genre: "Action/Thriller",
      duration: "22 min",
      rating: "PG-13",
      videoId: "_f9m1rDOGBo"
    },
    {
      id: 2,
      title: "THE WATCHED",
      description: "A suspenseful tale of observation and unexpected connections.",
      image: "/images/the-watched-poster.png",
      genre: "Thriller",
      duration: "7 min",
      rating: "PG-13",
      videoId: "Rx4kxmxwVc0"
    },
    {
      id: 3,
      title: "TERROR ON 44th",
      description: "A chilling horror story that unfolds on one of the most notorious streets.",
      image: "/images/terror-on-44th-poster.png",
      genre: "Horror",
      duration: "6 min",
      rating: "R",
      videoId: "PbuAQ3tuCSE"
    },
    {
      id: 4,
      title: "BROKE GHOST HUNTERS : ABANDONED BUILDING",
      description: "A hilarious take on amateur paranormal investigators who are short on cash but big on determination.",
      image: "/images/broke-ghost-hunters-poster.png",
      genre: "Comedy",
      duration: "13 min",
      rating: "PG",
      videoId: "rxeYUaVTaOg"
    },
    {
      id: 5,
      title: "COUPLES THERAPY",
      description: "A comedic look at modern relationships through the lens of therapy sessions.",
      image: "/images/couples-therapy-poster.png",
      genre: "Comedy",
      duration: "4 min",
      rating: "PG",
      videoId: "0ilvfVhMOkw"
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Featured Content */}
      <Box
        sx={{
          position: 'relative',
          height: '85vh',
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%), url(${featuredContent.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'flex-end',
          pb: 6,
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {featuredContent.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'common.white',
                  mb: 2,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                }}
              >
                {featuredContent.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Typography sx={{ color: 'primary.main' }}>{featuredContent.rating}</Typography>
                <Typography sx={{ color: 'common.white' }}>{featuredContent.year}</Typography>
                <Typography sx={{ color: 'common.white' }}>{featuredContent.duration}</Typography>
                <Typography sx={{ color: 'primary.main' }}>{featuredContent.genre}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={handlePlayClick}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'common.black',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  }}
                >
                  Play Trailer
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<InfoOutlinedIcon />}
                  sx={{
                    borderColor: 'common.white',
                    color: 'common.white',
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  More Info
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* YouTube Video Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={videoOpen}
        onClose={handleCloseVideo}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'background.default',
            backgroundImage: 'none',
          },
        }}
      >
        <Box sx={{ position: 'relative', pt: '56.25%' }}>
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <IconButton
            onClick={handleCloseVideo}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'common.white',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.8)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Dialog>

      {/* Coming Soon Section */}
      <Box sx={{ mt: 6, px: { xs: 2, sm: 4, md: 6 } }}>
        <Typography
          variant="h4"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          COMING SOON
        </Typography>
        <Grid container spacing={3}>
          {comingSoonContent.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.paper',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 40px -12px rgba(255, 215, 0, 0.2)',
                    '& .MuiCardMedia-root': {
                      filter: 'brightness(1.1)',
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    backgroundColor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'rgba(255, 215, 0, 0.1)',
                  }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main',
                        bgcolor: 'background.paper',
                        border: 1,
                        borderColor: 'primary.main',
                        px: 1,
                        borderRadius: 1,
                        fontWeight: 'bold'
                      }}
                    >
                      {item.rating}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main',
                      }}
                    >
                      {item.genre}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.primary',
                        opacity: 0.8 
                      }}
                    >
                      • {item.year}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.primary',
                      opacity: 0.9,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Flicks Section */}
      <Box sx={{ mt: 8, px: { xs: 2, sm: 4, md: 6 } }}>
        <Typography
          variant="h4"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          QUICK FLICKS
        </Typography>
        <Grid container spacing={3}>
          {quickFlicksContent.map((item) => (
            <Grid item xs={12} sm={6} md={2.4} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: 'background.paper',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 40px -12px rgba(255, 215, 0, 0.2)',
                    '& .MuiCardMedia-root': {
                      filter: 'brightness(1.1)',
                    }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    backgroundColor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'rgba(255, 215, 0, 0.1)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setVideoId(item.videoId);
                    setVideoOpen(true);
                  }}
                />
                <CardContent sx={{ p: 2, flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main',
                        bgcolor: 'background.paper',
                        border: 1,
                        borderColor: 'primary.main',
                        px: 1,
                        borderRadius: 1,
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                      }}
                    >
                      {item.rating}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'primary.main',
                        fontSize: '0.875rem',
                      }}
                    >
                      {item.genre}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.primary',
                        opacity: 0.8,
                        fontSize: '0.875rem',
                      }}
                    >
                      • {item.duration}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.primary',
                      opacity: 0.9,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.4,
                      fontSize: '0.875rem',
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;

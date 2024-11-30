import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Stack,
  Fade,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import Forward10Icon from '@mui/icons-material/Forward10';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);

  // Sample content data - replace with API call
  const content = {
    id,
    title: 'Sample Movie',
    duration: 7200, // 2 hours in seconds
    videoUrl: 'https://example.com/video.mp4', // Replace with actual video URL
  };

  useEffect(() => {
    // Hide controls after 3 seconds of inactivity
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showControls]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleRewind = () => {
    setProgress(Math.max(0, progress - 10));
  };

  const handleForward = () => {
    setProgress(Math.min(content.duration, progress + 10));
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    setMuted(newValue === 0);
  };

  const handleProgressChange = (event, newValue) => {
    setProgress(newValue);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'black',
        position: 'relative',
        cursor: showControls ? 'default' : 'none',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Video Player */}
      <Box
        component="video"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        // src={content.videoUrl}
        autoPlay
        // controls={false}
      />

      {/* Controls Overlay */}
      <Fade in={showControls}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          {/* Top Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ color: 'white' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'white', ml: 2 }}>
              {content.title}
            </Typography>
          </Box>

          {/* Bottom Controls */}
          <Box>
            {/* Progress Bar */}
            <Slider
              value={progress}
              min={0}
              max={content.duration}
              onChange={handleProgressChange}
              sx={{ color: 'primary.main' }}
            />

            {/* Control Buttons */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
                {playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={handleRewind} sx={{ color: 'white' }}>
                <ReplayIcon />
              </IconButton>
              <IconButton onClick={handleForward} sx={{ color: 'white' }}>
                <Forward10Icon />
              </IconButton>
              <Typography sx={{ color: 'white', minWidth: 100 }}>
                {formatTime(progress)} / {formatTime(content.duration)}
              </Typography>

              {/* Volume Control */}
              <Box sx={{ display: 'flex', alignItems: 'center', width: 200 }}>
                <IconButton
                  onClick={() => setMuted(!muted)}
                  sx={{ color: 'white' }}
                >
                  {muted || volume === 0 ? (
                    <VolumeOffIcon />
                  ) : (
                    <VolumeUpIcon />
                  )}
                </IconButton>
                <Slider
                  value={muted ? 0 : volume}
                  onChange={handleVolumeChange}
                  sx={{ ml: 2, color: 'white' }}
                />
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              <IconButton
                onClick={toggleFullScreen}
                sx={{ color: 'white' }}
              >
                <FullscreenIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default Watch;

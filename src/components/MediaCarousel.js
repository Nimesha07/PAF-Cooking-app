import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';

const MediaCarousel = ({ media }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  if (!media || media.length === 0) return null;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '300px' }}>
      {media[activeIndex].type === 'video' ? (
        <video
          src={media[activeIndex].url}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          controls
        />
      ) : (
        <img
          src={media[activeIndex].url}
          alt={`Media ${activeIndex + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      
      {media.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <NavigateNextIcon />
          </IconButton>
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
            }}
          >
            {media.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: index === activeIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MediaCarousel; 
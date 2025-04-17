import React from 'react';
import { Box, keyframes } from '@mui/material';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoadingFlower: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 100,
          height: 100,
          animation: `${spin} 8s linear infinite`,
        }}
      >
        {/* Petals */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-30px)`,
              animation: `${pulse} 2s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.7,
            }}
          />
        ))}
        {/* Center */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: 'secondary.main',
            animation: `${pulse} 1.5s ease-in-out infinite`,
          }}
        />
      </Box>
      <Box
        sx={{
          mt: 2,
          color: 'text.primary',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        Loading...
      </Box>
    </Box>
  );
};

export default LoadingFlower; 
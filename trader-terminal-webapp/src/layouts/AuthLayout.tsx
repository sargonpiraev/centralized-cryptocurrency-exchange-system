import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <Box sx={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)',
    }}>
      <Outlet />
    </Box>
  );
};

export default AuthLayout; 
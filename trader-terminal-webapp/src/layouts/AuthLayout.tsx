import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  return (
    <Box sx={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default'
    }}>
      <Outlet />
    </Box>
  )
}

export default AuthLayout 
import { createBrowserRouter, Navigate } from 'react-router-dom'
import TradingPage from '../pages/TradingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import RootLayout from '../layouts/RootLayout'
import AuthLayout from '../layouts/AuthLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'trading',
        Component: TradingPage,
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: 'login',
            Component: LoginPage,
          },
          {
            path: 'register',
            Component: RegisterPage,
          },
        ],
      },
    ],
  },
]) 
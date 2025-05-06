import { createBrowserRouter, Navigate } from 'react-router-dom';
import TradingPage from '../pages/TradingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../layouts/AuthLayout';
import AuthGuard from '../components/AuthGuard';
import ErrorBoundary from '../components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <ErrorBoundary><NotFoundPage /></ErrorBoundary>,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'trading',
        element: (
          <AuthGuard>
            <TradingPage />
          </AuthGuard>
        ),
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: 'login',
            element: (
              <AuthGuard requireAuth={false}>
                <LoginPage />
              </AuthGuard>
            ),
          },
          {
            path: 'register',
            element: (
              <AuthGuard requireAuth={false}>
                <RegisterPage />
              </AuthGuard>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]); 

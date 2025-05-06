import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthLoading } from '../store/selectors/auth';
import LoadingFlower from './LoadingFlower';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const PUBLIC_ROUTES = ['/login', '/register'];

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        // Redirect to login if authentication is required but user is not authenticated
        navigate('/login', { state: { from: location.pathname } });
      } else if (!requireAuth && isAuthenticated && PUBLIC_ROUTES.includes(location.pathname)) {
        // Redirect to trading if user is authenticated but tries to access public routes
        navigate('/trading');
      }
    }
  }, [isAuthenticated, isLoading, navigate, location, requireAuth]);

  if (isLoading) {
    return <LoadingFlower />;
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated && PUBLIC_ROUTES.includes(location.pathname)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard; 
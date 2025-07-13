import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Simple hook to get user from localStorage
function useAuth() {
  const user = JSON.parse(localStorage.getItem('user'));
  return { user, isAdmin: user?.role === 'admin' };
}

export function RequireAdmin({ children }) {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!user || !isAdmin) {
    // Redirect to login, preserving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Generic RequireAuth for any logged-in user
export function RequireAuth({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
} 
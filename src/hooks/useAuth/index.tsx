'use client';

import { useEffect, useState, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  cookiesLoaded: boolean;
}

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookiesLoaded, setCookiesLoaded] = useState(false);

  // Memoize fetchAuthState to prevent recreation on every render
  const fetchAuthState = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/checkAuth');
      const data = await response.json() as AuthState;
      setIsAuthenticated(data.isAuthenticated);
      return data.isAuthenticated;
    } catch (error) {
      console.error('Failed to fetch authentication state:', error);
      return false;
    } finally {
      setCookiesLoaded(true);
    }
  }, []);

  useEffect(() => {
    // Only fetch auth state once when the component mounts
    void fetchAuthState();
    // Empty dependency array ensures this only runs once
  }, [fetchAuthState]);

  return {
    isAuthenticated,
    cookiesLoaded,
    fetchAuthState,
  };
}
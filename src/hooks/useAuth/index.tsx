'use client';

import { useEffect, useState, useCallback } from 'react';
import type { CookieUserData } from '~/utils/types/data';

interface AuthState {
  isAuthenticated: boolean;
  cookiesLoaded: boolean;
  user: CookieUserData;
}

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookiesLoaded, setCookiesLoaded] = useState(false);
  const [user, setUser] = useState<CookieUserData | null>(null);
  
  const fetchAuthState = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/checkAuth');
      const data = await response.json() as AuthState;
      setIsAuthenticated(data.isAuthenticated);
      setUser(data.user);
      return data.isAuthenticated;
    } catch (error) {
      console.error('Failed to fetch authentication state:', error);
      return false;
    } finally {
      setCookiesLoaded(true);
    }
  }, []);

  useEffect(() => {
    void fetchAuthState();
  }, [fetchAuthState]);

  return {
    isAuthenticated,
    cookiesLoaded,
    fetchAuthState,
    userData: user,
  };
}
'use client';

import { useEffect, useState, useCallback } from 'react';
import type { CookieUserData, UserFollowData } from '~/utils/types/data';

interface AuthState {
  isAuthenticated: boolean;
  cookiesLoaded: boolean;
  user: CookieUserData;
}

interface FetchedFollowData {
  followData: UserFollowData;
}

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookiesLoaded, setCookiesLoaded] = useState(false);
  const [user, setUser] = useState<CookieUserData | null>(null);
  const [userFollowData, setUserFollowData] = useState<UserFollowData | null>(null);
  
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

  const followData = useCallback(async () => {
    if (!user) return null;
    try {
      const response = await fetch(`/api/user/${user.id}/follow-count`);
      const data = await response.json() as FetchedFollowData;
      setUserFollowData(data.followData);
      console.log(data)
      return data;
    } catch (error) {
      console.error('Failed to fetch follow data:', error);
      return null;
    }
  }, [user]);

  useEffect(() => {
    void fetchAuthState();
  }, [fetchAuthState]);

  useEffect(() => {
    if (user) {
      void followData()
    }
  }, [user, followData]);

  return {
    isAuthenticated,
    cookiesLoaded,
    fetchAuthState,
    userData: user,
    userFollowData: userFollowData
  };
}
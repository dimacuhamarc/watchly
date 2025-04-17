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

interface UserIdentifier {
  id: string | null;
  username: string | null;
}

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookiesLoaded, setCookiesLoaded] = useState(false);
  const [user, setUser] = useState<CookieUserData | null>(null);
  const [userIdentifier, setUserIdentifier] = useState<UserIdentifier | null>(null);
  const [userFollowData, setUserFollowData] = useState<UserFollowData | null>(null);
  
  const fetchAuthState = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/checkAuth');
      const data = await response.json() as AuthState;

      const stateUpdates = {
        isAuthenticated: data.isAuthenticated,
        user: data.user,
        userIdentifier: {
          id: data.user?.id ?? null,
          username: data.user?.username ?? null,
        }
      }

      setIsAuthenticated(stateUpdates.isAuthenticated);
      setUser(stateUpdates.user);
      setUserIdentifier(stateUpdates.userIdentifier);
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
    userFollowData: userFollowData,
    userIdentifier: userIdentifier,
    username: userIdentifier?.username,
  };
}
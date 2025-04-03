import {
  getCookie,
  getCookies,
  hasCookie,
} from 'cookies-next/client';
import { useEffect, useState } from 'react';

export function useAuthenticated() {
  // Using state since cookies aren't available during SSR
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookiesLoaded, setCookiesLoaded] = useState(false);

  useEffect(() => {
    // Check for any NextAuth.js session cookie - only runs client-side
    const hasAuthCookie = 
      hasCookie('next-auth.session-token') || 
      hasCookie('__Secure-next-auth.session-token') ||
      hasCookie('authjs.session-token') ||
      hasCookie('__Secure-authjs.session-token');

    // Get all cookies and check for chunked session tokens
    const cookies = getCookies();
    
    console.log('Auth Cookies Client-side:', {
      hasAuthCookie,
      cookieKeys: Object.keys(cookies ?? {}),
      documentCookie: typeof document !== 'undefined' ? document.cookie : 'not available'
    });

    setIsAuthenticated(hasAuthCookie);
    setCookiesLoaded(true);
  }, []);

  return {
    isAuthenticated,
    cookiesLoaded
  };
}
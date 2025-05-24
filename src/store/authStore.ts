import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CookieUserData, SanitizedProfileData } from '~/utils/types/data'

interface AuthState {
  // Authentication state
  isAuthenticated: boolean
  currentUser: CookieUserData | null
  cookiesLoaded: boolean
  ownProfileData: SanitizedProfileData | null

  // Actions
  setAuthenticated: (isAuth: boolean) => void
  setCurrentUser: (user: CookieUserData | null) => void
  setCookiesLoaded: (loaded: boolean) => void
  logout: () => void

  // Fetch auth state
  fetchAuthState: () => Promise<void>
  fetchProfileData: (username: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      isAuthenticated: false,
      currentUser: null,
      cookiesLoaded: false,
      ownProfileData: null,

      // Setters
      setAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),
      setCurrentUser: (user) => set({ currentUser: user }),
      setCookiesLoaded: (loaded) => set({ cookiesLoaded: loaded }),

      // Fetch authentication state from your API
      fetchAuthState: async () => {
        try {
          const response = await fetch('/api/auth/checkAuth')
          const data = (await response.json()) as {
            isAuthenticated: boolean
            user: CookieUserData | null
          }

          set({
            isAuthenticated: data.isAuthenticated,
            currentUser: data.user,
            cookiesLoaded: true,
          })
        } catch (error) {
          console.error('Failed to fetch authentication state:', error)
          set({ cookiesLoaded: true })
        }
      },

      fetchProfileData: async (username: string) => {
        if (!username) {
          set({ ownProfileData: null })
          return
        }
        try {
          const response = await fetch(`/api/profile/${username}`)
          if (!response.ok) {
            throw new Error('Failed to fetch profile data')
          }
          const data = (await response.json()) as {
            profileData: SanitizedProfileData | null
          }

          set({ ownProfileData: data.profileData })
        } catch (error) {
          console.error('Error fetching profile data:', error)
          // Don't return anything to match Promise<void> return type
        }
      },

      // Logout
      logout: () => {
        set({
          isAuthenticated: false,
          currentUser: null,
        })
      },
    }),
    {
      name: 'auth-storage',
      // Don't persist sensitive data
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        ownProfileData: state.ownProfileData,
      }),
    },
  ),
)

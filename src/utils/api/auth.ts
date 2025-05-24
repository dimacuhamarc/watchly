import NextAuth from 'next-auth'
import { authConfig } from '~/server/auth/config'

// Export the NextAuth functions directly
export const { auth, signIn, signOut } = NextAuth(authConfig)

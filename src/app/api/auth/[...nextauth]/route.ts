import NextAuth from 'next-auth'
import { authConfig } from '~/server/auth/config'

console.log(
  'NextAuth config providers:',
  authConfig.providers.map((p) => {
    const provider = p as { id?: string; name?: string }
    return provider.id ?? provider.name ?? 'unknown'
  }),
)
console.log('NextAuth callback keys:', Object.keys(authConfig.callbacks ?? {}))

// Export the NextAuth handler functions
const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }

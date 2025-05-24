import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import type { JWTTokenPayload } from './utils/types/auth'

// List of paths that REQUIRE authentication
const PROTECTED_PATHS = [
  // "/search",
  '/profile',
  '/profile/edit',
  '/settings',
  '/watch',
  '/my-list',
]

const ONBOARDING_PATHS = ['/onboarding', '/onboarding/:path*']

// Convert string to Uint8Array for jose
function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

// Verify JWT token using jose (Edge runtime compatible)
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
async function verifyJwtToken(token: string): Promise<JWTTokenPayload | null> {
  try {
    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) {
      console.error('NEXTAUTH_SECRET is not defined')
      return null
    }

    const secretKey = stringToUint8Array(secret)
    const { payload } = await jwtVerify(token, secretKey)
    return payload as JWTTokenPayload
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is an onboarding path
  const isOnboardingPath = ONBOARDING_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )

  // Check if this is a path that requires protection
  const isProtectedPath = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )

  // Get the token from cookies - we need to check this early for both path types
  const token = request.cookies.get('next-auth.session-token')?.value

  // If it's an onboarding path and the user is authenticated, redirect to home
  if (isOnboardingPath && token) {
    // Verify the token before redirecting
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const payload = await verifyJwtToken(token)
    if (payload) {
      console.log(
        'Authenticated user trying to access onboarding, redirecting to home',
      )
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // If path doesn't require auth, allow access immediately
  if (!isProtectedPath) {
    return NextResponse.next()
  }

  console.log(`Checking auth for protected path: ${pathname}`)

  // Already checked if token exists above, but not for protected paths
  if (!token) {
    console.log('No auth token found, redirecting to signin')
    return NextResponse.redirect(
      new URL('/onboarding?type=signin', request.url),
    )
  }

  // Verify the token
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await verifyJwtToken(token)

  if (!payload) {
    console.log('Token verification failed, redirecting to signin')
    return NextResponse.redirect(
      new URL('/onboarding?type=signin', request.url),
    )
  }

  console.log(
    'Token verified successfully, user is authenticated:',
    JSON.stringify(payload, null, 2),
  )
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/search',
    '/profile',
    '/settings',
    '/watch',
    '/my-list',
    '/search/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/watch/:path*',
    '/my-list/:path*',
    '/onboarding',
    '/onboarding/:path*',
  ],
}

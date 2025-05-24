import * as jose from 'jose'

interface TokenPayload {
  id: string
  email: string
  username?: string | undefined
  iat?: number
  exp?: number
}

// Convert string to Uint8Array for jose
function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str)
}

export async function signJwtAccessToken(
  payload: TokenPayload,
): Promise<string> {
  const secret = process.env.NEXTAUTH_SECRET

  if (!secret) {
    throw new Error('JWT secret is not defined')
  }

  const secretKey = stringToUint8Array(secret)

  const token = await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secretKey)

  return token
}

export async function verifyJwt(token: string): Promise<TokenPayload | null> {
  if (!token) {
    console.error('No token provided to verify')
    return null
  }

  try {
    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) {
      console.error('JWT secret is not defined')
      return null
    }

    const secretKey = stringToUint8Array(secret)

    // Use jose's jwtVerify which uses Web Crypto API instead of Node's crypto
    const { payload } = await jose.jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    })

    return {
      id: payload.id as string,
      email: payload.email as string,
      username: payload.username as string | undefined,
    }
  } catch (error) {
    console.error('JWT verification error:', error)
    return null
  }
}

// Helper function for cookie parsing
export async function hasValidSession(cookieString?: string): Promise<boolean> {
  if (!cookieString) return false

  const cookies = cookieString.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=')
      if (key) {
        if (value !== undefined) {
          acc[key] = value
        }
      }
      return acc
    },
    {} as Record<string, string>,
  )

  const token =
    cookies['next-auth.session-token'] ??
    cookies['__Secure-next-auth.session-token']

  if (!token) return false

  // Actually verify the token since we can await here
  const payload = await verifyJwt(token)
  return payload !== null
}

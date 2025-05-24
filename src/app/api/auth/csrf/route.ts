import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Generate a random CSRF token
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)

    // Create response with the token
    const response = NextResponse.json({ csrfToken: token })

    // Use the response cookies directly which doesn't require awaiting
    response.cookies.set('next-auth.csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })

    return response
  } catch (error) {
    console.error('Error generating CSRF token:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate CSRF token',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

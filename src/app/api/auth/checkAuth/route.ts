import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyJwt } from '~/utils/jwt';

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('next-auth.session-token') ?? cookieStore.get('__Secure-next-auth.session-token');

  const userData = authCookie ? await verifyJwt(authCookie.value) : null;

  return NextResponse.json({ 
    isAuthenticated: !!authCookie,
    user: userData,
  }, {
    status: authCookie ? 200 : 401,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

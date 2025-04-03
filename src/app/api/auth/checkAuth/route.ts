import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('next-auth.session-token') ?? cookieStore.get('__Secure-next-auth.session-token');

  return NextResponse.json({ 
    isAuthenticated: !!authCookie 
  });
}

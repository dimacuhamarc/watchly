import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "~/utils/jwt";

export async function GET(req: Request) {
  // Get the cookie from the request
  const cookieStore = await cookies();
  const token = cookieStore?.get("next-auth.session-token")?.value;
  
  if (!token) {
    return NextResponse.json({ 
      authenticated: false, 
      message: "No auth token found" 
    }, { status: 401 });
  }
  
  try {
    const payload = await verifyJwt(token);
    
    if (!payload) {
      return NextResponse.json({ 
        authenticated: false, 
        message: "Invalid token" 
      }, { status: 401 });
    }
    
    // Return user info if authenticated
    return NextResponse.json({ 
      authenticated: true,
      user: {
        id: payload.id,
        email: payload.email,
        username: payload.name
      }
    });
  } catch (error) {
    console.error("Auth test error:", error);
    return NextResponse.json({ 
      authenticated: false, 
      message: "Authentication error" 
    }, { status: 500 });
  }
}

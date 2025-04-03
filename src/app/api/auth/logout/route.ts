import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  // Clear the auth cookie
  const cookieStore = await cookies();
  cookieStore.set({
    name: "next-auth.session-token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  // Also clear any secure variants
  cookieStore.set({
    name: "__Secure-next-auth.session-token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  // Check if the user is coming from the homepage
  const referer = request.headers.get('referer');
  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
  
  // If the referer is the homepage, return HTML that will reload the page
  if (referer && (referer === baseUrl || referer === `${baseUrl}/` || referer.endsWith('/'))) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta http-equiv="refresh" content="0; url=${baseUrl}" />
          <script>window.location.href = '${baseUrl}'</script>
        </head>
        <body>
          <p>Logging out...</p>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }

  // Otherwise redirect to homepage after logout
  return NextResponse.redirect(new URL('/', baseUrl));
}

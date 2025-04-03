import "~/styles/globals.css";
import "~/styles/text-styles.css";
import "~/styles/layout-styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "~/utils/api/auth";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Watchly | The best way to watch movies",
  description: "Say goodbye to endless searches and wrong results. With Watchly, instantly discover where to stream, buy, or rent your favorite movies and shows—all tailored to your region.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let session = null;
  console.log(process.env.NEXTAUTH_SECRET)
  if ((await cookies()).get("next-auth.session-token") === undefined) {
    console.log("No session token found in cookies");
  } else {
    try {
      session = await auth();
    } catch (error) {
      console.error("Auth error:", error);
    }
  }
  
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <SessionProvider session={session}>
        <body>{children}</body>
      </SessionProvider>
    </html>
  );
}

import "~/styles/globals.css";
import "~/styles/text-styles.css";
import "~/styles/layout-styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Watchly | The best way to watch movies",
  description: "Say goodbye to endless searches and wrong results. With Watchly, instantly discover where to stream, buy, or rent your favorite movies and shows—all tailored to your region.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

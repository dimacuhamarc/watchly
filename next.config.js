/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  async rewrites() {
    return [
      {
        source: '/p/:slug',
        destination: '/profile/:slug',
      },
      {
        source: '/p',
        destination: '/profile',
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.NEXT_PUBLIC_UPLOADTHING_PATTERN}.ufs.sh`,
        pathname: "/f/*",
      },
    ]
  }
};

export default config;

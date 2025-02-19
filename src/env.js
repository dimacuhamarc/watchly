import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    // AUTH_SECRET:
    //   process.env.NODE_ENV === "production"
    //     ? z.string()
    //     : z.string().optional(),
    // AUTH_DISCORD_ID: z.string(),
    // AUTH_DISCORD_SECRET: z.string(),
    POSTGRES_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    POSTGRES_URL_UNPOOLED: z.string().url(),
    PGHOST: z.string(),
    PGHOST_UNPOOLED: z.string(),
    PGUSER: z.string(),
    PGDATABASE: z.string(),
    PGPASSWORD: z.string(),
    POSTGRES_URL_NO_SSL: z.string().url(),
    POSTGRES_PRISMA_URL: z.string().url(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_TMDB_API_KEY: z.string(),
    NEXT_PUBLIC_TMDB_API_LONGKEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // AUTH_SECRET: process.env.AUTH_SECRET,
    // AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    // AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    POSTGRES_URL: process.env.POSTGRES_URL,
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_URL_UNPOOLED: process.env.POSTGRES_URL_UNPOOLED,
    PGHOST: process.env.PGHOST,
    PGHOST_UNPOOLED: process.env.PGHOST_UNPOOLED,
    PGUSER: process.env.PGUSER,
    PGDATABASE: process.env.PGDATABASE,
    PGPASSWORD: process.env.PGPASSWORD,
    POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    NEXT_PUBLIC_TMDB_API_LONGKEY: process.env.NEXT_PUBLIC_TMDB_API_LONGKEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

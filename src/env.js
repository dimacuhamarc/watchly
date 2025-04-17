import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
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
  client: {
    NEXT_PUBLIC_TMDB_API_KEY: z.string(),
    NEXT_PUBLIC_TMDB_API_LONGKEY: z.string(),
    NEXT_PUBLIC_UPLOADTHING_TOKEN: z.string(),
    NEXT_PUBLIC_UPLOADTHING_PATTERN: z.string(),
  },
  runtimeEnv: {
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
    NEXT_PUBLIC_UPLOADTHING_TOKEN: process.env.NEXT_PUBLIC_UPLOADTHING_TOKEN,
    NEXT_PUBLIC_UPLOADTHING_PATTERN: process.env.NEXT_PUBLIC_UPLOADTHING_PATTERN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

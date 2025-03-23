import NextAuth from "next-auth";
import { authConfig } from "~/server/auth/config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
export const { GET, POST } = NextAuth(authConfig) as any;
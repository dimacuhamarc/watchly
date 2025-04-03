/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NextResponse } from "next/server";
import { authConfig } from "~/server/auth/config";
import type { AuthProvider } from "~/utils/types/auth";

export async function GET() {
  try {
    // Extract providers from the auth config directly
    const providers = authConfig.providers.map((provider: AuthProvider) => {
      const id = provider.id ?? provider.name?.toLowerCase() ?? '';
      
      return {
        id,
        name: provider.name ?? '',
        type: provider.type,
        signinUrl: `/api/auth/signin/${id}`,
        callbackUrl: `/api/auth/callback/${id}`
      } satisfies AuthProvider;
    });
    
    // Convert to the format expected by the client
    const providersObject = providers.reduce<Record<string, AuthProvider>>((acc, provider) => {
      acc[provider.id] = provider;
      return acc;
    }, {});
    
    return NextResponse.json(providersObject);
  } catch (error) {
    console.error("Error generating providers data:", error);
    
    return NextResponse.json(
      {
        error: "Failed to generate providers data",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

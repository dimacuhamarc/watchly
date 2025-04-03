import { NextResponse } from "next/server";
import { authConfig } from "~/server/auth/config";

export async function GET() {
  try {
    // Extract providers from the auth config directly
    const providers = authConfig.providers.map(provider => ({
      id: provider.id || provider.name?.toLowerCase(),
      name: provider.name,
      type: provider.type,
      signinUrl: `/api/auth/signin/${provider.id || provider.name?.toLowerCase()}`,
      callbackUrl: `/api/auth/callback/${provider.id || provider.name?.toLowerCase()}`
    }));
    
    // Convert to the format expected by the client
    const providersObject = providers.reduce((acc, provider) => {
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

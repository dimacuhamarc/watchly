// This could connect to your database or an external API

export async function validateCredentials(email: string, password: string) {
  try {
    // Call your API or database to validate credentials
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error validating credentials:", error);
    return null;
  }
}

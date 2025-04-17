type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  username: string;
  first_name: string;
  last_name: string;
  display_name: string;
  profile_picture: string;
  created_at: Date;
  updated_at: Date;
};

interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

type JWTTokenPayload = {
  id: string;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
};

interface LoginResponse {
  error?: string;
  success?: boolean;
  user?: {
    email: string;
    name: string;
    id: string;
    image: string;
  }
}

interface AuthProvider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

export type { AuthUser, SignUpRequest, JWTTokenPayload, LoginResponse, AuthProvider };

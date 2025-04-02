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

export type { AuthUser, SignUpRequest };

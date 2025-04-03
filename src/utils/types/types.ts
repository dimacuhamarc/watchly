type OnboardingMessageType = Record<string, {
  title: string;
  description: string;
  longDescription: string;
}>;

interface SignInFormType {
  email: string;
  password: string;
}

interface SignUpFormType extends SignInFormType {
  email: string;
  confirmPassword: string;
}

export type { OnboardingMessageType, SignInFormType, SignUpFormType };

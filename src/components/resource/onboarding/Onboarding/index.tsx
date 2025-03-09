import React from "react";
import {
  SignInComponent,
  SignUpComponent,
} from "~/components/resource/onboarding";

type OnboardingWrapperProps = {
  type: string;
}

function OnboardingWrapper({ type }: OnboardingWrapperProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-2/3 flex-col items-center justify-center">
        { type === 'signin' && <SignInComponent /> }
        { type === 'signup' && <SignUpComponent /> }
      </div>
    </div>
  );
}

export default OnboardingWrapper;

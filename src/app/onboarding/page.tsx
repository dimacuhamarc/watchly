import React from 'react'
import OnboardingLayoutProvider from '~/components/layout/onboardingLayoutProvider';
import { OnboardingWrapper } from '~/components/resource/onboarding';
import { redirect } from 'next/navigation';
export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: { searchParams: { type?: string } }) {
  const type = searchParams.type ?? 'signin';

  return {
    title: `${type === 'signin' ? 'Sign In' : 'Sign Up'} | Watchly`,
    description: `${type === 'signin' ? 'sign in to your account' : 'sign up for an account'}`,
  }
}

interface OnboardingPageProps {
  searchParams: { type?: string };
}

function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const type = searchParams.type ?? 'signin';

  if (type !== 'signin' && type !== 'signup') {
    redirect('/onboarding?type=signin');
  }

  return (
    <OnboardingLayoutProvider>
      <OnboardingWrapper type={type} />
    </OnboardingLayoutProvider>
  )
}

export default OnboardingPage
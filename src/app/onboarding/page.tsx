import React from 'react'
import OnboardingLayoutProvider from '~/components/layout/onboardingLayoutProvider'
import { OnboardingWrapper } from '~/components/resource/onboarding'
import { redirect } from 'next/navigation'
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  // Fix: Need to use Promise.resolve to handle searchParams correctly
  const params = await Promise.resolve(searchParams)
  const type = params.type ?? 'signin'

  return {
    title: `${type === 'signin' ? 'Sign In' : 'Sign Up'} | Watchly`,
    description: `${type === 'signin' ? 'sign in to your account' : 'sign up for an account'}`,
  }
}

interface OnboardingPageProps {
  searchParams: {
    type?: string
    registered?: string
  }
}

function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const { type = 'signin', registered } = React.use(
    Promise.resolve(searchParams),
  )

  if (type !== 'signin' && type !== 'signup') {
    redirect('/onboarding?type=signin')
  }

  return (
    <OnboardingLayoutProvider>
      <OnboardingWrapper
        type={type}
        registrationSuccess={registered === 'true'}
      />
    </OnboardingLayoutProvider>
  )
}

export default OnboardingPage

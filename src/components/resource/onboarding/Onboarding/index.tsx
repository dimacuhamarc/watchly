import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {
  SignInComponent,
  SignUpComponent,
} from '~/components/resource/onboarding'
import type { OnboardingMessageType } from '~/utils/types/types'
import TransitionProvider from '~/components/layout/transitionProvider'

type OnboardingWrapperProps = {
  type: string
  registrationSuccess?: boolean
}

type OnboardingMessageProps = {
  type: string
}

function OnboardingWrapper({
  type,
  registrationSuccess,
}: OnboardingWrapperProps) {
  return (
    <TransitionProvider>
      <div className="mx-auto flex h-screen max-w-screen-lg flex-col items-center justify-start gap-4 px-14 py-44 md:px-0">
        <div className="flex h-full w-full flex-col items-center gap-16 px-10 md:flex-row md:items-start">
          <div className="flex h-full flex-1 flex-col justify-center gap-4">
            {type === 'signin' ? (
              <SignInComponent
                key={type}
                registrationSuccess={registrationSuccess}
              />
            ) : (
              <SignUpComponent key={type} />
            )}
          </div>

          <div className="sticky top-0 hidden h-full flex-1 items-center justify-center md:flex">
            <OnboardingMessage type={type} />
          </div>
        </div>
      </div>
    </TransitionProvider>
  )
}

function OnboardingMessage({ type }: OnboardingMessageProps) {
  const messages: OnboardingMessageType = {
    signin: {
      title: 'Welcome back to',
      description: 'Please sign in to continue',
      longDescription:
        'Discover your next favorite movie or show with Watchly. Sign in now to access your personalized watchlist and recommendations.',
    },
    signup: {
      title: 'Welcome to',
      description: 'Please sign up to begin your Watchly journey',
      longDescription:
        'Say goodbye to endless searches and wrong results. With Watchly, instantly discover where to stream, buy, or rent your favorite movies and shows—all tailored to your region.',
    },
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <h1 className="flex flex-row items-center gap-2 text-2xl font-bold">
          {messages[type]?.title}
          <Link className="mt-2 text-3xl font-bold" href="/">
            <Image
              src={'/assets/brand-light.svg'}
              alt="Brand"
              width={144}
              height={37}
              priority
            />
          </Link>
        </h1>
      </div>
      <p className="text-pretty text-lg text-gray-500 transition-all duration-300 ease-in-out hover:text-white">
        {messages[type]?.longDescription}
      </p>
    </div>
  )
}
export default OnboardingWrapper

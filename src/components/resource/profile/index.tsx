'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { FaLink } from 'react-icons/fa'
import { InitialAvatar, PhotoAvatar } from '~/components/global/avatars'
import { formatToYearMonth } from '~/helpers/date'

import ButtonWithTooltip from '~/components/global/buttons/buttonWithTooltip'
import copyToClipboard from '~/helpers/clipboard'
import UserAbout from './About'
import UserMilestones from './Milestones'

import { LuArrowLeft, LuCalendar, LuLock, LuUsers } from 'react-icons/lu'
import {
  InformationScreen,
  LoadingScreen,
  UnauthorizedAccess,
} from '~/components/utility/screens'
import type { SanitizedProfileData } from '~/utils/types/data'
interface ProfileProps {
  profileData?: SanitizedProfileData | null
}

const Profile = function Profile({ profileData }: ProfileProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profileData === null) {
      setError(true)
    }
    if (!profileData) {
      setLoading(true)
    }
    if (profileData && profileData !== null) {
      setLoading(false)
    }
  }, [profileData])

  if (loading) {
    return LoadingScreen({
      loadingMessage: 'Loading Profile',
    })
  }

  if (profileData?.public_profile === false && !profileData?.isCurrentUser) {
    return UnauthorizedAccess({
      errorMessage: 'Unauthorized Access',
      errorDetails: 'This profile is private.',
      redirectLink: {
        href: `/`,
        label: 'Go to home',
      },
      leftIcon: true,
    })
  }

  if (profileData === null && !error) {
    return UnauthorizedAccess({
      errorMessage: 'Profile Not Found',
      errorDetails: 'The requested profile could not be found.',
      redirectLink: {
        href: `/`,
        label: 'Go back to home',
      },
      leftIcon: true,
    })
  }

  if (
    (profileData?.first_name === null || profileData?.last_name === null) &&
    profileData?.isCurrentUser
  ) {
    return InformationScreen({
      message: 'Setup Your Profile',
      details: 'You need to set up your basic details to access your profile.',
      redirectLink: {
        href: `/p/${profileData.username}/edit`,
        label: 'Proceed to setup',
      },
      rightIcon: true,
    })
  }

  if (
    (profileData?.first_name === null || profileData?.last_name === null) &&
    !profileData?.isCurrentUser
  ) {
    return UnauthorizedAccess({
      errorMessage: 'Profile Not Found',
      errorDetails: 'This user has not set up their profile yet.',
      redirectLink: {
        href: `/`,
        label: 'Go back to home',
      },
      leftIcon: true,
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 opacity-60"></div>

        <Link
          href={`/`}
          className="absolute left-6 top-6 z-10 h-10 w-10 rounded-full border border-white/10 bg-black/20 p-2 backdrop-blur-md transition-all hover:bg-black/30"
        >
          <LuArrowLeft className="text-xl" />
        </Link>
      </div>

      <div className="relative w-full max-w-full px-6 md:px-12 lg:px-24">
        <div className="-mt-24 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="z-10 flex flex-col items-start gap-6 md:flex-row md:items-end">
            {profileData?.profile_picture && (
              <div className="h-36 w-36 rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl">
                <PhotoAvatar
                  src={profileData?.profile_picture}
                  alt={profileData?.username}
                  isAutoSized={true}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            )}
            {!profileData?.profile_picture && (
              <div className="h-36 w-36 rounded-2xl border-4 border-slate-900 bg-gradient-to-br from-slate-700 to-slate-800 shadow-xl">
                <InitialAvatar
                  name={profileData?.first_name + ' ' + profileData?.last_name}
                />
              </div>
            )}

            <div className="mb-2">
              <h1 className="flex flex-row items-center gap-4 text-3xl font-bold tracking-tight">
                {!profileData?.first_name || !profileData?.last_name
                  ? 'No Name Provided'
                  : profileData?.first_name + ' ' + profileData?.last_name}{' '}
                {!profileData?.public_profile && (
                  <LuLock className="text-lg text-slate-200/50" />
                )}
              </h1>
              <p className="-mt-2 font-medium text-slate-400">
                @{profileData?.username ?? ''}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm">
                  <LuUsers className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {profileData?.followers} Followers
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm">
                  <LuCalendar className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium">
                    Joined{' '}
                    {formatToYearMonth(
                      profileData?.created_at?.toLocaleString() ?? '',
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="z-10 mt-4 flex gap-2 md:mt-0">
            <ButtonWithTooltip
              onClick={() => {
                void copyToClipboard(window.location.href)
              }}
              tooltip="Share Profile"
              tooltipPressed="Copied profile link."
            >
              <FaLink />
            </ButtonWithTooltip>
            {profileData?.isCurrentUser ? (
              <Link
                href={`/p/` + profileData.username + `/edit`}
                className="btn btn-primary btn-sm rounded-full"
              >
                Edit Profile
              </Link>
            ) : (
              <button className="btn btn-primary btn-sm rounded-full">
                Follow
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile details section */}
      <div className="mt-6 grid w-full max-w-full grid-cols-1 gap-16 px-6 md:px-12 lg:grid-cols-3 lg:px-24">
        <div className="lg:col-span-2">
          {profileData && (
            <UserAbout
              isCurrentUser={profileData.isCurrentUser}
              userData={profileData}
            />
          )}
        </div>
        <div className="space-y-6">
          <UserMilestones />
        </div>
      </div>
    </div>
  )
}

export default Profile

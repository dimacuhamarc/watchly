import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider'
import Profile from '~/components/resource/profile/index'
import { getProfileData } from './actions'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  return {
    title: `${slug} | Watchly`,
    description: `${slug} | Watchly`,
  }
}

async function ProfilePage({ params }: { params: { slug: string } }) {
  const { slug }: { slug: string } = params
  const profileData = await getProfileData(slug)
  
  // Transform null bio to undefined to match SanitizedUserData type
  const transformedProfileData = profileData ? {
    ...profileData,
    bio: profileData.bio ?? undefined
  } : null
  
  return (
    <AuthLayoutProvider>
      <Profile profileData={transformedProfileData} />
    </AuthLayoutProvider>
  )
}

export default ProfilePage

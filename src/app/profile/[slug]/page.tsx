import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider'
import Profile from '~/components/resource/profile/index'

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

function ProfilePage({ params }: { params: { slug: string } }) {
  const { slug }: { slug: string } = React.use(Promise.resolve(params))
  return (
    <AuthLayoutProvider>
      <Profile params={slug} />
    </AuthLayoutProvider>
  )
}

export default ProfilePage

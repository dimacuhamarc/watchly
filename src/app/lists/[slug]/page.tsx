import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider'
import WatchlistDetail from '~/components/resource/watchlist/detail'

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
  
  return (
    <AuthLayoutProvider>
      <WatchlistDetail
        isFullPage={true}
        watchlistId={slug}
      />
    </AuthLayoutProvider>
  )
}

export default ProfilePage

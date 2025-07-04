import React from 'react'
import AuthLayoutProvider from '~/components/layout/authLayoutProvider'
import WatchlistDetail from '~/components/resource/watchlist/detail'
import { getWatchlistData } from '../actions'

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
  const watchlistData = await getWatchlistData({ watchlistId: slug })

  console.log('Watchlist Data:', watchlistData)
  
  return (
    <AuthLayoutProvider>
      <WatchlistDetail
        isFullPage={true}
        watchlistId={slug}
        data={watchlistData}
      />
    </AuthLayoutProvider>
  )
}

export default ProfilePage

import React from 'react'
import MainLayoutProvider from '~/components/layout/mainLayoutProvider'
import { MovieItemComponent } from '~/components/resource/items'
import { getMovieDetails } from '~/utils/api/tmdb'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params
  const movie = await getMovieDetails(id)
  return {
    title: `${movie?.title ?? 'Not Found'} | Watchly`,
    description: movie?.overview ?? 'Not Found',
  }
}

interface MovieItemPageProps {
  params: { id: string }
}

function MovieItemPage({ params }: MovieItemPageProps) {
  const { id }: { id: string } = React.use(Promise.resolve(params))

  return (
    <MainLayoutProvider>
      <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col items-center justify-start gap-4 px-14 py-44 md:px-0">
        <MovieItemComponent id={id} />
      </div>
    </MainLayoutProvider>
  )
}

export default MovieItemPage

import { type show, type tvShow, type videos } from '../utils/types/tmdb-types'

const findBestVideo = (videos: videos | null) => {
  if (!videos?.results?.length) return ''

  // Sort videos by published date (oldest first)
  const sortedVideos = [...videos.results].sort(
    (a, b) =>
      new Date(a.published_at).getTime() - new Date(b.published_at).getTime(),
  )

  // Find first matching video from sorted results
  const officialTrailer = sortedVideos.find(
    (video) =>
      video.official && video.type === 'Trailer' && video.site === 'YouTube',
  )
  if (officialTrailer) return officialTrailer.key

  const trailer = sortedVideos.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube',
  )
  if (trailer) return trailer.key

  const teaser = sortedVideos.find(
    (video) => video.type === 'Teaser' && video.site === 'YouTube',
  )
  if (teaser) return teaser.key

  return sortedVideos[0]?.key ?? ''
}

const getTitle = (result: show | tvShow): string => {
  if ('title' in result) {
    return result.title
  }
  return result.name
}

const getReleaseDate = (result: show | tvShow): string | null => {
  if ('release_date' in result) {
    return result.release_date
  }
  return result.first_air_date
}

export { findBestVideo, getTitle, getReleaseDate }

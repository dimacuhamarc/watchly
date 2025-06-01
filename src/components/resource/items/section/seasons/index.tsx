/** @format */

import React from 'react'
import { formatDate } from '~/helpers/date'
import { type tvDetails } from '~/utils/types/tmdb-types'
import { GeneralCard } from '~/components/global/cards'

type SeasonsSectionProps = {
  seasons: tvDetails['seasons']
}

function SeasonsSection({ seasons }: SeasonsSectionProps) {
  const sortedSeasons = [...seasons].sort(
    (a, b) => a.season_number - b.season_number,
  )
  const filteredSeasons = sortedSeasons.filter(
    (season) => season.season_number > 0,
  )
  if (filteredSeasons.length === 0) {
    return <div className="text-gray-500">No seasons available</div>
  }
  return (
    <div className="flex flex-wrap gap-8 overflow-auto justify-center">
      {filteredSeasons.map((season) => (
        <GeneralCard
          key={season.id}
          label={`Season ${season.season_number}`}
          sublabel={`${season.episode_count} episodes`}
          date={formatDate(season.air_date)}
          src={season.poster_path ?? ''}
          size='default'
        />
      ))}
    </div>
  )
}

export default SeasonsSection

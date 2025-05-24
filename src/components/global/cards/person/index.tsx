import React from 'react'
import { type cast } from '~/utils/types/tmdb-types'
import Image from 'next/image'

function PersonCard({ person }: { person: cast }) {
  return (
    <div
      className="relative h-48 w-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-opacity duration-300 hover:opacity-80"
      onClick={() => {
        window.open(`https://www.google.com/search?q=${person.name}`, '_blank')
      }}
    >
      {person.profile_path !== null ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
          alt={person.name}
          fill
          className="object-cover"
          sizes="(max-width: 128px) 100vw, 128px"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-900">
          <p className="text-sm text-gray-100">No Image</p>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-900/70 p-2 text-white">
        <h3 className="truncate text-sm font-bold">{person.name}</h3>
        <p className="truncate text-xs">{person.character}</p>
      </div>
    </div>
  )
}

export default PersonCard

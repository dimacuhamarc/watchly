/** @format */
'use client'

import Image from 'next/image'

interface WatchItemProps {
  src?: string
  label?: string
}

const GeneralCard = ({ src, label }: WatchItemProps) => {
  return (
    <div
      key={label}
      className={`card group relative overflow-hidden rounded-2xl duration-300 *:transition-all hover:bg-gray-100/20`}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500/${src}`}
        alt={label ?? 'Movie poster'}
        width={500}
        height={500}
        className={`max-h-[402px] min-h-[402px] max-w-[268px] rounded-2xl transition-all duration-300 group-hover:translate-y-2 group-hover:scale-105`}
      />
      
      {/* Title overlay that appears on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-bold text-white line-clamp-2">{label}</h3>
      </div>
    </div>
  )
}

export default GeneralCard

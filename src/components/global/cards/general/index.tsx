/** @format */
'use client'

import Image from 'next/image'

interface WatchItemProps {
  src?: string
  label?: string
  date?: string
  sublabel?: string
  size?: 'default' | 'small'
}

const GeneralCard = ({
  src,
  label,
  date,
  sublabel,
  size = 'default',
}: WatchItemProps) => {
  return (
    <div
      key={label}
      className={`group card relative overflow-hidden rounded-2xl duration-300 *:transition-all hover:bg-gray-100/20`}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500/${src}`}
        alt={label ?? 'Movie poster'}
        width={500}
        height={500}
        className={`${size === 'default' ? 'max-h-[402px] min-h-[402px] max-w-[268px]' : 'max-h-[301px] min-h-[301px] max-w-[231px]'} rounded-2xl transition-all duration-300 group-hover:translate-y-2 group-hover:scale-105`}
      />

      {/* Title overlay that appears on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-lg font-bold text-white">{label}</h3>
        {date && <p className="line-clamp-1 text-sm text-gray-300">{date}</p>}
        {sublabel && (
          <p className="line-clamp-1 text-sm text-gray-400">{sublabel}</p>
        )}
      </div>
    </div>
  )
}

export default GeneralCard

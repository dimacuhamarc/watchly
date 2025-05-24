import React from 'react'
import Image from 'next/image'
interface TextWithPhotoProps {
  title: string
  image: string
  query: string | undefined
}

function TextWithPhoto({ title, image, query }: TextWithPhotoProps) {
  return (
    <div
      className="flex cursor-pointer flex-row items-center gap-2 rounded-2xl p-4 transition-all duration-300 hover:bg-gray-100"
      onClick={() => {
        if (query) {
          window.open(query, '_blank')
        }
      }}
    >
      <div className="relative h-[50px] w-[50px]">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${image}`}
          alt={title}
          fill
          className="rounded-2xl object-cover transition-all duration-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
    </div>
  )
}

export default TextWithPhoto

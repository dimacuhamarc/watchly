import React from 'react'
import Image from 'next/image'

type DisplayProps = {
  name: string
  image: string
}

function Display({ name, image }: DisplayProps) {
  return (
    <div
      className="inline-flex cursor-pointer flex-row items-center gap-4"
      onClick={() => {
        if (name) {
          window.open(`https://www.google.com/search?q=${name}`, '_blank')
        }
      }}
    >
      <div className="avatar">
        <div className="h-8 w-8 rounded-full ring-[2px] ring-primary ring-offset-2 ring-offset-base-100">
          {image ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${image}`}
              alt={name}
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              {' '}
              {name.charAt(0)}{' '}
            </div>
          )}
        </div>
      </div>
      <span>{name}</span>
    </div>
  )
}

export default Display

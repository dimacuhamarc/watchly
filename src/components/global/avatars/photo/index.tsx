import Image from 'next/image'
import React from 'react'

interface PhotoAvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
  isAutoSized?: boolean
}

function PhotoAvatar({
  src,
  alt,
  size = 64,
  className = '',
  isAutoSized = false,
}: PhotoAvatarProps) {
  // Using fill requires a parent container with position: relative and defined dimensions
  if (isAutoSized) {
    return (
      <div
        style={{ position: 'relative', width: '100%', height: '100%' }}
        className="h-24 w-24"
      >
        <Image src={src} alt={alt} fill className={className} />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  )
}

export default PhotoAvatar

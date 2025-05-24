import React from 'react'

interface InitialAvatarProps {
  name: string
}

function InitialAvatar({ name }: InitialAvatarProps) {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      className="avatar placeholder h-24 w-24"
    >
      <div className="h-full w-full rounded-lg text-neutral-content">
        <span className="text-3xl">{initials}</span>
      </div>
    </div>
  )
}

export default InitialAvatar

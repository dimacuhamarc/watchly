import React from 'react'

interface InitialAvatarProps {
  name: string;
}

function InitialAvatar({ name }: InitialAvatarProps) {
  // Split the name into words and take the first letter of each word
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }} className="avatar placeholder w-24 h-24">
      <div className="text-neutral-content h-full w-full rounded-full">
        <span className="text-3xl">{initials}</span>
      </div>
    </div>
  )
}

export default InitialAvatar
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
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content w-24 rounded-full">
        <span className="text-3xl">{initials}</span>
      </div>
    </div>
  )
}

export default InitialAvatar
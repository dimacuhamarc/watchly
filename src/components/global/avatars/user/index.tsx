import React from 'react'

import { InitialAvatar, PhotoAvatar } from '~/components/global/avatars'

interface UserAvatarProps {
  profilePicture: string | null
  name: string | null
  username: string
}

function UserAvatar({ profilePicture, name, username }: UserAvatarProps) {
  if (!profilePicture) {
    return (
      <div className="h-32 w-32 overflow-hidden rounded-lg bg-slate-700 ring ring-slate-800 ring-offset-2 ring-offset-slate-800">
        <InitialAvatar name={name ? name : 'User'} />
      </div>
    )
  }

  if (profilePicture) {
    return (
      <div className="h-32 w-32 overflow-hidden rounded-lg bg-slate-800 ring ring-slate-800 ring-offset-2 ring-offset-slate-800">
        <PhotoAvatar
          src={profilePicture ?? ''}
          alt={username}
          isAutoSized={true}
          className="h-full w-full object-cover transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-55"
        />
      </div>
    )
  }
  return null
}

export default UserAvatar

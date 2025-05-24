import React from 'react'
import { FaHeart, FaPlusCircle } from 'react-icons/fa'

interface ActivityItemProps {
  type: 'favorite' | 'add'
  movieTitle: string
  listName?: string
  timeAgo: string
  name?: string
}

function ActivityItem({
  type,
  movieTitle,
  listName,
  timeAgo,
  name = 'User',
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-2 rounded-md bg-slate-900/50 p-4 shadow-sm">
      <div className="flex-shrink-0 pt-1">
        {type === 'favorite' ? (
          <FaHeart className="text-error" />
        ) : (
          <FaPlusCircle className="text-success" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="break-words">
          <span>
            {!name || 'You'} {type === 'favorite' ? 'favorited' : 'added'}{' '}
          </span>
          <span className="text-primary">{movieTitle}</span>
          {type === 'add' && (
            <>
              <span> to </span>
              <span className="text-primary">{listName}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 text-sm text-gray-500">{timeAgo}</div>
    </div>
  )
}

export default ActivityItem

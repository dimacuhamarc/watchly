import React from 'react'

interface SkeletonProps {
  type?: 'show' | 'movie' | null
}

function Skeleton({ type }: SkeletonProps) {
  if (type === 'show') {
    return <ShowSkeleton />
  } else if (type === 'movie') {
    return <MovieSkeleton />
  } else {
    return <MovieSkeleton />
  }
}

export default Skeleton

const MovieSkeleton = () => {
  return (
    <div className="card-wrapper h-[600px]">
      <div className="group card transition-all duration-300 hover:scale-95 hover:bg-gray-100/20">
        <div className="card-body">
          <div className="skeleton h-[402px] w-full rounded-2xl transition-all group-hover:translate-y-2 group-hover:scale-110" />
          <div className="card-section flex w-full flex-row items-center justify-between transition-all duration-300 group-hover:-mb-2 group-hover:mt-8">
            <div className="flex flex-col gap-2">
              <h2 className="skeleton h-6 w-40"></h2>
              <p className="skeleton h-4 w-32"></p>
              <p className="skeleton h-4 w-24"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShowSkeleton = () => {
  return <div>ShowSkeleton</div>
}

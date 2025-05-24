import React from 'react'
interface FeatureProps {
  title: string
  description: string
  icon: React.ElementType
  colorClasses?: {
    bg: string
    icon: string
    border: string
    glow: string
  }
}

function Feature({
  title,
  description,
  icon: Icon,
  colorClasses,
}: FeatureProps) {
  return (
    <div
      className={`group card flex h-full w-full flex-col gap-4 rounded-xl px-8 py-12 text-slate-50 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 ${colorClasses?.bg} ${colorClasses?.border} ${colorClasses?.glow}`}
    >
      <Icon
        className={`transform text-3xl transition-all duration-300 group-hover:scale-125 group-hover:animate-wiggle ${colorClasses?.icon}`}
      />
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="line-clamp-2 h-full text-wrap text-lg text-slate-200">
        {description}
      </p>
    </div>
  )
}

export default Feature

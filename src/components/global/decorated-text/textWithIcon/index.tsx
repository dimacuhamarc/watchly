import React from 'react'

interface TextWithIconProps {
  text: string
  icon: React.ReactNode
}

function TextWithIcon({ text, icon }: TextWithIconProps) {
  return (
    <p className="flex flex-row items-center gap-2 text-sm md:text-base">
      <span className="mb-0.5">{icon}</span>
      <span>{text}</span>
    </p>
  )
}

export default TextWithIcon

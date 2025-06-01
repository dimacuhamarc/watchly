import React from 'react'

interface RectangleChipProps {
  label: string
  className?: string
  onClick?: () => void
}

function RectangleChip({ label, className, onClick }: RectangleChipProps) {
  return (
    <div className={`badge badge-ghost rounded-none p-4 hover:bg-gray-100 hover:text-gray-900 ${className}`} onClick={onClick}>
      {label}
    </div>
  )
}

export default RectangleChip

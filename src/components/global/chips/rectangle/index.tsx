import React from 'react'

function RectangleChip({ label }: { label: string }) {
  return (
    <div className='badge badge-ghost rounded-none p-4 hover:bg-gray-100 hover:text-gray-900'>
      {label}
    </div>
  )
}

export default RectangleChip
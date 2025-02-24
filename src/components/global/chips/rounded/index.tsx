import React from 'react'

function RoundedChip({ label }: { label: string }) {
  return (
    <div className='badge badge-outline hover:bg-gray-100 hover:text-gray-900 p-3'>
      {label}
    </div>
  )
}

export default RoundedChip
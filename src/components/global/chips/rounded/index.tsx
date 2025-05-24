import React from 'react'

function RoundedChip({ label }: { label: string }) {
  return (
    <div className="badge badge-outline p-3 hover:bg-gray-100 hover:text-gray-900">
      {label}
    </div>
  )
}

export default RoundedChip

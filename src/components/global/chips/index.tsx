import React from 'react'

function Chip({ label }: { label: string }) {
  return (
    <div className='badge badge-outline'>
      {label}
    </div>
  )
}

export default Chip
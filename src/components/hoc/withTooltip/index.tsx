import React from 'react'

function WithTooltip({ children }: { children: React.ReactNode }) {
  return (
    <div className="tooltip" data-tip="hello">
      {children}
    </div>
  )
}

export default WithTooltip

import React from 'react'

interface MilestoneItemProps {
  milestoneData: {
    title: string
    date: string
  }
}

function MilestoneItem(milestoneData: MilestoneItemProps) {
  const { title, date } = milestoneData.milestoneData
  return (
    <div className="flex flex-col">
      <p className="text-md">{title}</p>
      <p className="text-sm font-semibold">{date}</p>
    </div>
  )
}

export default MilestoneItem

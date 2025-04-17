import React from 'react'
import ActivityList from '../../Activity'

function ActivitiesContent() {
  
  return (
    <>
      <h1 className="text-2xl font-semibold leading-none">Activities</h1>
      <ActivityList userDataName='Marc' />
    </>
  )
}

export default ActivitiesContent
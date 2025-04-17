import React from 'react'

export interface UserData {
  bio?: string
}

function AboutContent({ bio }: UserData) {
  
  return (
    <>
      <p className="text-md">{bio != "" ? bio : "No bio available"}</p>
    </>
  )
}

export default AboutContent
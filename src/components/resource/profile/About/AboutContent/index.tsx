import React from 'react'

export interface UserData {
  bio?: string
}

function AboutContent({ bio }: UserData) {
  
  return (
    <>
      <h1 className="text-2xl font-semibold leading-none">About</h1>
      <p className="text-md">{bio != "" ? bio : "No bio available"}</p>
    </>
  )
}

export default AboutContent
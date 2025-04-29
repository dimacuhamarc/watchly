import React from 'react'
import { RectangleChip } from "~/components/global/chips"

export interface UserData {
  bio?: string
}

function AboutContent({ bio }: UserData) {
  
  return (
    <>
      <p className="text-md">{bio != "" ? bio : "No bio available"}</p>
      {/* <RectangleChip label="Horror" />
      <RectangleChip label="Thriller" />
      <RectangleChip label="Documentary" /> */}
    </>
  )
}

export default AboutContent
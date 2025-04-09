'use client'

import React from 'react'
import { useAuthenticated } from '~/hooks/useAuth';

interface Profilev2Props {
  params: string
}

function ProfileV2({params}: Profilev2Props) {
  const { userIdentifier, userData, cookiesLoaded } = useAuthenticated();

  if (!cookiesLoaded) {
    return <div>Loading...</div>; // Or your preferred loading indicator
  }

  console.log({
    userIdentifier,
    params,
    userData
  })

  return (
    <div>profilev2</div>
  )
}

export default ProfileV2
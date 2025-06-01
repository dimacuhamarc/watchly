import type { SanitizedUserData } from '~/utils/types/data'
import { cookies } from 'next/headers'

const fetchUserData = async (userId: string) => {
  try {
    const response = await fetch(`/api/user/details/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    const data = (await response.json()) as SanitizedUserData
    return data
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

export async function getCookies() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')
  
  return cookieHeader
}

export { fetchUserData }

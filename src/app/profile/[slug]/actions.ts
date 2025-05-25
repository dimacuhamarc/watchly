import type { SanitizedProfileData } from '~/utils/types/data'
import { cookies } from 'next/headers'

const apiURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export async function getProfileData(slug: string) {
  const cookieHeader = await getCookies()
  return fetch(`${apiURL}/api/profile/${slug}`, {
    next: { revalidate: 5}, // Revalidate every 60 seconds
    headers: {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    const response = res.json() as Promise<{
      status: string
      message: string
      data: SanitizedProfileData | null
      error?: string
    }>
    if (!res.ok) {
      return response.then((data) => {
        throw new Error(data.error ?? 'Failed to fetch profile data')
      })
    }
    return response.then((data) => {
      if (data.status !== 'success') {
        throw new Error(data.error ?? 'Failed to fetch profile data')
      }
      return data.data
    })
  })
}

export async function getCookies() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ')

  if (!cookieHeader) {
    throw new Error('No cookies found')
  }
  if (
    !cookieHeader.includes('next-auth.session-token') &&
    !cookieHeader.includes('__Secure-next-auth.session-token')
  ) {
    throw new Error('No authentication cookie found')
  }
  return cookieHeader
}

export async function revalidateProfile(username: string) {
  const { revalidateTag } = await import('next/cache')
  revalidateTag(`profile-${username}`)
}
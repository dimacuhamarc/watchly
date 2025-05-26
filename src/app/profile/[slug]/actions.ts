import type { SanitizedProfileData } from '~/utils/types/data'
import { getCookies } from '~/utils/api/apiRequests'

const apiURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

export async function getProfileData(slug: string) {
  const cookieHeader = await getCookies()
  return fetch(`${apiURL}/api/profile/${slug}`, {
    next: { revalidate: 5}, // Revalidate every 60 seconds
    headers: {
      Cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    const response = res.json() as Promise<{
      status: string
      message: string
      data: SanitizedProfileData | null
      error?: string
    }>
    if (!res.ok) {
      const data = await response
      return data.error
    }
    const data_1 = await response
    if (data_1.status !== 'success') {
      throw new Error(data_1.error ?? 'Failed to fetch profile data')
    }
    return data_1.data
  })
}

export async function revalidateProfile(username: string) {
  const { revalidateTag } = await import('next/cache')
  revalidateTag(`profile-${username}`)
}
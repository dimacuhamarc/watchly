import { NextResponse } from 'next/server'
import { getCurrentUser } from '~/lib/common/cookies'
import { getFollowersCount, getFollowingCount, getUserByUsername } from '~/lib/user'

export async function GET(
  request: Request,
  { params }: { params: { username: string } },
) {
  const { username } = params

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  const requestUserData = await getCurrentUser()

  try {
    const userData = await getUserByUsername(username)

    if (userData === null) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userId = userData?.id

    const followersCount = await getFollowersCount(userId ?? '')

    const followingCount = await getFollowingCount(userData?.id ?? '')

    const isCurrentUser = userData?.id === requestUserData?.id

    return NextResponse.json({
      status: 'success',
      message: 'User profile data fetched successfully',
      data: {
        id: userData?.id,
        username: userData?.username,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        profile_picture: userData?.profile_picture,
        email: userData?.email,
        bio: userData?.bio,
        public_profile: userData?.public_profile,
        created_at: userData?.created_at,
        followers: followersCount,
        following: followingCount,
        location: userData?.location,
        isCurrentUser: isCurrentUser,
      },
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 },
    )
  }
}

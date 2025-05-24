import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { follow } from '~/server/db/schema'
import { eq, count } from 'drizzle-orm'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const { id: userId } = await params

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const followersCount = await db
      .select({ count: count() })
      .from(follow)
      .where(eq(follow.followedUserId, userId))
      .execute()
      .then((result) => Number(result[0]?.count))

    const followingCount = await db
      .select({ count: count() })
      .from(follow)
      .where(eq(follow.userId, userId))
      .execute()
      .then((result) => Number(result[0]?.count))

    return NextResponse.json({
      status: 'success',
      message: 'Follow counts fetched successfully',
      followData: {
        followers: followersCount,
        following: followingCount,
      },
    })
  } catch (error) {
    console.error('Error fetching follow counts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch follow counts' },
      { status: 500 },
    )
  }
}

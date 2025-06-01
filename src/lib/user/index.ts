import { db } from '~/server/db'
import { users, follow } from '~/server/db/schema'
import { eq, count } from 'drizzle-orm'

export async function getUserById(userId: string) {
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .execute()
  if (userData.length === 0) {
    return null
  }
  return userData[0]
}

export async function getUserByUsername(username: string) {
  const userData = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .execute()
  if (userData.length === 0) {
    return null
  }
  return userData[0]
}

export async function getFollowersCount(userId: string) {
  const followersCount = await db
    .select({ count: count() })
    .from(follow)
    .where(eq(follow.followedUserId, userId)) // Fixed: This should be followedUserId for followers
    .execute()
    .then((result) => Number(result[0]?.count))
  return followersCount
}

export async function getFollowingCount(userId: string) {
  const followingCount = await db
    .select({ count: count() })
    .from(follow)
    .where(eq(follow.userId, userId)) // Fixed: This should be userId for following
    .execute()
    .then((result) => Number(result[0]?.count)) 

  return followingCount
}
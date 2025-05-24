import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import type { SanitizedUserData } from '~/utils/types/data'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 },
      )
    }

    if (!db?.query?.users) {
      console.error('Database connection or user query is not defined.')
      return NextResponse.json(
        { error: 'Internal Server Error: Database not configured properly' },
        { status: 500 },
      )
    }

    try {
      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, id),
      })

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      const sanitizedUser: SanitizedUserData = {
        id: user.id,
        email: user.email,
        username: user.username ?? '',
        bio: user.bio ?? '',
        profile_picture: user.profile_picture ?? '',
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        created_at: user.created_at,
      }

      return NextResponse.json(sanitizedUser, { status: 200 })
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return NextResponse.json(
        { error: 'Database query error', details: String(dbError) },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: String(error) },
      { status: 500 },
    )
  }
}

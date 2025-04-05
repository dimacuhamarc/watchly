import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import type { SanitizedUserData } from '~/utils/types/data';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const params = context.params;

    if (!db?.query?.users) {
      console.error('Database connection or user query is not defined.');
      return NextResponse.json(
        { error: 'Internal Server Error: Database not configured properly' },
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    try {
      // Use a direct query approach to avoid the map error
      const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, params.id),
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      // Ensure user properties are properly checked before using them
      const sanitizedUser: SanitizedUserData = {
        id: user.id,
        email: user.email,
        username: user.username ?? '',
        image: user.image ?? '',
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        created_at: user.created_at,
      };

      return NextResponse.json(sanitizedUser, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      return NextResponse.json(
        { error: 'Database query error', details: String(dbError) },
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: String(error) },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
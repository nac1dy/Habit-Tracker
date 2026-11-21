import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/backend/auth/currentUser';

export const dynamic = 'force-dynamic';

/**
 * GET /api/habits
 * Fetches all habits of the logged in user
 */
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data, error } = await user.supabase
      .from('habit')
      .select('*')
      .eq('userid', user.userId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch habit' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/habits
 * Creates a new habit owned by the logged in user
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, frequenz } = body;

    // Validation
    if (!title || !category || !frequenz) {
      return NextResponse.json(
        { error: 'Missing required fields: title, category, frequenz' },
        { status: 400 }
      );
    }

    // The owner is set by the database through default auth.uid()
    const { data, error } = await user.supabase
      .from('habit')
      .insert([
        {
          title,
          category,
          frequenz,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create habit' },
      { status: 500 }
    );
  }
}

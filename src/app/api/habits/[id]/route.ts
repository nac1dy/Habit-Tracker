import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/backend/auth/currentUser';

/**
 * GET /api/habits/:id
 * Fetches a single habit of the logged in user
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;

    const { data, error } = await user.supabase
      .from('habit')
      .select('*')
      .eq('habitid', id)
      .eq('userid', user.userId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
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
 * DELETE /api/habits/:id
 * Deletes a habit of the logged in user
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;

    const { data, error } = await user.supabase
      .from('habit')
      .delete()
      .eq('habitid', id)
      .eq('userid', user.userId)
      .select('habitid');

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // No deleted row means the habit does not exist or belongs to someone else
    if (data.length === 0) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Habit deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete habit' },
      { status: 500 }
    );
  }
}

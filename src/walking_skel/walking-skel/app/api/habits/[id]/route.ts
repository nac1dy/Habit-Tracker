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

//Update von Titel, Kathegorie, Häufikeit vom Habit des eingeloggten Users 
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } //id aus URL 
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 }); //prüft auf Login
    }

    const { id } = await params;
    const body = await request.json();

    // Attribute, welche geändert wurden werden gespeichert 
    const update: Record<string, unknown> = {};

    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || !body.title.trim()) {
        return NextResponse.json({ error: 'Title must not be empty' }, { status: 400 });
      }
      update.title = body.title.trim();
    }
    if (body.category !== undefined) update.category = body.category;
    if (body.frequenz !== undefined) update.frequenz = body.frequenz;

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
    }

    const { data, error } = await user.supabase
      .from('habit')
      .update(update)
      .eq('habitid', id)
      .eq('userid', user.userId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update habit' },
      { status: 500 }
    );
  }
}

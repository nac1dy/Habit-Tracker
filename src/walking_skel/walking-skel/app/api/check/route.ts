import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/app/backend/auth/currentUser';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data, error } = await user.supabase
      .from('entry')
      .select('*')
      .eq('userid', user.userId)
      .order('date', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch entry' },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const {habitID, date, done} = await request.json();

    // Validation
    if (!habitID || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: habitID, date' },
        { status: 400 }
      );
    }

    // An entry must never point to a habit of another user
    const { data: habit, error: habitError } = await user.supabase
      .from('habit')
      .select('habitid')
      .eq('habitid', habitID)
      .eq('userid', user.userId)
      .maybeSingle();

    if (habitError) throw habitError;
    if (!habit) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    if(done){
        const { error } = await user.supabase
        .from('entry')
        .insert({ habitid: habitID, userid: user.userId, date })
        .select();

        if(error) throw error;
    }else{
        const { error } = await user.supabase
        .from('entry')
        .delete()
        .match({ habitid: habitID, userid: user.userId, date })
        if(error) throw error;
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

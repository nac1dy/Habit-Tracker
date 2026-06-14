import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/backend/supabase';

export async function POST(request: NextRequest) {
  try {
    const { habitid, date, done } = await request.json();

    if (!habitid || !date) {
      return NextResponse.json({ error: 'Missing habitid or date' }, { status: 400 });
    }

    const userid = '6cd9dc1f-abba-44d1-abb7-724380f5f8a7';

    if (done) {
      // Habit wurde abgehakt -> Eintrag in die Tabelle schreiben
      const { error } = await supabase
        .from('entry') // Achte darauf, dass deine Tabelle in Supabase so heißt
        .insert({ habitid, date, userid });

      if (error) throw error;
    } else {
      // Habit wurde rückgängig gemacht -> Eintrag aus der Tabelle löschen
      const { error } = await supabase
        .from('entry')
        .delete()
        .match({ habitid, date, userid }); // Löscht den spezifischen Tag für diesen Habit

      if (error) throw error;
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const userid = '6cd9dc1f-abba-44d1-abb7-724380f5f8a7';
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('entry')
      .select('habitid')
      .eq('userid', userid)
      .eq('date', today);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch entries' },
      { status: 500 }
    );
  }
}

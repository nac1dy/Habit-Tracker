import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/backend/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('entry') 
      .select('*')
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


const userID = '6cd9dc1f-abba-44d1-abb7-724380f5f8a7';
export async function POST(request: NextRequest) {
  try {
    const {habitID, date, done} = await request.json();

    // Validation
    if (!habitID || !date) {
      return NextResponse.json(
        { error: 'Missing required fields: habitID, date' },
        { status: 400 }
      );
    }
    if(done){
        const { error } = await supabase
        .from('entry')
        .insert({ habitid: habitID, userid: userID, date })
        .select();

        if(error) throw error;
    }else{
        const { error } = await supabase
        .from('entry')
        .delete()
        .match({ habitid: habitID, userid: userID, date })
        if(error) throw error;
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
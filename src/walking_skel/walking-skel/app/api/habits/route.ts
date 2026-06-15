import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/backend/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/habits
 * Fetches all habits for the authenticated user (or all if public)
 */
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('habit') 
      .select('*')
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
 * Creates a new habit
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, category, frequenz } = body;

    // Validation
    if (!title || !category || !frequenz) {
      return NextResponse.json(
        { error: 'Missing required fields: title, category, frequenz' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
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
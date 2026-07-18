import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { userId, journeyId } = body;

    if (!userId || !journeyId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, journeyId' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', userId)
      .eq('journey_id', journeyId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Clear chat history error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

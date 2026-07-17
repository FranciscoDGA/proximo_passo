import { NextRequest, NextResponse } from 'next/server';
import { sendChatMessage, getChatHistory } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, journeyId, message } = body;

    if (!userId || !journeyId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, journeyId, message' },
        { status: 400 }
      );
    }

    const response = await sendChatMessage(userId, journeyId, message);

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const journeyId = searchParams.get('journeyId');

    if (!userId || !journeyId) {
      return NextResponse.json(
        { error: 'Missing required query params: userId, journeyId' },
        { status: 400 }
      );
    }

    const history = await getChatHistory(userId, journeyId);

    return NextResponse.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error('Chat history API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

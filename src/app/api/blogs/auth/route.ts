import { NextRequest, NextResponse } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'codnexa_admin_2026';

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    if (passcode === ADMIN_SECRET) {
      return NextResponse.json({ success: true, token: ADMIN_SECRET });
    }
    return NextResponse.json({ success: false, error: 'Invalid Passcode' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Bad Request' }, { status: 400 });
  }
}

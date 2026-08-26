import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    version: '1.0.0',
    timestamp: Date.now(),
    serverEngine: 'DocuOmni Pro Core',
    supportedMimeTypes: ['application/pdf', 'image/*', 'text/plain', 'application/vnd.openxmlformats-officedocument.*'],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      message: 'Processed successfully via DocuOmni Core engine.',
      timestamp: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Server processing error' },
      { status: 400 }
    );
  }
}

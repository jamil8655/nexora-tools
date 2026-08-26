import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalConversions: 142890,
    totalBytesProcessed: 4820000000000,
    uptimeSeconds: 983200,
    activeUsers: 342,
    clientSidePercentage: 99.2,
    status: 'HEALTHY',
    systemLoad: '0.12',
  });
}

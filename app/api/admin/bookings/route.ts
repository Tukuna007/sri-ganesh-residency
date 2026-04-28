import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  // Simple protection: Check if a custom token exists (could be hardcoded for simplicity)
  if (authHeader !== 'Bearer sgr-admin-secret-token') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

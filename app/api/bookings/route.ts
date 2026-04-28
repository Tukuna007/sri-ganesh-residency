import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const booking = await Booking.create({
      ...data,
      paymentStatus: 'Pending'
    });

    return NextResponse.json({ success: true, bookingId: booking._id }, { status: 201 });
  } catch (error: any) {
    console.error('Booking Creation Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

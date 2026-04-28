import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json();
    await connectDB();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Convert amount to paise
    const amountInPaise = Math.round(booking.amount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `booking_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);

    // Store order ID in booking
    booking.razorpay_order_id = order.id;
    await booking.save();

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error('Razorpay Order Creation Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

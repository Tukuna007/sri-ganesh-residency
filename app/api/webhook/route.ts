import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const bookingId = payment.notes.bookingId || payment.receipt.replace('booking_', '');

      await connectDB();
      const booking = await Booking.findById(bookingId);

      if (booking && booking.paymentStatus !== 'Paid') {
        booking.paymentStatus = 'Paid';
        booking.razorpay_payment_id = payment.id;
        booking.razorpay_order_id = payment.order_id;
        booking.paid_amount = payment.amount / 100;
        booking.paid_at = new Date();
        await booking.save();
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

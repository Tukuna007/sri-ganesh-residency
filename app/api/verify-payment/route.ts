import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = await request.json();

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      await connectDB();
      const booking = await Booking.findById(bookingId);

      if (!booking) {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
      }

      if (booking.paymentStatus === 'Paid') {
        return NextResponse.json({ success: true, message: 'Already paid' });
      }

      booking.paymentStatus = 'Paid';
      booking.razorpay_payment_id = razorpay_payment_id;
      booking.razorpay_order_id = razorpay_order_id;
      booking.paid_amount = booking.amount;
      booking.paid_at = new Date();
      await booking.save();

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Payment Verification Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  roomName: { type: String, required: true },
  roomId: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  checkInTime: { type: String }, // Format: "10:00 AM"
  guests: { type: Number, required: true },
  amount: { type: Number, required: true }, // This will be the amount to pay NOW (e.g. 500)
  totalAmount: { type: Number }, // Total stay price including taxes
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  paid_amount: { type: Number },
  paid_at: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

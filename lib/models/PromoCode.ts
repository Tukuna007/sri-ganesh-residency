import mongoose from 'mongoose';

const PromoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage',
  },
  value: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PromoCode || mongoose.model('PromoCode', PromoCodeSchema);

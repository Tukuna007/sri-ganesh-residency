import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: 0,
  },
  image: String,
  capacity: Number,
  availableCount: {
    type: Number,
    default: 1,
  },
  totalRooms: {
    type: Number,
    default: 1,
  },
  amenities: [String],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/lib/models/Room';
import { ROOMS } from '@/lib/constants';

const ADMIN_SECRET = 'sgr-admin-secret-token';

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const rooms = await Room.find().sort({ id: 1 });
    return NextResponse.json(rooms);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    // Drop existing rooms to re-seed with new schema
    await Room.deleteMany({});

    const roomsToCreate = ROOMS.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      price: r.price,
      originalPrice: (r as any).originalPrice || r.price + 500,
      image: r.image,
      capacity: r.guests,
      availableCount: r.available,
      totalRooms: r.total,
      amenities: r.amenities
    }));


    await Room.insertMany(roomsToCreate);
    return NextResponse.json({ message: 'Rooms synced/seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, _id, price, originalPrice, availableCount, totalRooms, capacity } = await request.json();
    await connectDB();
    
    const query = _id ? { _id } : { id };
    
    const updatedRoom = await Room.findOneAndUpdate(
      query,
      { price, originalPrice, availableCount, totalRooms, capacity, updatedAt: new Date() },
      { returnDocument: 'after' }
    );

    return NextResponse.json(updatedRoom);
  } catch (error: any) {


    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

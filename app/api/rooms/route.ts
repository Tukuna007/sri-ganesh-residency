import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/lib/models/Room';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    await connectDB();
    if (id) {
      const room = await Room.findOne({ id: parseInt(id) });
      return NextResponse.json(room);
    }
    const rooms = await Room.find().sort({ id: 1 });
    return NextResponse.json(rooms);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

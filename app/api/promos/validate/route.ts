import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PromoCode from '@/lib/models/PromoCode';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  try {
    await connectDB();
    const promo = await PromoCode.findOne({ 
      code: code.toUpperCase().trim(),
      isActive: true 
    });

    if (!promo) {
      return NextResponse.json({ valid: false, error: 'Invalid or expired promo code' });
    }

    return NextResponse.json({ 
      valid: true, 
      type: promo.type, 
      value: promo.value 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

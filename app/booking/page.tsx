import LayoutWrapper from '../layout-wrapper'
import { constructMetadata } from '@/lib/seo/metadata'
import BookingContent from '@/components/booking-content'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Suspense } from 'react'
import connectDB from '@/lib/mongodb'
import RoomModel from '@/lib/models/Room'
import { ROOMS as STATIC_ROOMS } from '@/lib/constants'

export const metadata = constructMetadata({
  title: 'Book Your Stay',
  description: 'Complete your booking at Sri Ganesh Residency. Experience luxury and comfort in just a few steps.',
  noIndex: true,
})

export default async function BookingPage() {
  const dictionary = await getDictionary('en')

  let rooms = STATIC_ROOMS
  try {
    await connectDB()
    const dbRooms = await RoomModel.find().lean()
    
    if (dbRooms && dbRooms.length > 0) {
      rooms = STATIC_ROOMS.map(staticRoom => {
        const dbRoom = dbRooms.find((r: any) => r.id === staticRoom.id)
        if (dbRoom) {
          return {
            ...staticRoom,
            price: dbRoom.price,
            originalPrice: dbRoom.originalPrice,
            guests: dbRoom.capacity,
            available: dbRoom.availableCount,
            total: dbRoom.totalRooms
          }
        }
        return staticRoom
      })
    }
  } catch (err) {
    console.error('Failed to fetch rooms for booking page', err)
  }
  
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background text-foreground">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <BookingContent dictionary={dictionary} rooms={rooms} />
        </Suspense>
      </main>
    </LayoutWrapper>
  )
}


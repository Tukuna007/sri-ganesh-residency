import RoomsContent from '@/components/rooms-content'
import { ROOMS as STATIC_ROOMS } from '@/lib/constants'
import { constructMetadata } from '@/lib/seo/metadata'
import LayoutWrapper from '../layout-wrapper'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import connectDB from '@/lib/mongodb'
import RoomModel from '@/lib/models/Room'

export const metadata = constructMetadata({
  title: 'Our Rooms',
  description: 'Explore our range of luxury accommodations at Sri Ganesh Residency.',
})

export default async function RoomsPage() {
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
    console.error('Failed to fetch rooms from DB', err)
  }

  return (
    <LayoutWrapper>
      <RoomsContent rooms={rooms} dictionary={dictionary} />
    </LayoutWrapper>
  )
}

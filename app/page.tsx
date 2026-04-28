import HeroSection from '@/components/hero-section'
import FeaturedRooms from '@/components/featured-rooms'
import AmenitiesSection from '@/components/amenities-section'
import Testimonials from '@/components/testimonials'
import GalleryPreview from '@/components/gallery-preview'
import LocationSection from '@/components/location-section'
import { constructMetadata } from '@/lib/seo/metadata'
import LayoutWrapper from './layout-wrapper'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import connectDB from '@/lib/mongodb'
import RoomModel from '@/lib/models/Room'
import { ROOMS as STATIC_ROOMS } from '@/lib/constants'

export const metadata = constructMetadata()

export default async function Home() {
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
    console.error('Failed to fetch rooms for homepage', err)
  }

  return (
    <LayoutWrapper>
      <main>
        <HeroSection dictionary={dictionary} />
        <FeaturedRooms dictionary={dictionary} rooms={rooms} />
        <AmenitiesSection dictionary={dictionary} />
        <Testimonials dictionary={dictionary} />
        <GalleryPreview />
        <LocationSection />
      </main>
    </LayoutWrapper>
  )
}

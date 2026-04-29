import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import RoomCard from './room-card'

interface FeaturedRoomsProps {
  dictionary: any
  rooms: any[]
}

export default function FeaturedRooms({ dictionary, rooms }: FeaturedRoomsProps) {
  const FEATURED_ROOMS = rooms.slice(0, 3)

  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 animate-fade-in group">
          <div className="inline-block py-2 px-6 bg-primary/5 border border-primary/20 rounded-full mb-6 transition-transform group-hover:scale-105 duration-500">
            <span className="text-[10px] sm:text-xs font-bold text-primary tracking-[0.3em] uppercase">Exquisite Living</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold text-foreground mb-6 md:mb-8 leading-tight">
            {dictionary.common.iconic_title}
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-8 rounded-full" />
          <p className="text-base md:text-xl text-foreground/60 max-w-3xl mx-auto font-light leading-relaxed px-2">
            {dictionary.common.iconic_subtitle}
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {FEATURED_ROOMS.map((room) => (
            <div key={room.id} className="animate-fade-in [animation-delay:200ms]">
              <RoomCard {...room} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-16 md:mt-24 animate-fade-in [animation-delay:400ms]">
          <Button asChild variant="outline" className="luxury-button border-primary/30 text-primary hover:bg-primary/5 px-8 md:px-12 h-14 md:h-16 text-xs">
            <Link href="/rooms" className="flex items-center gap-3">
              {dictionary.common.view_all_rooms} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

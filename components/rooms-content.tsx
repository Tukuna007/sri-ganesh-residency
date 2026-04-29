'use client'

import { useState, useMemo } from 'react'
import RoomFilter from '@/components/room-filter'
import RoomCard from '@/components/room-card'
import Image from 'next/image'
import Breadcrumbs from '@/components/breadcrumb'

interface Room {
  id: number
  slug: string
  name: string
  category: string
  price: number
  originalPrice?: number
  guests: number
  amenities: string[]
  image?: string
  images?: string[]
  video?: string
  available?: number
  total?: number
}

interface FilterState {
  type: string[]
  priceRange: [number, number]
  guests: number
}

interface RoomsContentProps {
  rooms: Room[]
  dictionary: any
}

export default function RoomsContent({ rooms, dictionary }: RoomsContentProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    priceRange: [100, 10000],
    guests: 0
  })

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      if (filters.type.length > 0 && !filters.type.includes(room.category)) return false
      if (room.price < filters.priceRange[0] || room.price > filters.priceRange[1]) return false
      if (filters.guests > 0 && room.guests < filters.guests) return false
      return true
    })
  }, [rooms, filters])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="relative h-[60vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <Image
            src="/rooms/Deluxe/WhatsApp Image 2026-03-21 at 12.57.28.jpeg"
            alt="Stay with Us"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24 md:pt-20">
          <div className="mb-8 md:mb-10 animate-fade-in">
            <Breadcrumbs items={[{ label: dictionary.common.rooms }]} variant="dark" />
          </div>
          <h1 className="text-5xl md:text-9xl font-serif font-bold text-white mb-8 md:mb-10 leading-[1.1] md:leading-[0.9] animate-fade-in italic tracking-tighter drop-shadow-2xl">
            {dictionary.common.rooms_title}
          </h1>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto font-light leading-relaxed animate-fade-in px-4">
            {dictionary.common.rooms_subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16">
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32">
              <RoomFilter onFilterChange={setFilters} />
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredRooms.length > 0 ? (
              <div className="space-y-10 md:space-y-12">
                <div className="flex flex-col sm:flex-row items-center justify-between group gap-4">
                  <p className="text-[10px] font-bold text-foreground/70 uppercase tracking-[0.3em]">
                    Displaying {filteredRooms.length} of {rooms.length} Exquisite Options
                  </p>
                  <div className="hidden sm:block h-px flex-grow mx-8 bg-border/40" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {filteredRooms.map((room) => (
                    <div key={room.id} className="animate-fade-in">
                      <RoomCard {...room} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-24 md:py-32 bg-card rounded-[2.5rem] md:rounded-[3rem] border border-border/40 luxury-shadow px-6">
                <p className="text-xl md:text-2xl font-serif text-foreground/80 mb-4 italic">No rooms match your specific criteria.</p>
                <div className="w-16 h-px bg-primary/30 mx-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface GalleryImage {
  id: number
  title: string
  category: string
  span?: string
  src: string
}

const GALLERY_ITEMS: GalleryImage[] = [
  { id: 1, title: 'Double Deluxe Sanctuary', category: 'Rooms', span: 'md:col-span-2', src: '/rooms/Double Deluxe/IMG-20251208-WA0016.jpg' },
  { id: 2, title: 'Modern Vertical Transit', category: 'Facilities', span: 'md:row-span-2', src: '/lift.jpeg' },
  { id: 3, title: 'Grand Reception', category: 'Lobby', span: '', src: '/lobby.jpeg' },
  { id: 4, title: 'Deluxe Comfort', category: 'Rooms', span: '', src: '/rooms/Deluxe/IMG-20251208-WA0018.jpg' },
  { id: 5, title: 'Residency Facade', category: 'Exterior', span: 'md:col-span-2', src: '/hotel .jpeg' },
]

export default function GalleryPreview() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-24 animate-fade-in group">
          <div className="inline-block py-2 px-6 bg-primary/5 border border-primary/20 rounded-full mb-6 transition-transform group-hover:scale-105 duration-500 gpu-accel">
            <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">Visual Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-8xl font-serif font-bold text-foreground mb-6 md:mb-8 italic leading-tight">
            The Residency Gallery
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-8 rounded-full" />
          <p className="text-sm md:text-xl text-foreground/50 max-w-3xl mx-auto font-light leading-relaxed">
            Experience the architectural elegance and interior precision of our boutique retreat.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-24">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className={`group relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[1/1.1] cursor-pointer animate-fade-in [animation-delay:calc(idx*100ms)] luxury-shadow hover:luxury-shadow-hover transition-all duration-700 hover:-translate-y-2 gpu-accel ${item.span || ''}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Optimized Overlays */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-primary/40 transition-colors duration-700 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-white transform transition-all duration-700 group-hover:-translate-y-2">
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-2 md:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">{item.category}</p>
                <h3 className="font-serif text-lg md:text-2xl font-bold leading-tight group-hover:text-white transition-colors duration-300 italic">{item.title}</h3>
                <div className="w-12 h-0.5 bg-primary/60 mt-3 md:mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>
            </div>
          ))}
        </div>

        {/* View Gallery Button */}
        <div className="text-center animate-fade-in [animation-delay:500ms]">
          <Button asChild className="luxury-button bg-foreground text-background hover:bg-foreground/90 px-8 md:px-12 h-14 md:h-16 rounded-full shadow-2xl text-[10px] font-bold uppercase tracking-widest">
            <Link href="/gallery" className="flex items-center gap-3">
              View All <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

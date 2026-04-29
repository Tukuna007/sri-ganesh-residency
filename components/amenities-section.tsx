import { Wifi, Clock, Tv, Wind, Coffee, Lock } from 'lucide-react'

interface Amenity {
  icon: React.ReactNode
  title: string
  description: string
}

const AMENITIES: Amenity[] = [
  {
    icon: <Wifi className="w-8 h-8" />,
    title: 'Free WiFi',
    description: 'High-speed internet connectivity throughout the hotel'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: '24/7 Front Desk',
    description: 'Round-the-clock assistance for your convenience'
  },
  {
    icon: <Tv className="w-8 h-8" />,
    title: 'Modern Amenities',
    description: 'Air conditioning, flat-screen TV, and comfortable furnishings'
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: 'Hot Beverages',
    description: 'Complimentary tea and coffee in your room'
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: 'Clean & Fresh',
    description: 'Daily housekeeping and well-maintained facilities'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Safe & Secure',
    description: 'Secure facilities with privacy and safety guaranteed'
  }
]

export default function AmenitiesSection({ dictionary }: { dictionary: any }) {
  return (
    <section className="py-24 md:py-40 bg-muted/20 relative overflow-hidden section-tonal-alt">
      <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-[0.03]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-32 animate-fade-in group">
          <div className="inline-block py-2 px-6 bg-primary/5 border border-primary/20 rounded-full mb-6 md:mb-8 transition-transform group-hover:scale-105 duration-500 gpu-accel">
            <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">Premium Comfort</span>
          </div>
          <h2 className="text-4xl md:text-8xl font-serif font-bold text-foreground mb-6 md:mb-8 italic leading-tight">
            Refined Amenities
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-8 rounded-full" />
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {AMENITIES.map((amenity, idx) => (
            <div
              key={idx}
              className="group p-6 sm:p-8 md:p-12 premium-card luxury-shadow hover:luxury-shadow-hover transition-all duration-700 animate-fade-in [animation-delay:calc(idx*100ms)] gpu-accel hover:-translate-y-2"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-muted/50 flex items-center justify-center text-primary mb-6 md:mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:rotate-[15deg] gpu-accel border border-primary/10">
                <div className="scale-[0.6] sm:scale-75 md:scale-100">{amenity.icon}</div>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-foreground mb-3 md:mb-6 italic">
                {amenity.title}
              </h3>
              <p className="text-foreground/50 leading-relaxed font-light text-sm md:text-lg">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

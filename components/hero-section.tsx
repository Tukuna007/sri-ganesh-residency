import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HeroSection({ dictionary }: { dictionary: any }) {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 scale-105 transition-transform duration-[3000ms] hover:scale-100 ease-out gpu-accel">
        <Image
          src="/hero.jpg"
          alt="Sri Ganesh Residency Luxury Facade"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 text-center text-white pt-20 sm:pt-24 md:pt-32">
        <div className="inline-block py-2 px-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 sm:mb-8 md:mb-10 animate-fade-in gpu-accel">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.4em] uppercase text-primary-foreground/90">{dictionary.common.welcome}</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-4 sm:mb-6 md:mb-8 leading-[1.2] sm:leading-[1.1] md:leading-[0.9] drop-shadow-2xl animate-fade-in [animation-delay:200ms] gpu-accel italic">
          {dictionary.common.home_title}
        </h1>
        
        <p className="text-sm sm:text-base md:text-2xl text-white/90 mb-8 sm:mb-10 md:mb-14 font-light leading-relaxed max-w-2xl mx-auto animate-fade-in [animation-delay:400ms] gpu-accel drop-shadow-lg px-2 sm:px-4">
          {dictionary.common.home_subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center animate-fade-in [animation-delay:600ms] gpu-accel px-4">
          <Button asChild className="luxury-button bg-primary text-white hover:bg-black w-full sm:w-auto h-16 md:h-18 text-xs border-none shadow-xl shadow-primary/20 group">
            <Link href="/rooms" className="flex items-center justify-center gap-3">
              {dictionary.common.explore_rooms} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="luxury-button border-white/60 text-white hover:bg-white hover:text-black w-full sm:w-auto h-16 md:h-18 text-[10px] sm:text-xs backdrop-blur-md shadow-xl bg-white/10">
            <Link href="/contact" className="flex items-center justify-center">
              {dictionary.common.contact_us}
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex justify-center mt-24 pt-20 border-t border-white/20 animate-fade-in [animation-delay:800ms] gpu-accel">
          {[
            { label: dictionary.common.room_types, value: '4' }
          ].map((stat, idx) => (
            <div key={idx} className="group text-center">
              <div className="text-4xl md:text-7xl font-serif font-bold text-primary mb-3 transition-transform group-hover:-translate-y-2 duration-500 gpu-accel drop-shadow-md">{stat.value}</div>
              <p className="text-[10px] md:text-[11px] text-white font-bold uppercase tracking-[0.4em] drop-shadow-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[120px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-[150px] animate-pulse-soft [animation-delay:1000ms]" />
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-fade-in [animation-delay:1200ms]">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40 rotate-90 origin-left ml-1 mt-4">Scroll</span>
      </div>
    </section>
  )
}

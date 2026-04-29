'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Users, Wind, Star, CheckCircle2, XCircle, ShoppingBag } from 'lucide-react'
import { formatPrice, type Currency, DEFAULT_CURRENCY } from '@/lib/currency'
import { cn } from '@/lib/utils'

interface RoomCardProps {
  id: number
  slug: string
  name: string
  category: string
  price: number
  originalPrice?: number
  guests: number
  amenities: string[]
  image?: string
  available?: number
  total?: number
}

export default function RoomCard({ id, slug, name, category, price, originalPrice, guests, amenities, image, available, total }: RoomCardProps) {
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('currency') as Currency
    if (saved) setCurrency(saved)

    const handleCurrencyChange = (event: Event) => {
      const customEvent = event as CustomEvent<Currency>
      setCurrency(customEvent.detail)
    }

    window.addEventListener('currencyChanged', handleCurrencyChange)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange)
  }, [])

  if (!mounted) return null

  const isSoldOut = available !== undefined && available <= 0
  const hasDiscount = originalPrice && originalPrice > price
  const savings = hasDiscount ? originalPrice! - price : 0

  return (
    <div className={cn(
      "group premium-card flex flex-col luxury-shadow hover:luxury-shadow-hover transition-all duration-500 hover:-translate-y-2 gpu-accel h-full border border-border/40 overflow-hidden bg-card rounded-[2.5rem]",
      isSoldOut && "opacity-80 grayscale-[0.3]"
    )}>
      {/* Room Image Container */}
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <Image
          src={image || `/rooms/deluxe-room.jpg`}
          alt={name}
          fill
          className="object-cover transition-transform duration-[1200ms] group-hover:scale-110 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-6 right-6 z-10">
          <div className={cn(
            "px-4 py-1.5 backdrop-blur-md rounded-full shadow-lg flex items-center gap-2 border transition-all duration-500",
            isSoldOut ? "bg-red-500/90 text-white border-red-400" : "bg-green-500/90 text-white border-green-400"
          )}>
            {isSoldOut ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {isSoldOut ? "Sold Out" : `${available} Available`}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 md:p-10 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase">{category}</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-2 md:w-2.5 h-2 md:h-2.5 fill-primary text-primary" />
            ))}
          </div>
        </div>
        
        <h3 className="text-lg md:text-2xl font-serif font-bold text-foreground mb-3 md:mb-6 group-hover:text-primary transition-colors duration-300 italic leading-tight">
          {name}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 md:gap-x-5 gap-y-2 text-[9px] md:text-[10px] font-bold text-muted-foreground mb-5 md:mb-8 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Users className="w-3 md:w-3.5 h-3 md:h-3.5 text-primary" />
            <span>{guests} Guests</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Wind className="w-3 md:w-3.5 h-3 md:h-3.5 text-primary" />
            <span>A/C Room</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mt-auto space-y-4 md:space-y-6">
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="flex items-baseline gap-2 md:gap-3">
              <span className="text-2xl md:text-4xl font-serif font-bold text-foreground">
                {formatPrice(price, currency)}
              </span>
              {hasDiscount && (
                <span className="text-base md:text-xl text-foreground/30 line-through font-light">
                  {formatPrice(originalPrice!, currency)}
                </span>
              )}
            </div>
            
            {hasDiscount && (
              <div className="inline-flex items-center gap-2 py-0.5 md:py-1 px-2.5 md:px-3 bg-primary/5 border border-primary/10 rounded-full w-fit">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-widest">
                  SAVINGS: {formatPrice(savings, currency)} OFF
                </span>
              </div>
            )}
          </div>

          <Button asChild disabled={isSoldOut} className={cn(
            "w-full h-12 md:h-16 rounded-xl md:rounded-2xl border-none shadow-xl transition-all duration-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]",
            isSoldOut ? "bg-muted text-foreground/30 cursor-not-allowed" : "bg-[#4A1D1D] text-white hover:bg-black shadow-[#4A1D1D]/20 active:scale-[0.98]"
          )}>
            <Link href={isSoldOut ? "#" : `/rooms/${slug}`}>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                {isSoldOut ? "Fully Booked" : (
                  <>
                    <ShoppingBag className="w-3.5 md:w-4 h-3.5 md:h-4" />
                    Reserve Now
                  </>
                )}
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

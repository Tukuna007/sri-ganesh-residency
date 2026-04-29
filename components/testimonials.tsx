'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Lakshmi Priya',
    role: 'Travel Enthusiast',
    content: 'An absolutely unforgettable experience. Every detail was perfect, from the impeccable service to the exquisite dining. This is luxury redefined.',
    rating: 5
  },
  {
    id: 2,
    name: 'Suresh Reddy',
    role: 'Business Executive',
    content: 'The finest accommodation I\'ve ever experienced. The attention to detail and personalized service exceeded all expectations. Highly recommended.',
    rating: 5
  },
  {
    id: 3,
    name: 'Ananya Patnaik',
    role: 'Luxury Travel Blogger',
    content: 'Elegance Luxe represents the pinnacle of hospitality. From the spa to the fine dining, everything is world-class. A truly transformative retreat.',
    rating: 5
  },
  {
    id: 4,
    name: 'Ramesh Naidu',
    role: 'Corporate Traveler',
    content: 'Stayed for a conference and fell in love with the property. The wellness center is exceptional, and the staff goes above and beyond.',
    rating: 5
  }
]

export default function Testimonials({ dictionary }: { dictionary: any }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const goToPrevious = () => {
    setAutoPlay(false)
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const goToNext = () => {
    setAutoPlay(false)
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const currentTestimonial = TESTIMONIALS[activeIndex]

  return (
    <section className="py-20 md:py-32 bg-muted/20 relative overflow-hidden section-tonal-alt">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/luxury-pattern.svg')] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-24 animate-fade-in group">
          <div className="inline-block py-2 px-6 bg-primary/5 border border-primary/20 rounded-full mb-8 transition-transform group-hover:scale-105 duration-500 gpu-accel">
            <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">Refined Praise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-8xl font-serif font-bold text-foreground mb-6 md:mb-8 italic">
            Guest Chronicles
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-10 rounded-full" />
        </div>

        {/* Testimonial Card */}
        <div className="relative group">
          <div className="bg-card border border-border/40 rounded-[2.5rem] md:rounded-[3rem] p-8 sm:p-12 md:p-24 luxury-shadow hover:luxury-shadow-hover min-h-[400px] md:min-h-[550px] flex flex-col justify-between animate-fade-in [animation-delay:200ms] transition-all duration-700 hover:-translate-y-1 relative overflow-hidden gpu-accel">
            <Quote className="absolute top-8 md:top-16 right-8 md:right-16 w-20 md:w-40 h-20 md:h-40 text-primary/5 -rotate-12 select-none scale-110 opacity-40 transition-transform duration-700 group-hover:rotate-0" />
            
            {/* Rating */}
            <div className="flex gap-1.5 md:gap-2 mb-8 md:mb-12">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className={`w-4 h-4 md:w-5 md:h-5 drop-shadow-[0_0_8px_rgba(184,149,74,0.3)] ${idx < currentTestimonial.rating ? 'fill-primary text-primary' : 'text-muted-foreground/10'}`} />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <p className="text-lg sm:text-xl md:text-5xl text-foreground font-serif font-medium leading-[1.4] sm:leading-[1.3] italic mb-10 md:mb-16 tracking-tight">
                &ldquo;{currentTestimonial.content}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-serif font-bold text-xl md:text-3xl border border-primary/10 shadow-inner">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg md:text-2xl font-serif font-bold text-foreground tracking-tight italic">
                  {currentTestimonial.name}
                </h4>
                <p className="text-[8px] md:text-[10px] font-bold text-primary/60 uppercase tracking-[0.3em]">
                  {currentTestimonial.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16 animate-fade-in [animation-delay:400ms]">
            {/* Dots */}
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx)
                    setAutoPlay(false)
                  }}
                  className={`h-1.5 transition-[width,background-color] duration-500 rounded-full ${
                    idx === activeIndex ? 'bg-primary w-12' : 'bg-border/60 w-3 hover:bg-primary/40'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Side Navigation */}
            <div className="flex gap-4">
              <button
                onClick={goToPrevious}
                className="w-14 h-14 rounded-2xl border border-border/60 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 active:scale-90"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="w-14 h-14 rounded-2xl border border-border/60 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 active:scale-90"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

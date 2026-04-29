'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { ROOM_CATEGORIES } from '@/lib/constants'

interface FilterState {
  type: string[]
  priceRange: [number, number]
  guests: number
}

interface RoomFilterProps {
  onFilterChange: (filters: FilterState) => void
}

export default function RoomFilter({ onFilterChange }: RoomFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: [],
    priceRange: [1000, 6000],
    guests: 0
  })
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleType = (type: string) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type]
    
    const newFilters = { ...filters, type: newTypes }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (range: [number, number]) => {
    const newFilters = { ...filters, priceRange: range }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleGuestChange = (guests: number) => {
    const newFilters = { ...filters, guests }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters: FilterState = { type: [], priceRange: [1000, 6000], guests: 0 }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  return (
    <div className="bg-card border border-border/50 rounded-[2rem] p-8 md:p-10 sticky top-32 h-fit shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 text-foreground transition-colors hover:bg-muted"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div className={`${isExpanded ? 'block' : 'hidden lg:block'} space-y-10 md:space-y-12`}>
          {/* Room Type Filter */}
          <div className="animate-fade-in [animation-delay:100ms]">
            <h4 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-6">Room Type</h4>
            <div className="space-y-4">
              {ROOM_CATEGORIES.filter(cat => cat !== 'All').map((type) => (
                <label key={type} className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={() => toggleType(type)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-border/60 transition-all checked:bg-primary checked:border-primary hover:border-primary/50"
                    />
                    <svg
                      className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground/60 group-hover:text-primary transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="animate-fade-in [animation-delay:200ms]">
            <h4 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-6">Price Ceiling (INR)</h4>
            <div className="space-y-6">
              <input
                type="range"
                min="1000"
                max="6000"
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange([filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between items-center text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                <span className="px-2 py-1 bg-muted/50 rounded-md">Min: ₹{filters.priceRange[0]}</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">Max: ₹{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Guests Filter */}
          <div className="animate-fade-in [animation-delay:300ms]">
            <h4 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] mb-6">Guests Count</h4>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => handleGuestChange(filters.guests === num ? 0 : num)}
                  className={`h-12 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${
                    filters.guests === num
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                      : 'bg-muted/50 text-foreground/40 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="w-full h-14 rounded-xl border border-border/60 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all animate-fade-in [animation-delay:400ms]"
          >
            Clear All Selections
          </button>
      </div>
    </div>
  )
}

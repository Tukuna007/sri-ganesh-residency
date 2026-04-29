'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CurrencySelector from './currency-selector'
import { cn } from '@/lib/utils'
import { HOTEL_INFO } from '@/lib/constants'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"

interface MobileMenuProps {
  navLinks: { label: string; href: string }[]
  dictionary: any
}

export default function MobileMenu({ navLinks = [], dictionary }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const safeNavLinks = navLinks.length > 0 ? navLinks : [
    { label: 'Home', href: '/' },
    { label: 'Rooms', href: '/rooms' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-[#2a2419] text-white shadow-lg shadow-black/20 hover:scale-105 transition-all active:scale-95 z-[60]"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#1a1512] border-none text-[#f5f1ed] p-0 flex flex-col h-full"
      >
        <SheetHeader className="p-8 md:p-10 border-b border-white/5">
          <SheetTitle className="text-left">
            <Link href="/" className="flex flex-col sm:flex-row sm:items-center gap-4 group" onClick={() => setIsOpen(false)}>
              <div className="relative h-[50px] w-[150px]">
                <Image
                  src="/logo.png"
                  alt={HOTEL_INFO.name}
                  fill
                  className="object-contain object-left transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-serif font-black text-white tracking-tighter leading-none mb-1 uppercase italic">{HOTEL_INFO.name}</span>
                <span className="text-[9px] font-black text-primary tracking-[0.4em] uppercase opacity-90 leading-none">{HOTEL_INFO.tagline}</span>
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto px-6 py-10 space-y-12">
          {/* Main Navigation */}
          <nav className="space-y-2">
            <p className="px-4 text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-6">Navigation</p>
            {safeNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center px-6 min-h-[64px] rounded-2xl text-xl font-serif transition-all duration-300",
                    isActive
                      ? "bg-white/10 text-primary font-bold italic shadow-inner"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </Link>
              )
            })}
          </nav>

          {/* Secondary Information */}
          <div className="space-y-6">
            <p className="px-4 text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-6">Our Residences</p>
            <div className="grid grid-cols-1 gap-2">
              {['Deluxe Suite', 'Double Deluxe', 'Family Sanctuary'].map((room) => (
                <div key={room} className="px-10 py-4 text-sm text-white/40 font-light hover:text-white transition-colors cursor-default">
                  {room}
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="p-8 bg-black/20 border-t border-white/5 block mt-auto">
          <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Region & Currency</span>
              <CurrencySelector />
            </div>
            <Button asChild className="luxury-button bg-primary hover:bg-white hover:text-black text-white w-full h-16 text-[10px] tracking-[0.3em] font-bold border-none shadow-2xl shadow-primary/20">
              <Link href="/booking" onClick={() => setIsOpen(false)}>
                {dictionary?.common?.book_now || 'Reserve Your Stay'}
              </Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

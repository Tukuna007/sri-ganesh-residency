import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import CurrencySelector from './currency-selector'
import MobileMenu from './mobile-menu'
import { HOTEL_INFO } from '@/lib/constants'

interface NavbarProps {
  dictionary: any
}

export default function Navbar({ dictionary }: NavbarProps) {
  const navLinks = [
    { label: dictionary.common.home, href: '/' },
    { label: dictionary.common.rooms, href: '/rooms' },
    { label: dictionary.common.about, href: '/about' },
    { label: dictionary.common.gallery, href: '/gallery' },
    { label: dictionary.common.contact, href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="relative h-[45px] md:h-[60px] w-[120px] sm:w-[140px] md:w-[180px]">
              <Image
                src="/logo.png"
                alt={HOTEL_INFO.name}
                fill
                className="object-contain object-left transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-serif font-black text-xl sm:text-2xl tracking-tighter text-foreground leading-[0.9] mb-1 uppercase italic drop-shadow-sm">{HOTEL_INFO.name}</span>
              <span className="text-[9px] sm:text-[10px] font-black text-primary tracking-[0.4em] uppercase opacity-90 leading-none">{HOTEL_INFO.tagline}</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-primary transition-colors duration-300 font-medium text-xs uppercase tracking-[0.2em] relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-[width] duration-300 rounded-full opacity-50"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden md:block">
              <CurrencySelector />
            </div>

            <Button asChild className="hidden sm:inline-flex luxury-button bg-primary hover:bg-primary/90 text-white px-8 py-4 h-auto text-[10px] rounded-full">
              <Link href="/checkout">{dictionary.common.book_now}</Link>
            </Button>

            {/* Mobile Menu (Client Component) */}
            <MobileMenu navLinks={navLinks} dictionary={dictionary} />
          </div>
        </div>
      </div>
    </nav>
  )
}


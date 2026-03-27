import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'
import { HOTEL_INFO } from '@/lib/constants'

interface FooterProps {
  dictionary: any
}

export default function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="relative bg-foreground text-background border-t border-white/5 mt-auto overflow-hidden">
      {/* Optimized decorative background element */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none gpu-accel" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex flex-col gap-4 group">
              <div className="relative h-[70px] w-auto inline-flex items-center">
                <Image
                  src="/footer logo.png"
                  alt={HOTEL_INFO.name}
                  width={180}
                  height={70}
                  className="h-[70px] w-auto object-contain object-left"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-black tracking-tighter uppercase italic text-white leading-tight drop-shadow-sm">{HOTEL_INFO.name}</span>
                <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase opacity-90 leading-none mt-1">{HOTEL_INFO.tagline}</span>
              </div>
            </Link>
            <p className="text-sm text-background/80 font-light leading-relaxed max-w-xs">{HOTEL_INFO.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-8 uppercase tracking-widest text-primary italic">Explore</h4>
            <ul className="space-y-4">
              {['Rooms', 'About', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-background/80 hover:text-primary transition-[color,transform] duration-300 hover:translate-x-1 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-8 uppercase tracking-widest text-primary italic font-serif">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-background/70 uppercase tracking-widest mb-1">Our Location</p>
                  <a href={HOTEL_INFO.location} target="_blank" rel="noopener noreferrer" className="text-sm text-background/80 hover:text-primary transition-colors">Tirupati, Andhra Pradesh</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-background/70 uppercase tracking-widest mb-1">Call Us</p>
                  <a href={`tel:${HOTEL_INFO.phone}`} className="text-sm text-background/80 hover:text-primary transition-colors">{HOTEL_INFO.phone}</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Empty Slot to maintain structure */}
          <div></div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs text-background/70 font-medium tracking-widest uppercase">&copy; {new Date().getFullYear()} {HOTEL_INFO.name}. Crafted with precision.</p>
          <div className="flex gap-10">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <Link key={item} href="#" className="text-[10px] text-background/60 hover:text-primary transition-colors uppercase font-bold tracking-widest">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

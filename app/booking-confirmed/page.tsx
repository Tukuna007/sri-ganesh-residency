import LayoutWrapper from '../layout-wrapper'
import { constructMetadata } from '@/lib/seo/metadata'
import { CheckCircle2, ArrowRight, Calendar, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = constructMetadata({
  title: 'Booking Confirmed | Sri Ganesh Residency',
  noIndex: true,
})

export default function BookingConfirmedPage() {
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background flex items-center justify-center py-32 px-4">
        <div className="max-w-3xl w-full text-center space-y-12 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/40 relative z-10 animate-bounce">
              <CheckCircle2 className="w-16 h-16 text-white stroke-[2.5]" />
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse -z-10" />
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
              Booking <br /><span className="text-primary italic">Refined & Confirmed</span>
            </h1>
            <div className="h-px w-24 bg-primary/20 mx-auto" />
            <p className="text-xl text-foreground/50 max-w-xl mx-auto font-light leading-relaxed">
              Thank you for choosing Sri Ganesh Residency. Your reservation is now secured. We look forward to welcoming you with our signature hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-8 bg-card border border-border/50 rounded-3xl flex items-start gap-5">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Stay Details</p>
                <p className="text-sm font-medium text-foreground/80 leading-relaxed">Check your email for the full itinerary and check-in instructions.</p>
              </div>
            </div>
            <div className="p-8 bg-card border border-border/50 rounded-3xl flex items-start gap-5">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">Confirmation Sent</p>
                <p className="text-sm font-medium text-foreground/80 leading-relaxed">A digital receipt has been dispatched to your registered email address.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild className="luxury-button bg-primary text-white hover:bg-black px-12 h-18 text-xs font-bold uppercase tracking-[0.4em] rounded-[1.5rem] w-full sm:w-auto shadow-2xl shadow-primary/20">
              <Link href="/">Return to Lobby</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 px-12 h-18 text-xs font-bold uppercase tracking-[0.4em] rounded-[1.5rem] w-full sm:w-auto">
              <Link href="/rooms" className="flex items-center gap-2">
                Explore More Rooms <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </LayoutWrapper>
  )
}

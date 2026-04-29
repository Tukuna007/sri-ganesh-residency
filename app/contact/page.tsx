import LayoutWrapper from '../layout-wrapper'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, MessageSquare, ExternalLink } from 'lucide-react'
import { HOTEL_INFO } from '@/lib/constants'
import { constructMetadata } from '@/lib/seo/metadata'
import Breadcrumbs from '@/components/breadcrumb'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import ContactForm from '@/components/contact-form'

export const metadata = constructMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Sri Ganesh Residency. Reach out for booking inquiries, travel assistance, or general information about our accommodations.',
})

export default async function ContactPage() {
  const dictionary = await getDictionary('en')
  
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background text-foreground">
        {/* Hero Section with Professional Background */}
        <div className="relative h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-105 gpu-accel transition-transform duration-[3000ms] hover:scale-100 ease-out">
            <Image
              src="/images/contact-luxury-hero.png"
              alt="Contact Sri Ganesh Residency"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center text-white pt-16 md:pt-10">
            <div className="mb-6 animate-fade-in gpu-accel">
              <Breadcrumbs items={[{ label: dictionary.common.contact }]} />
            </div>
            <div className="inline-block py-1.5 px-5 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full mb-6 animate-fade-in [animation-delay:200ms] gpu-accel">
              <span className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">Concierge Services</span>
            </div>
            <h1 className="text-4xl md:text-8xl font-serif font-bold mb-6 leading-tight md:leading-none animate-fade-in [animation-delay:400ms] gpu-accel italic">
              Connect With Us
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed animate-fade-in [animation-delay:600ms] gpu-accel px-4">
              Our dedicated team is ready to assist you with reservations, travel inquiries, and personalized guest services.
            </p>
          </div>
        </div>

        {/* Quick Connectivity Bridge */}
        <section className="bg-muted/20 border-b border-border/40 py-12 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-[0.03]" />
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/20 rounded-[2rem] overflow-hidden border border-border/40">
              {[
                { icon: Phone, label: 'Voice & WhatsApp', value: HOTEL_INFO.phone, sub: 'Immediate Response' },
                { icon: Mail, label: 'Inquiry Support', value: HOTEL_INFO.email, sub: '24 Hour Turnaround' },
                { icon: MapPin, label: 'Official Visit', value: 'Tirupati, AP', sub: 'Near Main Bus Stand' },
                { icon: Clock, label: 'Standard Hours', value: 'Open 24/7', sub: 'Reception Always Open' }
              ].map((item, idx) => (
                <div key={idx} className="bg-background p-8 md:p-10 flex flex-col items-center text-center group transition-[background-color] duration-500 hover:bg-muted/10 animate-fade-in [animation-delay:calc(idx*100ms+800ms)] gpu-accel">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-5 md:mb-6 group-hover:bg-primary group-hover:text-white transition-[background-color,color,transform] duration-500 group-hover:scale-110 gpu-accel">
                    <item.icon className="w-6 h-6 md:w-7 md:h-7 stroke-[1.5]" />
                  </div>
                  <h3 className="text-[9px] md:text-[10px] font-bold text-foreground/70 uppercase tracking-[0.3em] mb-2 md:mb-3">{item.label}</h3>
                  <p className="text-base md:text-lg font-serif font-bold text-foreground mb-1 leading-tight">{item.value}</p>
                  <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-2">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Administrative Section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
            {/* Elegant Inquiry Column */}
            <div className="lg:col-span-7 animate-fade-in [animation-delay:1200ms] gpu-accel">
              <div className="mb-12 md:mb-16">
                <div className="inline-block py-1.5 px-4 bg-primary/5 border border-primary/20 rounded-full mb-6">
                  <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">Formal Inquiry</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-serif font-bold text-foreground mb-6 md:mb-8 leading-tight italic">
                  Draft Your <span className="text-primary">Inquiry</span>
                </h2>
                <p className="text-base md:text-lg text-foreground/50 leading-relaxed max-w-xl font-light">
                  Complete the formal request below. Our concierge administration will process your inquiry with high priority.
                </p>
              </div>
              
              <ContactForm />
            </div>

            {/* Geographical & Administrative Column */}
            <div className="lg:col-span-5 animate-fade-in [animation-delay:1500ms] gpu-accel">
              <div className="bg-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-border/40 shadow-sm flex flex-col h-full sticky top-32">
                <div className="mb-8 md:mb-12">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3 md:mb-4">Location & Logistics</h3>
                  <div className="h-0.5 w-12 bg-primary/30 rounded-full" />
                </div>

                <div className="space-y-8 md:space-y-10 mb-10 md:mb-12 flex-grow">
                  <div className="flex gap-5 md:gap-6 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-muted/50 rounded-2xl flex items-center justify-center text-primary shrink-0 transition-transform duration-500 group-hover:scale-110 gpu-accel">
                      <MapPin className="w-6 h-6 md:w-7 md:h-7 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="text-[9px] font-bold text-foreground/70 uppercase tracking-[0.3em] mb-2">Administrative Headquarters</h4>
                      <p className="text-base md:text-lg font-serif font-bold text-foreground leading-snug">
                        Opp. Tirupati Bus Stand,<br />
                        Tirupati, AP 517501
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5 md:gap-6 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-muted/50 rounded-2xl flex items-center justify-center text-primary shrink-0 transition-transform duration-500 group-hover:scale-110 gpu-accel">
                      <Phone className="w-6 h-6 md:w-7 md:h-7 stroke-[1.5]" />
                    </div>
                    <div>
                      <h4 className="text-[9px] font-bold text-foreground/70 uppercase tracking-[0.3em] mb-2">Primary Line</h4>
                      <p className="text-lg md:text-xl font-serif font-bold text-foreground leading-tight">{HOTEL_INFO.phone}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <MessageSquare className="w-3 h-3 text-primary/60" />
                        <span className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">Active WhatsApp Support</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Section */}
                <div className="relative group rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-border/30 h-60 md:h-64 mb-8 md:mb-10 gpu-accel">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.109761563!2d79.4217!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b123456789%3A0x1234567890abcdef!2sSri%20Ganesh%20Residency!5e0!3m2!1sen!2sin!4v1711435200000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Map Location"
                    className="transition-transform duration-[2000ms] group-hover:scale-110 gpu-accel"
                  ></iframe>
                </div>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <a 
                    href={HOTEL_INFO.location} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 md:px-6 py-4 bg-muted/50 hover:bg-black hover:text-white text-foreground rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] transition-colors duration-300"
                  >
                    Coordinates <ExternalLink className="w-3 h-3" />
                  </a>
                  <a 
                    href={HOTEL_INFO.businessProfile} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 md:px-6 py-4 bg-muted/50 hover:bg-black hover:text-white text-foreground rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] transition-colors duration-300"
                  >
                    Business <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutWrapper>
  )
}
import LayoutWrapper from '../layout-wrapper'
import Image from 'next/image'
import { Heart, Users, MapPin, Smile, Star, Handshake } from 'lucide-react'
import { HOTEL_INFO } from '@/lib/constants'
import { constructMetadata } from '@/lib/seo/metadata'

export const metadata = constructMetadata({
  title: 'About Us',
  description: 'Learn about the mission, values, and hospitality at Sri Ganesh Residency. Your home away from home with comfortable rooms and warm service.',
})


import Breadcrumbs from '@/components/breadcrumb'

export default function AboutPage() {
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background">
        {/* Hero Section with Professional Background */}
        <div className="relative h-[65vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-105 gpu-accel transition-transform duration-[3000ms] hover:scale-100 ease-out">
            <Image
              src="/exterior.jpeg"
              alt="About Sri Ganesh Residency"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Lighter, more premium overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-12">
            <div className="mb-10 animate-fade-in">
              <Breadcrumbs items={[{ label: 'About Us' }]} />
            </div>
            <div className="inline-block py-2 px-6 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full mb-8 animate-fade-in [animation-delay:200ms] transition-transform hover:scale-105 duration-500 gpu-accel">
              <span className="text-[10px] font-bold text-white tracking-[0.4em] uppercase">Our Story</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif font-bold mb-10 leading-[0.9] animate-fade-in [animation-delay:400ms] italic tracking-tighter drop-shadow-2xl">
              About <br /><span className="text-primary">Residency</span>
            </h1>
            <div className="w-24 h-1 bg-primary/40 mx-auto mb-10 rounded-full animate-fade-in [animation-delay:500ms]" />
            <p className="text-xl text-white max-w-3xl mx-auto font-light leading-relaxed animate-fade-in [animation-delay:600ms] gpu-accel drop-shadow-md">
              Your home away from home with comfortable rooms and warm hospitality at {HOTEL_INFO.name}.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          {/* Mission Section */}
          <section className="mb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="animate-fade-in [animation-delay:800ms]">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-10 leading-tight">
                  Crafting <span className="text-primary italic">Memorable</span> <br />Stays Since Day One
                </h2>
                <div className="space-y-8">
                  <p className="text-xl text-foreground/80 leading-relaxed font-light">
                    At {HOTEL_INFO.name}, we are committed to providing comfortable, clean, and welcoming accommodations for every guest. Our mission is to make your stay memorable by offering excellent service with a personal touch.
                  </p>
                  <p className="text-xl text-foreground/80 leading-relaxed font-light">
                    We believe in creating a home-like atmosphere where guests feel valued and cared for. From our well-appointed rooms to our attentive staff, every aspect of your stay is designed with your comfort in mind.
                  </p>
                </div>
              </div>
              <div className="relative animate-fade-in [animation-delay:1000ms] h-full">
                <div className="aspect-square rounded-[4rem] relative overflow-hidden group shadow-2xl border border-border/20">
                  <Image 
                    src="/images/about-mission.png" 
                    alt="Premium Hotel Experience" 
                    fill 
                    className="object-cover transition-transform duration-[5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
                  <div className="text-center relative z-10 p-12 h-full flex flex-col items-center justify-center transform group-hover:translate-y-[-10px] transition-transform duration-700">
                    <Heart className="w-20 h-20 text-white mb-6 mx-auto stroke-[1.5] drop-shadow-lg" />
                    <p className="text-[10px] font-bold text-white uppercase tracking-[0.4em] drop-shadow-md">Hospitality at its heart</p>
                  </div>
                  <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-40">
            <div className="text-center mb-24 animate-fade-in">
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-8 text-center">
                Our Core Values
                </h2>
                <div className="w-24 h-1 bg-primary/20 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <Star className="w-10 h-10" />, title: "Excellence", content: "We pursue excellence in every aspect of our service, maintaining high standards of cleanliness, comfort, and hospitality." },
                { icon: <Handshake className="w-10 h-10" />, title: "Integrity", content: "Honesty and transparency guide every decision we make. Our guests can trust us to provide fair pricing and reliable service." },
                { icon: <Heart className="w-10 h-10" />, title: "Care", content: "We treat every guest like family, listening to their needs and anticipating their desires. Genuine hospitality is our strength." }
              ].map((value, i) => (
                <div key={i} className="group bg-card border border-border/50 rounded-[3rem] p-12 transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${1200 + i * 200}ms` }}>
                  <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-700">
                    {value.icon}
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-6">{value.title}</h3>
                  <p className="text-lg text-foreground/70 leading-relaxed font-light">
                    {value.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="p-16 md:p-24 rounded-[4rem] bg-muted/50 border border-border/50 relative overflow-hidden animate-fade-in [animation-delay:1800ms]">
            <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-5" />
            <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-20 text-center">
                The {HOTEL_INFO.name} <span className="text-primary italic">Advantage</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {[
                        { icon: <Users className="w-8 h-8" />, title: "Diverse Room Options", content: "Choose from our four room types: Deluxe Rooms, Double Deluxe Rooms, and spacious family rooms for 10 and 16 guests." },
                        { icon: <Smile className="w-8 h-8" />, title: "Warm Hospitality", content: "Our dedicated staff treats every guest with genuine care and attention, ensuring a personal touch throughout your stay." },
                        { icon: <MapPin className="w-8 h-8" />, title: "Convenient Location", content: "Perfectly situated to explore the area while providing a peaceful retreat for relaxation and family gatherings." },
                        { icon: <Heart className="w-8 h-8" />, title: "Quality & Comfort", content: "Clean rooms, comfortable bedding, modern amenities, and 24/7 customer support ensure a pleasant stay." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white border border-border/50 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{item.title}</h3>
                                <p className="text-lg text-foreground/70 font-light leading-relaxed">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>
        </div>
      </main>
    </LayoutWrapper>
  )
}

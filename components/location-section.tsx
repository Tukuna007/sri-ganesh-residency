import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react'
import { HOTEL_INFO } from '@/lib/constants'

export default function LocationSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Contact & Info */}
          <div className="animate-fade-in group">
            <div className="inline-block py-2 px-6 bg-primary/5 border border-primary/20 rounded-full mb-10 transition-transform group-hover:scale-105 duration-500 gpu-accel">
              <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">Prime Location</span>
            </div>
            <h2 className="text-4xl md:text-8xl font-serif font-bold text-foreground mb-12 italic leading-tight">
              Visit Our <br /><span className="text-primary">Sanctuary</span>
            </h2>
            <div className="w-24 h-1 bg-primary/30 mb-16 rounded-full" />
            
            <div className="grid gap-10 sm:grid-cols-2">
              {[
                { 
                  icon: <MapPin className="w-6 h-6" />, 
                  title: "Location", 
                  content: "Tirupati, Andhra Pradesh",
                  link: HOTEL_INFO.location,
                  linkLabel: "View on Maps"
                },
                { 
                  icon: <Phone className="w-6 h-6" />, 
                  title: "Contact", 
                  content: HOTEL_INFO.phone,
                  link: `tel:${HOTEL_INFO.phone}`,
                  linkLabel: "Call Us"
                },
                { 
                  icon: <Mail className="w-6 h-6" />, 
                  title: "Inquiries", 
                  content: HOTEL_INFO.email,
                  link: `mailto:${HOTEL_INFO.email}`,
                  linkLabel: "Send Email"
                },
                { 
                  icon: <Clock className="w-6 h-6" />, 
                  title: "Always Open", 
                  content: "24/7 Concierge",
                  link: null,
                  linkLabel: "Round-the-clock service"
                }
              ].map((item, i) => (
                <div key={i} className="group p-10 premium-card luxury-shadow hover:luxury-shadow-hover transition-all duration-700 gpu-accel hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center text-primary mb-8 transition-all duration-700 group-hover:bg-primary group-hover:text-white gpu-accel border border-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] mb-3">{item.title}</h3>
                  <p className="text-xl font-serif font-bold text-foreground mb-6 leading-tight italic">{item.content}</p>
                  {item.link ? (
                    <a href={item.link} target={item.link.startsWith('http') ? "_blank" : undefined} rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined} className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] hover:text-black transition-colors duration-300">
                      {item.linkLabel}
                    </a>
                  ) : (
                    <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.4em]">{item.linkLabel}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:h-[750px] premium-card luxury-shadow hover:luxury-shadow-hover relative animate-fade-in [animation-delay:400ms] group transition-all duration-700 hover:-translate-y-2 gpu-accel border-none">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.109761563!2d79.4217!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b123456789%3A0x1234567890abcdef!2sSri%20Ganesh%20Residency!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-transform duration-[3000ms] ease-out"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    </section>
  )
}

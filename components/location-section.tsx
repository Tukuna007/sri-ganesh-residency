import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { HOTEL_INFO } from '@/lib/constants'

export default function LocationSection() {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Full Width Map Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mb-12 md:mb-20">
        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5 border border-border/50 relative group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.2882512133934!2d79.4192131!3d13.6288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b0036666667%3A0x6d859d9d9d9d9d9d!2sSri%20Ganesh%20Residency!5e0!3m2!1sen!2sin!4v1714320000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="transition-transform duration-[3000ms] ease-out group-hover:scale-105"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[2.5rem] md:rounded-[3rem]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 text-center mb-12 md:mb-16">
        <div className="inline-block py-2 px-6 bg-primary/5 border border-primary/20 rounded-full mb-6">
          <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">Connect With Us</span>
        </div>
        <h2 className="text-3xl md:text-6xl font-serif font-bold text-foreground mb-4 italic">
          Visit Us <span className="text-primary">Today</span>
        </h2>
        <div className="w-24 h-1 bg-primary/30 mx-auto rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { 
              icon: <MapPin className="w-6 h-6" />, 
              title: "Location", 
              content: "Renigunta Rd, Tirupati",
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
            <div key={i} className="group p-8 bg-card border border-border/40 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-primary mb-6 transition-all duration-700 group-hover:bg-primary group-hover:text-white border border-primary/10">
                {item.icon}
              </div>
              <h3 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] mb-2">{item.title}</h3>
              <p className="text-lg font-serif font-bold text-foreground mb-4 leading-tight italic">{item.content}</p>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] hover:text-black transition-colors duration-300">
                  {item.linkLabel}
                </a>
              ) : (
                <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.4em]">{item.linkLabel}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

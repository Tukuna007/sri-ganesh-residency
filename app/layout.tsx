import type { Metadata } from 'next'
import './globals.css'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { constructMetadata } from '@/lib/seo/metadata'

const _geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });
const _playfairDisplay = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-serif',
  weight: ['400', '500', '600', '700']
});

export const metadata = constructMetadata()

import { HOTEL_INFO } from '@/lib/constants'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    'name': HOTEL_INFO.name,
    'description': HOTEL_INFO.tagline,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Tirupati',
      'addressRegion': 'Andhra Pradesh',
      'addressCountry': 'IN'
    },
    'telephone': HOTEL_INFO.phone,
    'url': 'https://shriganeshresidency.com',
    'image': 'https://shriganeshresidency.com/hero-image.jpg',
    'starRating': {
      '@type': 'Rating',
      'ratingValue': '4'
    }
  }

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${_geist.variable} ${_geistMono.variable} ${_playfairDisplay.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <script src="https://checkout.razorpay.com/v1/checkout.js" defer />
      </body>
    </html>
  )
}

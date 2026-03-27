import LayoutWrapper from '../layout-wrapper'
import { constructMetadata } from '@/lib/seo/metadata'
import BookingContent from '@/components/booking-content'

export const metadata = constructMetadata({
  title: 'Book Your Stay',
  description: 'Complete your booking at Sri Ganesh Residency. Experience luxury and comfort in just a few steps.',
  noIndex: true, // Usually booking pages should not be indexed if they are transactional
})

import { getDictionary } from '@/lib/i18n/get-dictionary'

import { Suspense } from 'react'

export default async function BookingPage() {
  const dictionary = await getDictionary('en')
  
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background text-foreground">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <BookingContent dictionary={dictionary} />
        </Suspense>
      </main>
    </LayoutWrapper>
  )
}


import LayoutWrapper from '../layout-wrapper'
import { constructMetadata } from '@/lib/seo/metadata'
import CheckoutContent from '@/components/checkout-content'
import { Suspense } from 'react'

export const metadata = constructMetadata({
  title: 'Secure Checkout | Sri Ganesh Residency',
  description: 'Complete your luxury room reservation securely.',
  noIndex: true,
})

export default function CheckoutPage() {
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-background">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-primary uppercase tracking-[0.4em] animate-pulse">Initializing Secure Checkout...</p>
            </div>
          </div>
        }>
          <CheckoutContent />
        </Suspense>
      </main>
    </LayoutWrapper>
  )
}

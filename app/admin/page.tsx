import LayoutWrapper from '../layout-wrapper'
import { constructMetadata } from '@/lib/seo/metadata'

export const metadata = constructMetadata({
  title: 'Admin Dashboard',
  noIndex: true,
})

import AdminContent from '@/components/admin-content'

export default function AdminPage() {
  return (
    <LayoutWrapper>
      <main className="min-h-screen bg-muted/30 pt-20">
        {/* Header */}
        <div className="bg-background border-b border-border/40 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/luxury-pattern.svg')] opacity-5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-block py-2 px-6 bg-primary/5 border border-primary/20 rounded-full mb-6 animate-fade-in">
              <span className="text-xs font-bold text-primary tracking-[0.3em] uppercase">Management Console</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4 animate-fade-in [animation-delay:200ms]">
                Dashboard <span className="text-primary italic">Overview</span>
            </h1>
            <p className="text-lg text-foreground/50 font-light animate-fade-in [animation-delay:400ms]">Real-time analytics and room management for Sri Ganesh Residency.</p>
          </div>
        </div>

        <AdminContent />
      </main>
    </LayoutWrapper>
  )
}

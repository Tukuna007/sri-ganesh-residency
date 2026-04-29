'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Users, Calendar, CreditCard } from 'lucide-react'
import { ROOMS as STATIC_ROOMS } from '@/lib/constants'
import { formatPrice, type Currency, DEFAULT_CURRENCY } from '@/lib/currency'
import Link from 'next/link'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    Razorpay: any;
  }
}


export default function BookingContent({ dictionary, rooms }: { dictionary: any, rooms: any[] }) {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY)
  const [mounted, setMounted] = useState(false)
  const [bookingData, setBookingData] = useState({
    roomId: searchParams.get('roomId') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests') || '1'),
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  })

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('currency') as Currency
    if (saved) {
      setCurrency(saved)
    }

    const handleCurrencyChange = (event: Event) => {
      const customEvent = event as CustomEvent<Currency>
      setCurrency(customEvent.detail)
    }

    window.addEventListener('currencyChanged', handleCurrencyChange)
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange)
  }, [])

  const selectedRoom = rooms.find(r => r.id.toString() === bookingData.roomId)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const validateStep = (stepNum: number): boolean => {
    switch (stepNum) {
      case 1:
        return !!(bookingData.roomId && bookingData.checkIn && bookingData.checkOut && bookingData.guests)
      case 2:
        return !!(bookingData.firstName && bookingData.lastName && bookingData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email) && bookingData.phone)
      case 3:
        return !!(bookingData.cardName && bookingData.cardNumber.length === 16 && bookingData.cardExpiry && bookingData.cardCVC.length === 3)
      default:
        return true
    }
  }

  const handlePayment = async (bookingId: string) => {
    try {
      // 1. Create Razorpay Order
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      })
      const orderData = await orderRes.json()

      if (orderData.error) throw new Error(orderData.error)

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Sri Ganesh Residency',
        description: `Booking for ${selectedRoom?.name}`,
        order_id: orderData.order_id,
        handler: async (response: any) => {
          try {
            // 3. Verify Payment
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                bookingId,
              }),
            })
            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              setStep(4)
              toast.success('Payment successful!')
            } else {
              toast.error('Payment verification failed.')
            }
          } catch (err) {
            console.error('Verification error:', err)
            toast.error('Something went wrong during verification.')
          }
        },
        prefill: {
          name: `${bookingData.firstName} ${bookingData.lastName}`,
          email: bookingData.email,
          contact: bookingData.phone,
        },
        theme: { color: '#B8860B' }, // Primary color
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled by user.')
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error: any) {
      console.error('Payment Error:', error)
      toast.error(error.message || 'Could not initiate payment.')
    }
  }

  const handleCompleteBooking = async () => {
    if (validateStep(3)) {
      try {
        // 1. Create Booking in DB
        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${bookingData.firstName} ${bookingData.lastName}`,
            email: bookingData.email,
            phone: bookingData.phone,
            roomName: selectedRoom?.name,
            roomId: selectedRoom?.id,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            guests: bookingData.guests,
            amount: selectedRoom?.price || 0,
          }),
        })
        const data = await res.json()

        if (data.success) {
          // 2. Trigger Razorpay
          await handlePayment(data.bookingId)
        } else {
          toast.error(data.error || 'Failed to create booking.')
        }
      } catch (err) {
        console.error('Booking error:', err)
        toast.error('Something went wrong.')
      }
    }
  }


  if (!mounted) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      {/* Header */}
      <div className="mb-12 md:mb-24 text-center animate-fade-in px-4">
        <div className="inline-block py-2 px-6 bg-primary/5 border border-primary/20 rounded-full mb-6 md:mb-8">
            <span className="text-[10px] md:text-xs font-bold text-primary tracking-[0.3em] uppercase italic">Reservation</span>
        </div>
        <h1 className="text-4xl md:text-8xl font-serif font-bold text-foreground mb-4 md:mb-6 leading-tight">
          {dictionary.common.booking_title}
        </h1>
        <p className="text-base md:text-xl text-foreground/50 max-w-2xl mx-auto font-light leading-relaxed px-4">
          {dictionary.common.booking_subtitle}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 md:mb-24 animate-fade-in [animation-delay:200ms] px-2">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center group">
            <div
              className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center font-serif font-bold transition-all duration-700 shadow-sm ${
                s <= step
                  ? 'bg-primary text-white scale-110 rotate-3 shadow-primary/20'
                  : 'bg-muted/50 text-foreground/30 border border-border/50'
              }`}
            >
              {s < step ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" /> : <span className="text-sm md:text-lg">0{s}</span>}
            </div>
            {s < 4 && (
              <div
                className={`w-4 md:w-16 h-px mx-2 md:mx-4 transition-all duration-1000 ${s < step ? 'bg-primary' : 'bg-border/30'}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="bg-card border border-border/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 shadow-2xl shadow-black/5 relative overflow-hidden animate-fade-in [animation-delay:400ms]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
        
        <div className="relative z-10">
          {/* Step 1: Room & Dates */}
          {step >= 1 && (
            <div className={`transition-all duration-700 ${step === 1 ? 'opacity-100' : 'opacity-40 pointer-events-none mb-12 pb-12 border-b border-border/30'}`}>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs md:text-sm font-bold">
                  {step > 1 ? '✓' : '01'}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Room & Dates</h2>
              </div>

              {step === 1 ? (
                <div className="space-y-10 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Arriving On</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Departing On</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Traveling Party Size</label>
                    <select
                      name="guests"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                      className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map(n => (
                        <option key={n} value={n}>{n} Member{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-8 text-foreground/60 font-light">
                  <p className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary stroke-[1.5]" />
                    <span className="font-bold underline underline-offset-8 decoration-primary/30">{bookingData.checkIn}</span> 
                    <span className="mx-2 text-foreground/20">/</span>
                    <span className="font-bold underline underline-offset-8 decoration-primary/30">{bookingData.checkOut}</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary stroke-[1.5]" />
                    <span className="font-bold tracking-widest uppercase text-xs">{bookingData.guests} Guest{bookingData.guests > 1 ? 's' : ''}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Guest Information */}
          {step >= 2 && (
            <div className={`transition-all duration-700 ${step === 2 ? 'opacity-100 animate-fade-in' : 'opacity-40 pointer-events-none' + (step > 2 ? ' mb-12 pb-12 border-b border-border/30' : '')}`}>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs md:text-sm font-bold">
                  {step > 2 ? '✓' : '02'}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Guest Information</h2>
              </div>

              {step === 2 ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Given Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={bookingData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium"
                        placeholder="e.g. Ashish"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Surname</label>
                      <input
                        type="text"
                        name="lastName"
                        value={bookingData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium"
                        placeholder="e.g. Singh"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Electronic Mail</label>
                      <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium"
                        placeholder="mail@identity.com"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Contact Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium"
                        placeholder="+91 . . . ."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-8 text-foreground/60 font-light translate-x-2">
                    <p className="font-serif font-bold text-lg text-foreground italic">{bookingData.firstName} {bookingData.lastName}</p>
                    <span className="text-foreground/20">|</span>
                    <p className="text-sm tracking-widest uppercase font-bold text-primary/70">{bookingData.email}</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Payment */}
          {step >= 3 && (
            <div className={`transition-all duration-700 ${step === 3 ? 'opacity-100 animate-fade-in' : 'opacity-40 pointer-events-none'}`}>
              <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs md:text-sm font-bold">
                  {step > 3 ? '✓' : '03'}
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">Secure Payment</h2>
              </div>

              {step === 3 && (
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={bookingData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium placeholder:opacity-20"
                      placeholder="CARDHOLDER NAME"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Card Identification Number</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={bookingData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-bold tracking-[0.4em] placeholder:opacity-20 placeholder:tracking-widest"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                             <div className="w-8 h-5 bg-foreground/10 rounded-sm" />
                             <div className="w-8 h-5 bg-primary/20 rounded-sm" />
                        </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Validity Threshold</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        placeholder="MM / YY"
                        value={bookingData.cardExpiry}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-medium text-center placeholder:opacity-20"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Security Verification</label>
                      <input
                        type="password"
                        name="cardCVC"
                        placeholder="***"
                        value={bookingData.cardCVC}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 rounded-[1.5rem] border border-border/60 bg-muted/30 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all duration-500 outline-none text-foreground font-bold text-center tracking-[0.5em] placeholder:opacity-20"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-primary/40 animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-white stroke-[2.5]" />
              </div>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-foreground mb-6 md:mb-8 leading-tight px-4">
                Booking <br /><span className="text-primary italic">Refined & Confirmed</span>
              </h2>
              <div className="h-px w-24 bg-primary/20 mx-auto mb-12" />
              <p className="text-xl text-foreground/50 max-w-xl mx-auto font-light leading-relaxed mb-16">
                Thank you for choosing Sri Ganesh Residency. A confirmation of your upcoming stay has been dispatched to <span className="text-primary font-bold">{bookingData.email}</span>. We await your arrival with anticipation.
              </p>
              <Button asChild className="luxury-button bg-primary text-white hover:bg-black transition-all duration-700 px-16 h-18 text-xs font-bold uppercase tracking-[0.4em] rounded-[1.5rem]">
                <Link href="/">Return to Grand Lobby</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mt-12 md:mt-16 items-center justify-between animate-fade-in [animation-delay:600ms]">
          <button
            onClick={handlePreviousStep}
            disabled={step === 1}
            className={cn(
              "w-full md:w-auto px-10 md:px-12 h-14 md:h-16 border border-border/50 text-foreground/40 text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl md:rounded-[1.5rem] hover:bg-black hover:text-white hover:border-black transition-all duration-700",
              step === 1 && "opacity-0 pointer-events-none"
            )}
          >
            Previous Stage
          </button>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto">
            {selectedRoom && step < 3 && (
              <div className="text-center md:text-right w-full md:w-auto bg-muted/20 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none">
                <h4 className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] mb-1">Current Selection</h4>
                <p className="text-base md:text-lg font-serif font-bold text-foreground italic flex items-center justify-center md:justify-end gap-2">
                  {selectedRoom.name} <span className="text-primary">•</span> {formatPrice(selectedRoom.price, currency)} <span className="text-[10px] font-bold text-foreground/20 uppercase">/ night</span>
                </p>
              </div>
            )}
            
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="w-full md:w-auto px-12 md:px-16 h-16 md:h-20 bg-primary hover:bg-black text-white rounded-xl md:rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.4em] shadow-2xl shadow-primary/20 hover:shadow-black/20 active:scale-[0.98] transition-all duration-700"
              >
                Proceed to Security
              </button>
            ) : (
              <button
                onClick={handleCompleteBooking}
                className="w-full md:w-auto px-12 md:px-16 h-16 md:h-20 bg-primary hover:bg-black text-white rounded-xl md:rounded-[1.5rem] font-bold text-xs uppercase tracking-[0.4em] shadow-2xl shadow-primary/20 hover:shadow-black/20 active:scale-[0.98] transition-all duration-700 flex items-center justify-center gap-4 md:gap-6"
              >
                <CreditCard className="w-5 h-5 md:w-6 md:h-6 stroke-[1.5]" />
                Authorize Reservation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

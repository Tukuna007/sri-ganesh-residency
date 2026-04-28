'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Calendar, Users, CreditCard, ChevronRight, CheckCircle2, Info, User, Clock, ShieldCheck, ArrowLeft, ArrowRight, Star, ShoppingBag, Sparkles } from 'lucide-react'
import { ROOMS as STATIC_ROOMS } from '@/lib/constants'
import { formatPrice, type Currency, DEFAULT_CURRENCY } from '@/lib/currency'
import { toast } from 'sonner'
import { differenceInDays, parseISO, format } from 'date-fns'
import { cn } from '@/lib/utils'

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [roomLoading, setRoomLoading] = useState(true)
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY)
  const [activeStep, setActiveStep] = useState(1) 

  const roomId = searchParams.get('roomId')
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '')
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '')
  const [guests, setGuests] = useState(parseInt(searchParams.get('guests') || '1'))
  const [checkInTime, setCheckInTime] = useState('11:00 AM')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [isPromoApplied, setIsPromoApplied] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  // Partial Payment Config
  const DEPOSIT_AMOUNT = 500

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('currency') as Currency
    if (saved) setCurrency(saved)
    
    if (roomId) {
      fetchRoomDetails(roomId)
    } else {
      setRoomLoading(false)
    }
  }, [roomId])

  const fetchRoomDetails = async (id: string) => {
    try {
      const res = await fetch('/api/rooms')
      const rooms = await res.json()
      const room = rooms.find((r: any) => r.id?.toString() === id)
      if (room) {
        setSelectedRoom(room)
      } else {
        const staticRoom = STATIC_ROOMS.find(r => r.id?.toString() === id)
        if (staticRoom) setSelectedRoom(staticRoom)
      }
    } catch (err) {
      console.error('Failed to fetch room details', err)
      const staticRoom = STATIC_ROOMS.find(r => r.id?.toString() === id)
      if (staticRoom) setSelectedRoom(staticRoom)
    } finally {
      setRoomLoading(false)
    }
  }

  useEffect(() => {
    if (mounted && !roomLoading && !selectedRoom && activeStep !== 4) {
      toast.error('Please select a room to proceed with booking.')
      router.push('/rooms')
    }
  }, [mounted, roomLoading, selectedRoom, router, activeStep])

  const nights = (checkIn && checkOut) 
    ? Math.max(1, differenceInDays(parseISO(checkOut), parseISO(checkIn)))
    : 1
  
  const subtotal = (selectedRoom?.price || 0) * nights
  const tax = Math.round(subtotal * 0.12)
  const initialTotal = subtotal + tax
  const finalStayTotal = Math.max(1, initialTotal - discount)

  const handleApplyPromo = async () => {
    const code = promoCode.toUpperCase().trim()
    if (code === 'TEST1') {
      setDiscount(initialTotal - 1)
      setIsPromoApplied(true)
      toast.success('Test mode active: Total is now ₹1')
      return
    }

    try {
      const res = await fetch(`/api/promos/validate?code=${code}`)
      const data = await res.json()
      if (data.valid) {
        let disc = data.type === 'percentage' ? Math.round(initialTotal * (data.value / 100)) : data.value
        setDiscount(disc)
        setIsPromoApplied(true)
        toast.success(`Promo applied!`)
      } else {
        toast.error(data.error || 'Invalid promo code')
      }
    } catch (err) {
      toast.error('Failed to validate promo code')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePayment = async (bookingId: string) => {
    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      })
      const orderData = await orderRes.json()

      if (orderData.error) throw new Error(orderData.error)

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Sri Ganesh Residency',
        description: `Booking Deposit for ${selectedRoom?.name}`,
        order_id: orderData.order_id,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...response, bookingId }),
            })
            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              setBookingDetails({
                ...formData,
                roomName: selectedRoom.name,
                checkIn,
                checkOut,
                checkInTime,
                guests,
                amount: DEPOSIT_AMOUNT,
                totalStay: finalStayTotal,
                paymentId: response.razorpay_payment_id,
                date: new Date().toLocaleString()
              })
              setActiveStep(4)
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
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: '#4A1D1D' },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error: any) {
      console.error('Payment Error:', error)
      toast.error(error.message || 'Could not initiate payment.')
    } finally {
      setLoading(false)
    }
  }

  const handleProceedToPayment = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          roomName: selectedRoom?.name,
          roomId: selectedRoom?.id,
          checkIn,
          checkOut,
          checkInTime,
          guests,
          amount: DEPOSIT_AMOUNT, // Only pay deposit now
          totalAmount: finalStayTotal, // Store full amount for record
        }),
      })
      const data = await res.json()
      if (data.success) {
        await handlePayment(data.bookingId)
      } else {
        toast.error(data.error || 'Failed to create booking.')
        setLoading(false)
      }
    } catch (err) {
      console.error('Booking error:', err)
      toast.error('Something went wrong.')
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (activeStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error('Please fill all guest details.')
        return
      }
    }
    if (activeStep === 2) {
      if (!checkIn || !checkOut) {
        toast.error('Please select stay dates.')
        return
      }
    }
    setActiveStep(activeStep + 1)
  }

  const prevStep = () => setActiveStep(activeStep - 1)

  if (!mounted || roomLoading || (!selectedRoom && activeStep !== 4)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] animate-pulse">Initializing Secure Checkout...</p>
        </div>
      </div>
    )
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-16 gap-4 md:gap-10 overflow-x-auto pb-4">
      {[
        { step: 1, icon: <User className="w-5 h-5" />, label: 'Guest Details' },
        { step: 2, icon: <Calendar className="w-5 h-5" />, label: 'Stay Info' },
        { step: 3, icon: <CreditCard className="w-5 h-5" />, label: 'Payment' },
        { step: 4, icon: <CheckCircle2 className="w-5 h-5" />, label: 'Confirmed' },
      ].map((s) => (
        <div key={s.step} className="flex items-center gap-3 shrink-0">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
            activeStep === s.step ? "bg-[#4A1D1D] text-white shadow-xl shadow-[#4A1D1D]/30" : 
            activeStep > s.step ? "bg-green-500 text-white" : "bg-muted text-foreground/40"
          )}>
            {activeStep > s.step ? <CheckCircle2 className="w-6 h-6" /> : s.icon}
          </div>
          <div className="hidden md:block">
            <p className={cn("text-[10px] font-bold uppercase tracking-widest", activeStep >= s.step ? "text-foreground" : "text-foreground/40")}>{s.label}</p>
          </div>
          {s.step < 4 && <div className={cn("w-8 md:w-16 h-px bg-border", activeStep > s.step && "bg-green-500")} />}
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4 italic">
          {activeStep === 4 ? 'Booking Successful!' : 'Secure Your Reservation'}
        </h1>
        <p className="text-foreground/50 font-light max-w-2xl mx-auto italic">
          {activeStep === 4 ? 'Thank you for choosing Sri Ganesh Residency. Your sanctuary awaits.' : 'Experience the hospitality of Tirupati in just a few steps.'}
        </p>
      </div>

      <StepIndicator />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className={cn("space-y-12", activeStep === 4 ? "lg:col-span-12" : "lg:col-span-8")}>
          
          {/* Step 1: Guest Information */}
          {activeStep === 1 && (
            <div className="bg-card border border-border/50 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-black/5 animate-fade-in">
              <h3 className="text-3xl font-serif font-bold text-foreground mb-12 flex items-center gap-5">
                <div className="w-1.5 h-10 bg-primary/30 rounded-full" />
                Who's Staying With Us?
              </h3>
              
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] ml-2">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-lg" placeholder="Rahul" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] ml-2">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-lg" placeholder="Sharma" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] ml-2">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-lg" placeholder="rahul@example.com" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] ml-2">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-lg" placeholder="+91 99887 76655" />
                  </div>
                </div>
                <Button onClick={nextStep} className="w-full h-20 bg-[#4A1D1D] text-white rounded-2xl font-bold uppercase tracking-[0.4em] shadow-xl shadow-black/20 flex items-center justify-center gap-4 group">
                  Next Step: Stay Details <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Stay Configuration */}
          {activeStep === 2 && (
            <div className="bg-card border border-border/50 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-black/5 animate-fade-in">
              <h3 className="text-3xl font-serif font-bold text-foreground mb-12 flex items-center gap-5">
                <div className="w-1.5 h-10 bg-primary/30 rounded-full" />
                Stay Details
              </h3>
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3"><label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Check-In</label><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-lg" /></div>
                  <div className="space-y-3"><label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Check-Out</label><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-lg" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3"><label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Arrival Time</label><select value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-lg appearance-none">{['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'].map(t => (<option key={t} value={t}>{t}</option>))}</select></div>
                  <div className="space-y-3"><label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.3em] ml-2 flex items-center gap-2"><Users className="w-3.5 h-3.5" /> Guests</label><input type="number" min={1} max={selectedRoom.capacity} value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-lg" /></div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button onClick={prevStep} variant="outline" className="h-20 flex-1 rounded-2xl border-primary/20 text-primary font-bold uppercase tracking-widest gap-3"><ArrowLeft className="w-5 h-5" /> Back</Button>
                  <Button onClick={nextStep} className="h-20 flex-[2] bg-[#4A1D1D] text-white rounded-2xl font-bold uppercase tracking-[0.4em] shadow-xl shadow-black/20 flex items-center justify-center gap-4 group">Review & Pay <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" /></Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment & Review */}
          {activeStep === 3 && (
            <div className="bg-card border border-border/50 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-black/5 animate-fade-in space-y-12">
              <h3 className="text-3xl font-serif font-bold text-foreground flex items-center gap-5">
                <div className="w-1.5 h-10 bg-primary/30 rounded-full" />
                Secure Payment
              </h3>

              {/* PARTIAL PAYMENT NOTICE - AS REQUESTED */}
              <div className="p-10 bg-[#F5EFE6] border border-[#E8DFC9] rounded-[2.5rem] space-y-6">
                <div className="flex items-center gap-3 text-[#B8860B]">
                  <Sparkles className="w-6 h-6 fill-[#B8860B]" />
                  <p className="text-xl font-serif font-bold italic tracking-wide">
                    Pay only ₹{DEPOSIT_AMOUNT} now to secure your reservation.
                  </p>
                </div>
                <p className="text-xs font-bold text-[#4A1D1D]/60 uppercase tracking-[0.2em] leading-relaxed">
                  THE REMAINING BALANCE WILL BE SETTLED AT THE HOTEL RECEPTION DURING CHECK-IN.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="p-8 bg-muted/30 rounded-[2rem] border border-border/40 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><User className="w-5 h-5" /></div>
                      <div><p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Guest</p><p className="font-bold text-foreground">{formData.firstName} {formData.lastName}</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><Calendar className="w-5 h-5" /></div>
                      <div><p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Stay</p><p className="font-bold text-foreground">{format(parseISO(checkIn), 'MMM dd')} - {format(parseISO(checkOut), 'MMM dd')}</p></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/20">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Payable Now</p>
                        <p className="text-6xl font-serif font-bold text-primary italic leading-none">₹{DEPOSIT_AMOUNT}</p>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-widest pb-1"><ShieldCheck className="w-4 h-4" /> Secure</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={prevStep} variant="outline" className="h-20 flex-1 rounded-2xl border-primary/20 text-primary font-bold uppercase tracking-widest gap-3"><ArrowLeft className="w-5 h-5" /> Back</Button>
                <Button onClick={handleProceedToPayment} disabled={loading} className="h-20 flex-[2] bg-[#4A1D1D] hover:bg-black text-white rounded-2xl font-bold uppercase tracking-[0.4em] shadow-2xl shadow-black/30 flex items-center justify-center gap-4 transition-all duration-700">
                  {loading ? <span className="animate-pulse italic">Connecting...</span> : <><ShoppingBag className="w-6 h-6" /> Pay ₹{DEPOSIT_AMOUNT} Now</>}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success Message */}
          {activeStep === 4 && bookingDetails && (
            <div className="bg-card border border-border/50 rounded-[3rem] p-10 md:p-20 shadow-2xl shadow-black/5 animate-fade-in text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-10 shadow-xl shadow-green-500/20">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 italic">Stay Confirmed!</h2>
              <p className="text-foreground/50 font-light max-w-xl mx-auto mb-16 italic">Your sanctuary at Sri Ganesh Residency is ready. We look forward to welcoming you.</p>

              <div className="max-w-3xl mx-auto bg-muted/30 rounded-[2.5rem] border border-border/40 p-10 md:p-16 text-left space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-8">Reservation</h4>
                    <div className="space-y-2"><p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Guest</p><p className="text-2xl font-serif font-bold text-foreground">{bookingDetails.firstName} {bookingDetails.lastName}</p></div>
                    <div className="space-y-2"><p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Room</p><p className="text-2xl font-serif font-bold text-foreground italic">{bookingDetails.roomName}</p></div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-8">Stay Info</h4>
                    <div className="space-y-2"><p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Arrival</p><p className="text-xl font-bold text-foreground">{format(parseISO(bookingDetails.checkIn), 'MMM dd')} @ {bookingDetails.checkInTime}</p></div>
                  </div>
                </div>

                <div className="pt-12 border-t border-border/50 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-2"><p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Deposit Paid Now</p><p className="text-3xl font-serif font-bold text-primary">₹{bookingDetails.amount}</p></div>
                    <div className="space-y-2 text-md-right"><p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Balance at Reception</p><p className="text-3xl font-serif font-bold text-foreground italic">₹{bookingDetails.totalStay - bookingDetails.amount}</p></div>
                  </div>
                  <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4 text-primary">
                    <Info className="w-5 h-5" />
                    <p className="text-xs font-bold uppercase tracking-widest">Total Stay Value: ₹{bookingDetails.totalStay}</p>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center">
                <Button onClick={() => window.print()} variant="outline" className="h-16 px-10 rounded-xl border-primary/20 text-primary font-bold uppercase tracking-widest italic">Print Receipt</Button>
                <Button asChild className="h-16 px-10 bg-[#4A1D1D] text-white rounded-xl font-bold uppercase tracking-widest"><Link href="/">Back to Home</Link></Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        {activeStep < 4 && (
          <div className="lg:col-span-4 animate-fade-in [animation-delay:200ms]">
            <div className="bg-card border border-border/50 rounded-[3rem] p-10 shadow-2xl shadow-black/5 sticky top-32">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-border/40">
                <Image src={selectedRoom.image} alt={selectedRoom.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6"><h4 className="text-xl font-serif font-bold text-white italic">{selectedRoom.name}</h4></div>
              </div>
              <div className="space-y-8">
                <h4 className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em] border-b border-border/50 pb-4">Stay Overview</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest"><span>Full Stay Total</span><span>₹{finalStayTotal}</span></div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary"><span>Pay Now (Deposit)</span><span>₹{DEPOSIT_AMOUNT}</span></div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-foreground/30 italic"><span>Pending at Hotel</span><span>₹{finalStayTotal - DEPOSIT_AMOUNT}</span></div>
                </div>
                <div className="pt-8 border-t border-border/50"><div className="p-4 bg-primary/5 rounded-xl border border-primary/10 text-[9px] font-bold text-primary uppercase tracking-[0.1em] text-center italic">Payment for Secure Reservation Only</div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

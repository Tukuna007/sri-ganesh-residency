'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Trash2, Plus, Hotel, BedDouble, Users, RefreshCcw, Tag, LogOut, LayoutDashboard, Ticket, CheckCircle2, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'bookings' | 'promos' | 'rooms'>('bookings')
  
  const [bookings, setBookings] = useState<any[]>([])
  const [promos, setPromos] = useState<any[]>([])
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [newPromo, setNewPromo] = useState({
    code: '',
    type: 'percentage',
    value: 0,
    description: ''
  })

  useEffect(() => {
    const auth = localStorage.getItem('sgr_admin_auth')
    if (auth === 'true') {
      setIsLoggedIn(true)
      fetchData()
    }
  }, [activeTab])

  const fetchData = () => {
    if (activeTab === 'bookings') fetchBookings()
    else if (activeTab === 'promos') fetchPromos()
    else fetchRooms()
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'sriganeshresidencytpt@gmail.com' && password === 'Admin@sgr.com#123456') {
      localStorage.setItem('sgr_admin_auth', 'true')
      setIsLoggedIn(true)
      fetchData()
      setError('')
    } else {
      setError('Invalid credentials')
    }
  }

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/bookings', {
        headers: { 'Authorization': 'Bearer sgr-admin-secret-token' }
      })
      const data = await res.json()
      if (Array.isArray(data)) setBookings(data)
    } catch (err) {
      console.error('Failed to fetch bookings', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPromos = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/promos', {
        headers: { 'Authorization': 'Bearer sgr-admin-secret-token' }
      })
      const data = await res.json()
      if (Array.isArray(data)) setPromos(data)
    } catch (err) {
      console.error('Failed to fetch promos', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRooms = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/rooms', {
        headers: { 'Authorization': 'Bearer sgr-admin-secret-token' }
      })
      const data = await res.json()
      if (Array.isArray(data)) setRooms(data)
    } catch (err) {
      console.error('Failed to fetch rooms', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateRoom = async (room: any) => {
    try {
      const res = await fetch('/api/admin/rooms', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sgr-admin-secret-token'
        },
        body: JSON.stringify({ 
          _id: room._id,
          price: room.price, 
          originalPrice: room.originalPrice,
          availableCount: room.availableCount,
          totalRooms: room.totalRooms,
          capacity: room.capacity
        })
      })
      if (res.ok) {
        toast.success(`${room.name} updated successfully!`)
        fetchRooms()
      } else {
        toast.error('Failed to save changes')
      }
    } catch (err) {
      toast.error('Failed to update room')
    }
  }

  const handleSyncRooms = async () => {
    if (!confirm('This will reset all room settings to defaults. Continue?')) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin/rooms', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer sgr-admin-secret-token' }
      })
      const data = await res.json()
      toast.success(data.message)
      fetchRooms()
    } catch (err) {
      toast.error('Failed to sync rooms')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/promos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sgr-admin-secret-token'
        },
        body: JSON.stringify(newPromo)
      })
      if (res.ok) {
        toast.success('Promo code created!')
        setNewPromo({ code: '', type: 'percentage', value: 0, description: '' })
        fetchPromos()
      } else {
        toast.error('Failed to create promo code')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const handleDeletePromo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this promo code?')) return
    try {
      const res = await fetch('/api/admin/promos', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sgr-admin-secret-token'
        },
        body: JSON.stringify({ id })
      })
      if (res.ok) {
        toast.success('Promo code deleted')
        fetchPromos()
      }
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('sgr_admin_auth')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F5F2F0]">
        <div className="bg-white border border-border/50 rounded-[3rem] p-12 shadow-2xl w-full max-w-md text-center">
          <Hotel className="w-16 h-16 text-[#4A1D1D] mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-foreground mb-8">Management Portal</h1>
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-border/60 bg-muted/30 focus:bg-background outline-none transition-all" placeholder="admin@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-border/60 bg-muted/30 focus:bg-background outline-none transition-all" placeholder="••••••••" />
            </div>
            {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}
            <Button type="submit" className="w-full h-16 bg-[#4A1D1D] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-black/10">Unlock Dashboard</Button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#F5F2F0] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl border border-border/40">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#4A1D1D] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/20">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground italic">Admin Dashboard</h1>
              <p className="text-foreground/40 text-xs font-bold uppercase tracking-widest">Sri Ganesh Residency | Tirupati</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={fetchData} variant="outline" className="h-14 rounded-2xl border-[#4A1D1D]/20 text-[#4A1D1D] font-bold uppercase tracking-widest text-[10px] px-8 hover:bg-[#4A1D1D] hover:text-white transition-all">
              <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Sync Data
            </Button>
            <Button onClick={handleLogout} variant="outline" className="h-14 rounded-2xl border-red-500/20 text-red-500 font-bold uppercase tracking-widest text-[10px] px-8 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'bookings', label: 'Reservations', icon: <Hotel className="w-4 h-4" /> },
            { id: 'promos', label: 'Promo Codes', icon: <Ticket className="w-4 h-4" /> },
            { id: 'rooms', label: 'Room Inventory', icon: <BedDouble className="w-4 h-4" /> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-3 shadow-sm ${activeTab === tab.id ? 'bg-[#4A1D1D] text-white shadow-black/10' : 'bg-white text-foreground/40 hover:bg-muted border border-border/50'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Reservations Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white border border-border/50 rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#4A1D1D]/5 border-b border-border/40">
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Guest Details</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Room Type</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Stay Duration</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Payment</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {loading ? (
                    <tr><td colSpan={5} className="px-10 py-20 text-center text-foreground/40 font-bold italic">Fetching latest reservations...</td></tr>
                  ) : bookings.length === 0 ? (
                    <tr><td colSpan={5} className="px-10 py-20 text-center text-foreground/40 font-bold italic">No reservations found.</td></tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-muted/20 transition-all group">
                        <td className="px-10 py-8">
                          <div className="font-serif font-bold text-xl text-foreground mb-1">{booking.name}</div>
                          <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{booking.phone}</div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="font-bold text-foreground/80 italic">{booking.roomName}</div>
                          <div className="text-[10px] font-bold text-[#4A1D1D]/40 uppercase">{booking.guests} Guests</div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="text-sm font-bold flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#4A1D1D]/30" />
                            {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
                          </div>
                        </td>
                        <td className="px-10 py-8">
                          <div className="font-serif font-bold text-lg text-[#4A1D1D]">₹{booking.amount}</div>
                          <p className="text-[9px] font-bold text-foreground/30 uppercase tracking-tighter">Deposit Paid</p>
                        </td>
                        <td className="px-10 py-8">
                          <span className={cn(
                            "px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 w-fit border",
                            booking.paymentStatus === 'Paid' ? "bg-green-500/10 text-green-600 border-green-500/20" : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                          )}>
                            {booking.paymentStatus === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {booking.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Promo Codes Tab */}
        {activeTab === 'promos' && (
          <div className="space-y-12 animate-fade-in">
            {/* Create Promo Form */}
            <div className="bg-white border border-border/50 rounded-[3rem] p-12 shadow-2xl">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-10 flex items-center gap-5 italic">
                <div className="w-1.5 h-8 bg-[#4A1D1D]/20 rounded-full" />
                Generate New Privilege Code
              </h3>
              <form onSubmit={handleCreatePromo} className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-2">Promo Code</label>
                  <input type="text" value={newPromo.code} onChange={(e) => setNewPromo({...newPromo, code: e.target.value.toUpperCase()})} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 focus:bg-background outline-none font-bold tracking-widest" placeholder="E.G. WELCOME20" required />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-2">Benefit Type</label>
                  <select value={newPromo.type} onChange={(e) => setNewPromo({...newPromo, type: e.target.value})} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 focus:bg-background outline-none appearance-none font-bold">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-2">Value</label>
                  <input type="number" value={newPromo.value} onChange={(e) => setNewPromo({...newPromo, value: parseInt(e.target.value)})} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 focus:bg-background outline-none font-bold" required />
                </div>
                <Button type="submit" className="h-16 bg-[#4A1D1D] text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all">
                  Activate Code
                </Button>
              </form>
            </div>

            {/* Promos List */}
            <div className="bg-white border border-border/50 rounded-[3rem] overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#4A1D1D]/5 border-b border-border/40">
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Active Code</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Type</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Benefit</th>
                    <th className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {loading ? (
                    <tr><td colSpan={4} className="px-10 py-20 text-center text-foreground/40 font-bold italic">Loading codes...</td></tr>
                  ) : promos.length === 0 ? (
                    <tr><td colSpan={4} className="px-10 py-20 text-center text-foreground/40 font-bold italic">No active privilege codes.</td></tr>
                  ) : (
                    promos.map((promo) => (
                      <tr key={promo._id} className="hover:bg-muted/20 transition-all">
                        <td className="px-10 py-8 font-serif font-bold text-xl text-foreground tracking-widest italic">{promo.code}</td>
                        <td className="px-10 py-8 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{promo.type}</td>
                        <td className="px-10 py-8 font-bold text-[#4A1D1D] text-lg">{promo.type === 'percentage' ? `${promo.value}%` : `₹${promo.value}`}</td>
                        <td className="px-10 py-8">
                          <button onClick={() => handleDeletePromo(promo._id)} className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Room Inventory Tab */}
        {activeTab === 'rooms' && (
          <div className="space-y-12 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {rooms.map((room) => {
                const roomIsSoldOut = (room.availableCount || 0) <= 0;
                return (
                  <div key={room._id} className="bg-white border border-border/50 rounded-[3rem] p-10 shadow-2xl flex flex-col gap-10 transition-all hover:shadow-black/5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-[#4A1D1D]/10 rounded-[2rem] flex items-center justify-center text-[#4A1D1D]">
                          <BedDouble className="w-10 h-10" />
                        </div>
                        <div>
                          <h4 className="text-3xl font-serif font-bold text-foreground italic">{room.name}</h4>
                          <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.3em]">Identity: {room.id}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border",
                        roomIsSoldOut ? "bg-red-500 text-white border-red-400" : "bg-green-500 text-white border-green-400"
                      )}>
                        {roomIsSoldOut ? 'Sold Out' : `${room.availableCount} Available`}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-2 flex items-center gap-2 text-[#4A1D1D]">Offer Price (₹) <Tag className="w-3 h-3" /></label>
                        <input type="number" value={room.price} onChange={(e) => setRooms(rooms.map(r => r._id === room._id ? {...r, price: parseInt(e.target.value)} : r))} className="w-full px-8 py-5 rounded-2xl border border-[#4A1D1D]/20 bg-[#4A1D1D]/5 outline-none font-bold text-[#4A1D1D] text-2xl" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-2">Original Price (₹)</label>
                        <input type="number" value={room.originalPrice || 0} onChange={(e) => setRooms(rooms.map(r => r._id === room._id ? {...r, originalPrice: parseInt(e.target.value)} : r))} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/20 outline-none font-bold text-foreground/40 line-through text-xl" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-2 flex items-center gap-2">Capacity <Users className="w-3 h-3" /></label>
                        <input type="number" value={room.capacity} onChange={(e) => setRooms(rooms.map(r => r._id === room._id ? {...r, capacity: parseInt(e.target.value)} : r))} className="w-full px-8 py-5 rounded-2xl border border-border/60 bg-muted/30 outline-none text-xl font-bold" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest ml-2">Live Availability</label>
                        <input type="number" value={room.availableCount} onChange={(e) => setRooms(rooms.map(r => r._id === room._id ? {...r, availableCount: parseInt(e.target.value)} : r))} className="w-full px-8 py-5 rounded-2xl border border-green-500/20 bg-green-500/5 outline-none font-bold text-green-600 text-2xl" />
                      </div>
                    </div>

                    <Button onClick={() => handleUpdateRoom(room)} className="w-full bg-[#4A1D1D] text-white font-bold uppercase tracking-[0.3em] h-20 rounded-[2rem] shadow-2xl shadow-black/20 hover:bg-black transition-all duration-700 italic text-lg">
                      Sync to Website
                    </Button>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center pt-20">
              <button onClick={handleSyncRooms} className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em] hover:text-red-500 transition-colors">
                Danger Zone: Re-Sync All Defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function Calendar(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

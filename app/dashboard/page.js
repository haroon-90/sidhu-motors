'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Package, Loader, User, Mail, Phone, Shield } from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Check auth
            const userRes = await fetch('/api/auth/me');
            if (!userRes.ok) {
                router.push('/login');
                return;
            }
            const userData = await userRes.json();
            setUser(userData.user);

            // Fetch bookings
            const bookingsRes = await fetch('/api/bookings');
            if (bookingsRes.ok) {
                const bookingsData = await bookingsRes.json();
                setBookings(bookingsData.bookings || []);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
                <p className="text-xl text-slate-400">
                    Welcome back, <span className="text-blue-400">{user?.name}</span>!
                </p>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-900 rounded-2xl border border-white/5 p-6 transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-500" /> Account Details
                    </h3>
                    <div className="space-y-3 text-slate-400">
                        <p className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-slate-500" /> {user?.email}
                        </p>
                        <p className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-slate-500" /> {user?.phone || 'Not provided'}
                        </p>
                        <p className="flex items-center gap-3">
                            <Shield className="w-4 h-4 text-slate-500" /> {user?.role}
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-white/5 p-6 transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">{bookings.length}</p>
                            <p className="text-slate-400">Total Bookings</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-white/5 p-6 transition-all duration-300 hover:border-blue-500/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">
                                {bookings.filter(b => b.status === 'confirmed').length}
                            </p>
                            <p className="text-slate-400">Active Bookings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bookings List */}
            <div className="bg-slate-900 rounded-2xl border border-white/5 p-8 transition-all duration-300 hover:border-blue-500/20">
                <h2 className="text-2xl font-bold text-white mb-8">Booking History</h2>

                {bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 rounded-xl bg-slate-950/50 border border-white/5 hover:border-blue-500/20 transition-colors"
                            >
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {booking.carId?.make} {booking.carId?.model}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-400">
                                        <p>
                                            <span className="text-slate-500">From:</span>{' '}
                                            {new Date(booking.startDate).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <span className="text-slate-500">To:</span>{' '}
                                            {new Date(booking.endDate).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <span className="text-slate-500">Total:</span>{' '}
                                            <span className="text-white font-medium">₹{booking.totalPrice?.toLocaleString()}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-0">
                                    <span
                                        className={`px-4 py-2 rounded-full text-xs font-semibold border ${booking.status === 'confirmed'
                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                            : booking.status === 'pending'
                                                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                : booking.status === 'completed'
                                                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}
                                    >
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Package className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                        <p className="text-xl text-slate-400 mb-6">No bookings yet</p>
                        <a href="/cars" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20">
                            Browse Cars
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

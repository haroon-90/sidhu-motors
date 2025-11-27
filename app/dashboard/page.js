'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Package, Loader } from 'lucide-react';

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
                <Loader className="w-8 h-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
                <p className="text-xl text-[var(--text-secondary)]">
                    Welcome back, {user?.name}!
                </p>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="card">
                    <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                    <div className="space-y-2 text-[var(--text-secondary)]">
                        <p><span className="font-medium">Name:</span> {user?.name}</p>
                        <p><span className="font-medium">Email:</span> {user?.email}</p>
                        <p><span className="font-medium">Phone:</span> {user?.phone}</p>
                        <p><span className="font-medium">Role:</span> {user?.role}</p>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{bookings.length}</p>
                            <p className="text-[var(--text-secondary)]">Total Bookings</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">
                                {bookings.filter(b => b.status === 'confirmed').length}
                            </p>
                            <p className="text-[var(--text-secondary)]">Active Bookings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bookings List */}
            <div className="card">
                <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

                {bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
                            >
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {booking.carId?.make} {booking.carId?.model}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[var(--text-secondary)]">
                                        <p>
                                            <span className="font-medium">From:</span>{' '}
                                            {new Date(booking.startDate).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <span className="font-medium">To:</span>{' '}
                                            {new Date(booking.endDate).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <span className="font-medium">Total:</span> ₹
                                            {booking.totalPrice?.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-0">
                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${booking.status === 'confirmed'
                                                ? 'bg-green-500/20 text-green-400'
                                                : booking.status === 'pending'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : booking.status === 'completed'
                                                        ? 'bg-blue-500/20 text-blue-400'
                                                        : 'bg-red-500/20 text-red-400'
                                            }`}
                                    >
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 mx-auto mb-4 text-[var(--text-muted)]" />
                        <p className="text-xl text-[var(--text-muted)] mb-4">No bookings yet</p>
                        <a href="/cars" className="btn btn-primary">
                            Browse Cars
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

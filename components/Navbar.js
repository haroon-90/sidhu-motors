'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Car, Menu, X, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/cars', label: 'Browse Cars' },
        { href: '/dashboard', label: 'My Bookings' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-bg-card/60 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Car className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SIDHU Motors</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-text-secondary'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {loading ? (
                            <div className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/dashboard" className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </Link>
                                {user.role === 'admin' && (
                                    <Link href="/admin" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-bg-elevated text-text-primary border border-border hover:bg-bg-card hover:border-border-hover text-sm">
                                        Admin
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="flex items-center gap-2 text-text-muted hover:text-red-500 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-bg-elevated text-text-primary border border-border hover:bg-bg-card hover:border-border-hover text-sm">
                                    Login
                                </Link>
                                <Link href="/register" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/60 text-sm">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-text-primary"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-text-secondary'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    <div className="text-sm text-text-secondary">Welcome, {user.name}</div>
                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-bg-elevated text-text-primary border border-border hover:bg-bg-card hover:border-border-hover text-sm">
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-bg-elevated text-text-primary border border-border hover:bg-bg-card hover:border-border-hover text-sm">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-bg-elevated text-text-primary border border-border hover:bg-bg-card hover:border-border-hover text-sm">
                                        Login
                                    </Link>
                                    <Link href="/register" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/60 text-sm">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

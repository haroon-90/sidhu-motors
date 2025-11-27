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
        <nav className="glass sticky top-0 z-50 border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Car className="w-8 h-8 text-[var(--primary)] transition-transform group-hover:scale-110" />
                        <span className="text-xl font-bold gradient-text">SIDHU Motors</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${pathname === link.href ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {loading ? (
                            <div className="loading"></div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/dashboard" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </Link>
                                {user.role === 'admin' && (
                                    <Link href="/admin" className="btn btn-secondary text-sm px-4 py-2">
                                        Admin
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="flex items-center gap-2 text-[var(--text-muted)] hover:text-red-500 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="btn btn-secondary text-sm px-4 py-2">
                                    Login
                                </Link>
                                <Link href="/register" className="btn btn-primary text-sm px-4 py-2">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-[var(--text-primary)]"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[var(--border)]">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${pathname === link.href ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    <div className="text-sm text-[var(--text-secondary)]">Welcome, {user.name}</div>
                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="btn btn-secondary text-sm">
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className="btn btn-secondary text-sm">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="btn btn-secondary text-sm">
                                        Login
                                    </Link>
                                    <Link href="/register" className="btn btn-primary text-sm">
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

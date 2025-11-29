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
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        fetchUser();
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${scrolled ? 'bg-slate-950/80 border-b border-white/5 py-3' : 'py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 rounded-xl bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors">
                            <Car className="w-6 h-6 text-blue-500" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            SIDHU <span className="text-blue-500">Motors</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === link.href
                                    ? 'bg-blue-600/10 text-blue-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                        ) : user ? (
                            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                                <Link href="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 group-hover:border-blue-500/50 transition-colors">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium">{user.name}</span>
                                </Link>
                                {user.role === 'admin' && (
                                    <Link href="/admin" className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                                        Admin
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                    Login
                                </Link>
                                <Link href="/register" className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-600/20 hover:-translate-y-0.5">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-300 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/5 p-4 animate-slide-up">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`p-3 rounded-xl text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'bg-blue-600/10 text-blue-400'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-white/5 my-2"></div>
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 p-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                            <User className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                    {user.role === 'admin' && (
                                        <Link href="/admin" className="p-3 rounded-xl text-sm font-medium text-purple-400 bg-purple-500/10 hover:bg-purple-500/20">
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className="p-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 text-left">
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <Link href="/login" className="flex justify-center py-2.5 rounded-xl bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors">
                                        Login
                                    </Link>
                                    <Link href="/register" className="flex justify-center py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

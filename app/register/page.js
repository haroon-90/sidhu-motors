'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // Auto-login after registration
                const loginRes = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });

                if (loginRes.ok) {
                    router.push('/dashboard');
                    router.refresh();
                }
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="card">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-(--primary) to-(--secondary) flex items-center justify-center">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                        <p className="text-(--text-secondary)">Join SIDHU Motors today</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-(--text-muted) mt-1">Minimum 6 characters</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full justify-center"
                        >
                            {loading ? <div className="loading"></div> : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-(--text-secondary)">
                        Already have an account?{' '}
                        <Link href="/login" className="text-(--primary) hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

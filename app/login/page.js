'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/dashboard');
                router.refresh();
            } else {
                setError(data.error || 'Login failed');
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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-[var(--text-secondary)]">Login to access your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full justify-center"
                        >
                            {loading ? <div className="loading"></div> : 'Login'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-[var(--text-secondary)]">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-[var(--primary)] hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>

                    <div className="mt-4 p-4 rounded-lg bg-[var(--bg-elevated)] text-sm">
                        <p className="font-semibold mb-2">Demo Credentials:</p>
                        <p className="text-[var(--text-secondary)]">
                            User: <span className="text-[var(--text-primary)]">john@example.com</span> / userpassword
                        </p>
                        <p className="text-[var(--text-secondary)]">
                            Admin: <span className="text-[var(--text-primary)]">admin@sidhumotors.com</span> / adminpassword
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

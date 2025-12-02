import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 mt-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(circle_at_bottom,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">SIDHU <span className="text-blue-500">Motors</span></h3>
                        <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
                            Your trusted partner for premium car rentals. Experience luxury and comfort with our curated fleet of vehicles.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/cars" className="text-slate-400 hover:text-blue-400 transition-colors">
                                    Browse Cars
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-slate-400 hover:text-blue-400 transition-colors">
                                    My Bookings
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
                        <ul className="space-y-1 text-slate-400">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                ahmedwaleed0708@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                +92 345 6881529
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                24/7 Support Available
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='pt-2 mt-2 border-t border-gray-800'>
                    <p className="text-sm text-center text-slate-600">
                        © {new Date().getFullYear()} SIDHU Motors. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

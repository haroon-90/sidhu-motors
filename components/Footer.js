import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-(--bg-card) border-t border-(--border) mt-20 p-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold gradient-text mb-4">SIDHU Motors</h3>
                        <p className="text-(--text-secondary) mb-4">
                            Your trusted partner for premium car rentals. Experience luxury and comfort with our curated fleet of vehicles.
                        </p>
                        <p className="text-sm text-(--text-muted)">
                            © 2024 SIDHU Motors. All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-(--text-primary) mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/cars" className="text-(--text-secondary) hover:text-(--primary) transition-colors">
                                    Browse Cars
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-(--text-secondary) hover:text-(--primary) transition-colors">
                                    My Bookings
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-(--text-secondary) hover:text-(--primary) transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-(--text-primary) mb-4">Contact</h4>
                        <ul className="space-y-2 text-(--text-secondary)">
                            <li>Email: info@sidhumotors.com</li>
                            <li>Phone: +91 99999 99999</li>
                            <li>Support: 24/7 Available</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

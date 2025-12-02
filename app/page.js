import Link from 'next/link';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import CarCard from '@/components/CarCard';

async function getFeaturedCars() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars?limit=3`, {
            cache: 'no-store',
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.cars || [];
    } catch (error) {
        console.error('Error fetching cars:', error);
        return [];
    }
}

export default async function Home() {
    const featuredCars = await getFeaturedCars();

    return (
        <div className="min-h-screen w-full flex flex-col">
            {/* Hero Section */}
            <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden pt-6">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-slate-950"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-50"></div>
                    <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] opacity-30"></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[url('/grid.png')] mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-sm font-medium text-blue-200">Premium Car Rental Service</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight animate-slide-up">
                        <span className="text-white">Drive Your</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-500 to-purple-600">Dream Today</span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Experience the thrill of luxury. Choose from our exclusive fleet of premium vehicles and transform your journey into an unforgettable adventure.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Link href="/cars" className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-600/30 hover:-translate-y-1">
                            Browse Fleet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/register" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-md transition-all hover:-translate-y-1">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Star, title: "Premium Fleet", desc: "Handpicked luxury and performance vehicles for every occasion." },
                        { icon: Shield, title: "Full Insurance", desc: "Drive with confidence knowing you're fully covered on every trip." },
                        { icon: Clock, title: "24/7 Support", desc: "Round-the-clock customer service for a seamless experience." }
                    ].map((feature, index) => (
                        <div key={index} className="group p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:bg-slate-900 hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 mb-6 rounded-2xl bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                                <feature.icon className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Cars */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-4">Featured Cars</h2>
                        <p className="text-slate-400 text-lg">Explore our handpicked selection of premium vehicles</p>
                    </div>
                    <Link href="/cars" className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        View All <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {featuredCars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5">
                        <p className="text-slate-400 mb-4 text-lg">No cars available yet.</p>
                        <p className="text-sm text-slate-500">
                            Run the seed script to populate the database.
                        </p>
                    </div>
                )}

                <div className="text-center mt-12 md:hidden">
                    <Link href="/cars" className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-700 transition-colors">
                        View All Cars <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-blue-600">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-700"></div>

                    <div className="relative z-10 py-10 px-8 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            Ready to Hit the Road?
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust SIDHU Motors for their rental needs.
                        </p>
                        <Link href="/register" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-50 transition-colors shadow-xl shadow-black/20 hover:-translate-y-1">
                            Create Account <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}


import Link from 'next/link';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import CarCard from '@/components/CarCard';

async function getCars() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/cars`, {
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

export default async function CarsPage() {
    const cars = await getCars();

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Our Premium Fleet</h1>
                    <p className="text-slate-400">Choose from our exclusive collection of luxury vehicles</p>
                </div>

                {/* Search/Filter Placeholder */}
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search cars..."
                            className="w-full bg-slate-900 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        />
                    </div>
                    <button className="p-2.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Cars Grid */}
            {cars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-white/5">
                    <p className="text-slate-400 mb-4 text-lg">No cars found.</p>
                    <p className="text-sm text-slate-500">
                        Try adjusting your search or check back later.
                    </p>
                </div>
            )}
        </div>
    );
}

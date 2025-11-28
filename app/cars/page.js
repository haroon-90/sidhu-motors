'use client';

import { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard';
import { Filter, Loader } from 'lucide-react';

export default function CarsPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        transmission: '',
        minPrice: '',
        maxPrice: '',
    });

    useEffect(() => {
        fetchCars();
    }, [filters]);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.location) params.append('location', filters.location);
            if (filters.transmission) params.append('transmission', filters.transmission);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

            const res = await fetch(`/api/cars?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setCars(data.cars || []);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Our Fleet</h1>
                <p className="text-xl text-(--text-secondary)">
                    Find the perfect car for your journey
                </p>
            </div>

            {/* Filters */}
            <div className="card mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-(--primary)" />
                    <h2 className="text-xl font-semibold">Filters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                            type="text"
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            placeholder="e.g., Bangalore"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Transmission</label>
                        <select
                            value={filters.transmission}
                            onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                        >
                            <option value="">All</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Min Price</label>
                        <input
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                            placeholder="₹0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Max Price</label>
                        <input
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                            placeholder="₹50,000"
                        />
                    </div>
                </div>

                <button
                    onClick={() => setFilters({ location: '', transmission: '', minPrice: '', maxPrice: '' })}
                    className="btn btn-secondary mt-4"
                >
                    Clear Filters
                </button>
            </div>

            {/* Cars Grid */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader className="w-8 h-8 animate-spin text-(--primary)" />
                </div>
            ) : cars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cars.map((car) => (
                        <CarCard key={car._id} car={car} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-(--text-muted)">No cars found matching your filters.</p>
                    <button
                        onClick={() => setFilters({ location: '', transmission: '', minPrice: '', maxPrice: '' })}
                        className="btn btn-primary mt-4"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}

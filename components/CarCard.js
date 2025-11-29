import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Fuel, Gauge } from 'lucide-react';

export default function CarCard({ car }) {
    return (
        <Link href={`/cars/${car._id}`}>
            <div className="group cursor-pointer overflow-hidden bg-slate-900 rounded-2xl border border-white/5 transition-all duration-500 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20">
                {/* Image */}
                <div className="relative w-full h-52 mb-4 overflow-hidden bg-slate-800">
                    {car.images && car.images.length > 0 ? (
                        <Image
                            src={car.images[0]}
                            alt={`${car.make} ${car.model}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                            No Image
                        </div>
                    )}

                    {/* Overlay linear */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>

                    {/* Tags */}
                    {car.tags && car.tags.length > 0 && (
                        <div className="absolute top-3 right-3 flex flex-wrap gap-1">
                            {car.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2.5 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-white font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="px-5 pb-6 space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-slate-400">{car.year} • Premium Series</p>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span>{car.seats} Seats</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Gauge className="w-4 h-4 text-blue-500" />
                            <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <Fuel className="w-4 h-4 text-blue-500" />
                            <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span>{car.location}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div>
                            <p className="text-2xl font-bold text-white">₹{car.dailyPrice.toLocaleString()}</p>
                            <p className="text-xs text-slate-500">per day</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${car.isAvailable
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                            }`}>
                            {car.isAvailable ? 'Available' : 'Booked'}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Fuel, Gauge } from 'lucide-react';

export default function CarCard({ car }) {
    return (
        <Link href={`/cars/${car._id}`}>
            <div className="card group cursor-pointer overflow-hidden">
                {/* Image */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-(--bg-elevated)">
                    {car.images && car.images.length > 0 ? (
                        <Image
                            src={car.images[0]}
                            alt={`${car.make} ${car.model}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-(--text-muted)">
                            No Image
                        </div>
                    )}

                    {/* Tags */}
                    {car.tags && car.tags.length > 0 && (
                        <div className="absolute top-2 right-2 flex flex-wrap gap-1">
                            {car.tags.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-1 rounded-full glass text-white font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <div>
                        <h3 className="text-xl font-bold text-(--text-primary) group-hover:text-(--primary) transition-colors">
                            {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-(--text-muted)">{car.year}</p>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-(--text-secondary)">
                            <Users className="w-4 h-4" />
                            <span>{car.seats} Seats</span>
                        </div>
                        <div className="flex items-center gap-2 text-(--text-secondary)">
                            <Gauge className="w-4 h-4" />
                            <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2 text-(--text-secondary)">
                            <Fuel className="w-4 h-4" />
                            <span>{car.fuelType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-(--text-secondary)">
                            <MapPin className="w-4 h-4" />
                            <span>{car.location}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-3 border-t border-(--border)">
                        <div>
                            <p className="text-2xl font-bold gradient-text">₹{car.dailyPrice.toLocaleString()}</p>
                            <p className="text-xs text-(--text-muted)">per day</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${car.isAvailable
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                            }`}>
                            {car.isAvailable ? 'Available' : 'Booked'}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

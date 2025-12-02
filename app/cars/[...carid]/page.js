'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Users, Fuel, Gauge, Calendar, ArrowLeft,
  CheckCircle, Clock, Shield, Star, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const carId = params.carid?.[0];

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Booking Form State
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (carId) {
      fetchCarDetails();
    }
  }, [carId]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/cars/${carId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch car details');
      }

      setCar(data.car);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError(null);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carId: car._id,
          startDate,
          endDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Booking failed');
      }

      setBookingSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setBookingError(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const totalPrice = calculateDays() * (car?.dailyPrice || 0);

  const nextImage = () => {
    if (car?.images?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car?.images?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="loading mb-4"></div>
          <p className="text-slate-400">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">Car Not Found</h1>
          <p className="text-slate-400 mb-8">{error || 'The car you are looking for does not exist.'}</p>
          <Link href="/cars" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-semibold transition-all">
            <ArrowLeft className="w-5 h-5" /> Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/cars" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Cars
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-white/5">
              {car.images && car.images.length > 0 ? (
                <>
                  <Image
                    src={car.images[currentImageIndex]}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-slate-800 transition-all"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-slate-800 transition-all"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  No Image Available
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {car.images && car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === index
                      ? 'border-blue-500 scale-95'
                      : 'border-white/10 hover:border-white/20'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${car.make} ${car.model} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Features */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose This Car?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Shield, text: 'Full Insurance Coverage' },
                  { icon: Clock, text: '24/7 Roadside Assistance' },
                  { icon: Star, text: 'Top-Rated Vehicle' },
                  { icon: CheckCircle, text: 'Regular Maintenance' },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-slate-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details & Booking */}
          <div className="space-y-6">
            {/* Car Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {car.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-5xl font-bold text-white mb-2">
                {car.make} {car.model}
              </h1>
              <p className="text-xl text-slate-400 mb-6">{car.year} Model • Premium Collection</p>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${car.isAvailable
                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                <span className={`w-2 h-2 rounded-full ${car.isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></span>
                {car.isAvailable ? 'Available Now' : 'Currently Booked'}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Capacity</p>
                    <p className="text-white font-semibold">{car.seats} Seats</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Transmission</p>
                    <p className="text-white font-semibold">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <Fuel className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Fuel Type</p>
                    <p className="text-white font-semibold">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">Location</p>
                    <p className="text-white font-semibold">{car.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-blue-100 mb-1">Daily Rental Rate</p>
                  <p className="text-5xl font-bold text-white">{car.dailyPrice.toLocaleString()} <span className="text-2xl">PKR</span></p>
                </div>
                <Calendar className="w-12 h-12 text-white/50" />
              </div>
            </div>

            {/* Booking Section */}
            {car.isAvailable ? (
              <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Book This Car</h3>

                {bookingSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-white mb-2">Booking Successful!</h4>
                    <p className="text-slate-400 mb-4">Redirecting to dashboard...</p>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-6">
                    <div>
                      <label className="block text-slate-400 mb-2 font-medium">Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-2 font-medium">End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    </div>

                    {calculateDays() > 0 && (
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400">Duration</span>
                          <span className="text-white font-semibold">{calculateDays()} days</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400">Daily Rate</span>
                          <span className="text-white font-semibold">{car.dailyPrice.toLocaleString()} PKR</span>
                        </div>
                        <div className="border-t border-white/5 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-bold">Total Price</span>
                            <span className="text-2xl font-bold text-blue-400">{totalPrice.toLocaleString()} PKR</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {bookingError && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <p className="text-red-400 text-sm">{bookingError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={bookingLoading || !startDate || !endDate}
                      className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30 hover:shadow-blue-600/30 hover:-translate-y-1"
                    >
                      {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      By booking, you agree to our terms and conditions. You must be logged in to complete the booking.
                    </p>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                <p className="text-red-400 font-semibold mb-2">Currently Unavailable</p>
                <p className="text-slate-400 text-sm">This car is currently booked. Please check back later or browse other vehicles.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

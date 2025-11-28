import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight, Star, Shield, Clock } from 'lucide-react';
import CarCard from '@/components/CarCard';

async function getFeaturedCars() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/cars?limit=3`, {
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
    <div className="min-h-screen p-10 w-full flex flex-col gap-4 justify-center">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_bg.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-(--bg-dark) via-transparent to-(--bg-dark)"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-8 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Drive Your Dream Car
            <br />
            <span className="linear-text">Today</span>
          </h1>
          <p className="text-xl text-(--text-secondary) mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Premium car rentals made simple. Choose from our curated fleet of luxury vehicles and hit the road in style.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link href="/cars" className="btn btn-primary text-lg">
              Browse Cars <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/register" className="btn btn-secondary text-lg">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-(--primary) to-(--secondary) flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Fleet</h3>
            <p className="text-(--text-secondary)">
              Handpicked luxury and performance vehicles for every occasion.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-(--primary) to-(--secondary) flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Full Insurance</h3>
            <p className="text-(--text-secondary)">
              Drive with confidence knowing you're fully covered on every trip.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-(--primary) to-(--secondary) flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-(--text-secondary)">
              Round-the-clock customer service for a seamless experience.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Featured Cars</h2>
            <p className="text-(--text-secondary)">Explore our handpicked selection of premium vehicles</p>
          </div>
          <Link href="/cars" className="btn btn-secondary hidden md:inline-flex">
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
          <div className="text-center py-12">
            <p className="text-(--text-muted) mb-4">No cars available yet.</p>
            <p className="text-sm text-(--text-muted)">
              Run the seed script to populate the database.
            </p>
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link href="/cars" className="btn btn-secondary inline-flex">
            View All Cars <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 mx-10 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto card text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-(--primary) to-(--secondary) opacity-10"></div>
          <div className="relative z-10 py-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Hit the Road?
            </h2>
            <p className="text-xl text-(--text-secondary) mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust SIDHU Motors for their rental needs.
            </p>
            <Link href="/register" className="btn btn-primary text-lg">
              Create Account <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


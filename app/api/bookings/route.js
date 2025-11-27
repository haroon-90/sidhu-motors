import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Car from '@/models/Car';
import { getUserFromToken } from '@/lib/auth';

export async function POST(request) {
    try {
        const tokenData = await getUserFromToken();

        if (!tokenData) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        await dbConnect();
        const { carId, startDate, endDate } = await request.json();

        // Validation
        if (!carId || !startDate || !endDate) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start >= end) {
            return NextResponse.json(
                { error: 'End date must be after start date' },
                { status: 400 }
            );
        }

        // Get car
        const car = await Car.findById(carId);
        if (!car) {
            return NextResponse.json(
                { error: 'Car not found' },
                { status: 404 }
            );
        }

        // Check availability - no overlapping bookings
        const overlappingBooking = await Booking.findOne({
            carId,
            status: { $in: ['pending', 'confirmed'] },
            $or: [
                { startDate: { $lte: end }, endDate: { $gte: start } },
            ],
        });

        if (overlappingBooking) {
            return NextResponse.json(
                { error: 'Car is not available for selected dates' },
                { status: 400 }
            );
        }

        // Calculate total price (server-side)
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalPrice = days * car.dailyPrice;

        // Create booking
        const booking = await Booking.create({
            userId: tokenData.userId,
            carId,
            startDate: start,
            endDate: end,
            totalPrice,
            status: 'pending',
        });

        return NextResponse.json(
            { success: true, booking },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create booking error:', error);
        return NextResponse.json(
            { error: 'Server error creating booking' },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const tokenData = await getUserFromToken();

        if (!tokenData) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        await dbConnect();

        // Admin can see all bookings, user only their own
        const filter = tokenData.role === 'admin' ? {} : { userId: tokenData.userId };

        const bookings = await Booking.find(filter)
            .populate('carId', 'make model images dailyPrice')
            .populate('userId', 'name email phone')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, bookings });
    } catch (error) {
        console.error('Get bookings error:', error);
        return NextResponse.json(
            { error: 'Server error fetching bookings' },
            { status: 500 }
        );
    }
}

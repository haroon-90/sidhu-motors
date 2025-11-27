import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const location = searchParams.get('location');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const seats = searchParams.get('seats');
        const transmission = searchParams.get('transmission');
        const tag = searchParams.get('tag');

        // Build filter
        const filter = { isAvailable: true };
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (minPrice || maxPrice) {
            filter.dailyPrice = {};
            if (minPrice) filter.dailyPrice.$gte = parseInt(minPrice);
            if (maxPrice) filter.dailyPrice.$lte = parseInt(maxPrice);
        }
        if (seats) filter.seats = parseInt(seats);
        if (transmission) filter.transmission = transmission;
        if (tag) filter.tags = { $in: [tag] };

        const skip = (page - 1) * limit;
        const cars = await Car.find(filter).skip(skip).limit(limit);
        const total = await Car.countDocuments(filter);

        return NextResponse.json({
            success: true,
            cars,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get cars error:', error);
        return NextResponse.json(
            { error: 'Server error fetching cars' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const tokenData = await getUserFromToken();

        if (!tokenData || tokenData.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized - Admin only' },
                { status: 403 }
            );
        }

        await dbConnect();
        const carData = await request.json();
        const car = await Car.create(carData);

        return NextResponse.json(
            { success: true, car },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create car error:', error);
        return NextResponse.json(
            { error: 'Server error creating car' },
            { status: 500 }
        );
    }
}

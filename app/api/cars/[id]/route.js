import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Car from '@/models/Car';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const car = await Car.findById(id);
        if (!car) {
            return NextResponse.json(
                { error: 'Car not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, car });
    } catch (error) {
        console.error('Get car error:', error);
        return NextResponse.json(
            { error: 'Server error fetching car' },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const tokenData = await getUserFromToken();

        if (!tokenData || tokenData.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized - Admin only' },
                { status: 403 }
            );
        }

        await dbConnect();
        const { id } = await params;
        const updates = await request.json();

        const car = await Car.findByIdAndUpdate(id, updates, { new: true });
        if (!car) {
            return NextResponse.json(
                { error: 'Car not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, car });
    } catch (error) {
        console.error('Update car error:', error);
        return NextResponse.json(
            { error: 'Server error updating car' },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const tokenData = await getUserFromToken();

        if (!tokenData || tokenData.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized - Admin only' },
                { status: 403 }
            );
        }

        await dbConnect();
        const { id } = await params;

        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            return NextResponse.json(
                { error: 'Car not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Car deleted' });
    } catch (error) {
        console.error('Delete car error:', error);
        return NextResponse.json(
            { error: 'Server error deleting car' },
            { status: 500 }
        );
    }
}

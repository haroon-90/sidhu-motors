import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request) {
    try {
        const tokenData = await getUserFromToken();

        if (!tokenData) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        await dbConnect();
        const user = await User.findById(tokenData.userId).select('-passwordHash');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}

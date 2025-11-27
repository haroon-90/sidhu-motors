import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from '../lib/db.js';
import User from '../models/User.js';
import Car from '../models/Car.js';
import Booking from '../models/Booking.js';

// Load env vars manually if not using --env-file
// But we will assume running with: node --env-file=.env.local scripts/seed.mjs
// Or we can just define it here if missing for safety
if (!process.env.MONGODB_URI) {
    console.log('Loading .env.local manually...');
    const fs = await import('fs');
    const path = await import('path');
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        const envFile = fs.readFileSync(envPath, 'utf8');
        envFile.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    } catch (e) {
        console.error('Could not load .env.local', e);
    }
}

const cars = [
    {
        make: 'Mercedes-Benz',
        model: 'S-Class',
        year: 2024,
        plateNumber: 'KA-01-HH-1234',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        dailyPrice: 15000,
        images: ['/images/car_sedan.png'],
        location: 'Bangalore',
        isAvailable: true,
        tags: ['Luxury', 'Sedan', 'Premium'],
    },
    {
        make: 'Range Rover',
        model: 'Autobiography',
        year: 2023,
        plateNumber: 'KA-05-MM-9999',
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        dailyPrice: 25000,
        images: ['/images/car_suv.png'],
        location: 'Mumbai',
        isAvailable: true,
        tags: ['Luxury', 'SUV', 'Off-road'],
    },
    {
        make: 'BMW',
        model: 'M5 Competition',
        year: 2023,
        plateNumber: 'DL-02-ZZ-5555',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        dailyPrice: 20000,
        images: ['/images/car_sedan.png'], // Reusing sedan image
        location: 'Delhi',
        isAvailable: true,
        tags: ['Sports', 'Sedan', 'Performance'],
    },
    {
        make: 'Toyota',
        model: 'Innova Crysta',
        year: 2022,
        plateNumber: 'KA-03-AA-1111',
        seats: 7,
        transmission: 'Manual',
        fuelType: 'Diesel',
        dailyPrice: 4000,
        images: ['/images/car_suv.png'], // Placeholder
        location: 'Bangalore',
        isAvailable: true,
        tags: ['Economy', 'SUV', 'Family'],
    },
];

const users = [
    {
        name: 'Admin User',
        email: 'admin@sidhumotors.com',
        password: 'adminpassword',
        phone: '9999999999',
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'userpassword',
        phone: '8888888888',
        role: 'user',
    },
];

async function seed() {
    try {
        console.log('Connecting to DB...');
        await dbConnect();
        console.log('Connected.');

        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Car.deleteMany({});
        await Booking.deleteMany({});

        console.log('Seeding Users...');
        for (const u of users) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(u.password, salt);
            await User.create({
                name: u.name,
                email: u.email,
                passwordHash: hash,
                phone: u.phone,
                role: u.role,
            });
        }

        console.log('Seeding Cars...');
        await Car.insertMany(cars);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();

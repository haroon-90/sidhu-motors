import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    plateNumber: { type: String, required: true, unique: true },
    seats: { type: Number, required: true },
    transmission: { type: String, enum: ['Automatic', 'Manual'], required: true },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], required: true },
    dailyPrice: { type: Number, required: true },
    images: { type: [String], default: [] }, // Array of image URLs
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    tags: { type: [String], default: [] }, // e.g., 'Luxury', 'Sports', 'Economy'
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Car || mongoose.model('Car', CarSchema);

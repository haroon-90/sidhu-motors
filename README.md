# SIDHU Motors - Premium Car Rental Platform

A full-stack car rental web application built with Next.js 16, MongoDB, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: JWT-based auth with httpOnly cookies
- **Car Browsing**: Filter and search through available vehicles
- **Booking System**: Book cars with automatic availability checking
- **Admin Dashboard**: Manage fleet and bookings
- **Responsive Design**: Premium dark theme with glassmorphism
- **Data Seeding**: Quick database population for development

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes, Mongoose
- **Database**: MongoDB
- **Authentication**: JWT with bcryptjs
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB installed and running locally OR MongoDB Atlas account
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone & Navigate

```bash
cd web
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

The `.env.local` file is already created with default values:

```env
MONGODB_URI=mongodb://localhost:27017/sidhu_motors
JWT_SECRET=supersecretkey_change_this_in_production_12345
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Note**: Change `JWT_SECRET` in production!

### 4. Start MongoDB

Make sure MongoDB is running:

```bash
# Windows (if MongoDB is installed as service)
net start MongoDB

# Or use MongoDB Compass to start local instance
```

Alternatively, use MongoDB Atlas and update `MONGODB_URI` in `.env.local`.

### 5. Seed the Database

Run the seed script to populate the database with dummy data:

```bash
node scripts/seed.mjs
```

This will create:
- 4 cars (Mercedes S-Class, Range Rover, BMW M5, Toyota Innova)
- 2 users (1 admin, 1 regular user)

**Demo Credentials**:
- **User**: `john@example.com` / `userpassword`
- **Admin**: `admin@sidhumotors.com` / `adminpassword`

### 6. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📱 Pages & Routes

### Public Pages
- `/` - Home page with featured cars
- `/cars` - Browse all available cars
- `/cars/[id]` - Individual car details
- `/login` - User login
- `/register` - User registration

### Protected Pages
- `/dashboard` - User bookings
- `/admin` - Admin panel (admin only)

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Cars
- `GET /api/cars` - List cars (supports filters)
- `GET /api/cars/[id]` - Get car details
- `POST /api/cars` - Create car (admin only)
- `PUT /api/cars/[id]` - Update car (admin only)
- `DELETE /api/cars/[id]` - Delete car (admin only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings (or all for admin)

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme
- **Glassmorphism**: Frosted glass effects
- **Gradient Accents**: Vibrant purple-pink gradients
- **Smooth Animations**: Fade-in and hover effects
- **Premium Typography**: Inter font family
- **Responsive**: Mobile-first design

## 📁 Project Structure

```
web/
├── app/
│   ├── api/          # API routes
│   ├── cars/         # Cars pages
│   ├── dashboard/    # User dashboard
│   ├── login/        # Auth pages
│   ├── register/
│   ├── globals.css   # Global styles
│   ├── layout.js     # Root layout
│   └── page.js       # Home page
├── components/       # React components
│   ├── Navbar.js
│   ├── Footer.js
│   └── CarCard.js
├── lib/             # Utilities
│   ├── db.js        # MongoDB connection
│   └── auth.js      # Auth helpers
├── models/          # Mongoose models
│   ├── User.js
│   ├── Car.js
│   ├── Booking.js
│   └── Review.js
├── public/          # Static assets
│   └── images/
└── scripts/         # Utility scripts
    └── seed.mjs     # Database seeding
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
```
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_random_secret
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

## 🧪 Testing the Application

1. **Register**: Create a new account at `/register`
2. **Browse Cars**: View available cars at `/cars`
3. **Book a Car**: Click on a car and fill booking form
4. **View Bookings**: Check your bookings at `/dashboard`
5. **Admin Access**: Login as admin to manage cars

## 📝 Notes

- Server-side price calculation prevents client manipulation
- Booking overlap validation ensures no double-bookings
- Images are AI-generated and stored in `/public/images`
- JWT stored in httpOnly cookies for security

## 🔒 Security Features

- Password hashing with bcrypt
- HTTP-only cookies for JWT storage
- Server-side validation
- Protected admin routes
- XSS protection

## 📄 License

This project is for educational purposes.

## 👨‍💻 Developer

Built by SIDHU Motors Team

---

**Happy Coding! 🚗💨**

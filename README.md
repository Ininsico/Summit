# 🏔️ Summit - Premium Travel Booking Platform

![Summit Logo](./frontend/public/Summit.png)

**Summit** is a full-stack travel booking platform designed for adventure seekers and travel enthusiasts. Built with modern web technologies, it offers a seamless experience for discovering, booking, and managing travel experiences across Pakistan's most breathtaking destinations.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Frontend Architecture](#-frontend-architecture)
- [Backend Architecture](#-backend-architecture)
- [Database Models](#-database-models)
- [Authentication & Authorization](#-authentication--authorization)
- [Performance Optimizations](#-performance-optimizations)
- [Admin Panel](#-admin-panel)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features

#### For Users
- **🔐 Authentication System**
  - User registration with email validation
  - Secure login with JWT tokens
  - Password hashing with bcrypt
  - Profile management with avatar upload
  - Persistent sessions

- **🗺️ Destination Discovery**
  - Browse curated travel destinations
  - Filter by category (Mountains, Valleys, Lakes, Historical)
  - Detailed destination pages with highlights
  - Difficulty ratings and best time to visit
  - Pricing information

- **📅 Booking Management**
  - Create new bookings for trips
  - Select dates and number of travelers
  - Add special requests
  - View booking history
  - Track booking status (Pending/Confirmed/Cancelled)
  - Cancel bookings

- **👤 User Dashboard**
  - Personal profile management
  - View all bookings
  - Update profile information
  - Upload profile picture
  - Booking statistics

- **📞 Contact System**
  - Contact form for inquiries
  - Message tracking
  - Admin reply system

#### For Administrators
- **📊 Admin Dashboard**
  - Real-time statistics (Revenue, Users, Bookings)
  - Complete CRUD operations for all entities
  - User management
  - Booking approval/rejection workflow
  - Message management with reply system
  - Destination/Trip management

- **🎛️ Full Control Panel**
  - Create, edit, delete destinations
  - Manage user accounts
  - Approve/decline bookings
  - Reply to customer messages
  - View comprehensive analytics

### 🎨 UI/UX Features

- **Modern Design**
  - Glassmorphism effects
  - Smooth animations with GSAP
  - Custom blob cursor
  - Responsive design for all devices
  - Dark theme optimized for travel imagery

- **Interactive Elements**
  - Animated hero section
  - Parallax scrolling effects
  - Smooth page transitions
  - Interactive cards and buttons
  - Dynamic loading states

- **Performance**
  - Lazy loading for images
  - Code splitting
  - Resource preloading
  - Performance monitoring
  - LRU caching system
  - Reduced motion support for accessibility

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.12.0
- **State Management**: Zustand 5.0.10
- **Animations**: GSAP 3.14.2, Motion 12.26.2
- **HTTP Client**: Axios 1.13.2
- **3D Graphics**: OGL 1.0.11
- **Styling**: Vanilla CSS with custom theme system
- **Effects**: React Snowfall 2.4.0

### Backend
- **Runtime**: Node.js with Express 4.18.2
- **Database**: MongoDB with Mongoose 8.0.3
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **File Upload**: Multer 2.0.2
- **Validation**: express-validator 7.0.1
- **CORS**: cors 2.8.5
- **Environment**: dotenv 16.3.1

### Development Tools
- **TypeScript**: ~5.9.3
- **ESLint**: 9.39.1
- **Nodemon**: 3.0.2 (backend dev)
- **PostCSS**: 8.5.6
- **Autoprefixer**: 10.4.23

---

## 📁 Project Structure

```
Summit/
├── backend/                    # Backend API
│   ├── config/                 # Configuration files
│   │   └── db.js              # MongoDB connection
│   ├── middleware/            # Custom middleware
│   │   └── auth.js            # Authentication middleware
│   ├── models/                # Mongoose models
│   │   ├── User.js            # User schema
│   │   ├── Booking.js         # Booking schema
│   │   ├── Destination.js     # Destination schema
│   │   └── Message.js         # Message schema
│   ├── routes/                # API routes
│   │   ├── auth.js            # Authentication routes
│   │   ├── bookings.js        # Booking routes
│   │   ├── destinations.js    # Destination routes
│   │   └── admin.js           # Admin routes
│   ├── utils/                 # Utility functions
│   │   └── generateToken.js   # JWT token generation
│   ├── uploads/               # User uploaded files
│   ├── .env                   # Environment variables
│   ├── server.js              # Express server
│   ├── seedDestinations.js    # Database seeding script
│   └── package.json           # Backend dependencies
│
├── frontend/                  # React frontend
│   ├── public/                # Static assets
│   │   ├── Summit.png         # Logo
│   │   └── ...                # Other images
│   ├── src/
│   │   ├── Components/        # Reusable components
│   │   │   ├── BlobCursor.tsx
│   │   │   ├── DarkVeil.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Snowfall.tsx
│   │   ├── Pages/             # Page components
│   │   │   ├── LandingPage/
│   │   │   │   ├── LandingPage.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── TripsSection.tsx
│   │   │   │   ├── HotelsSection.tsx
│   │   │   │   ├── VehiclesSection.tsx
│   │   │   │   ├── CTASection.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── AboutPage/
│   │   │   │   └── AboutPage.tsx
│   │   │   ├── DestinationsPage/
│   │   │   │   └── DestinationsPage.tsx
│   │   │   ├── VehiclesPage/
│   │   │   │   └── VehiclesPage.tsx
│   │   │   ├── AuthPage/
│   │   │   │   └── AuthPage.tsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── DashboardPage.tsx
│   │   │   │   ├── ProfileSection.tsx
│   │   │   │   ├── MyBookingsSection.tsx
│   │   │   │   ├── BookTripSection.tsx
│   │   │   │   ├── AvailabilitySection.tsx
│   │   │   │   ├── NewBookingFlow.tsx
│   │   │   │   └── DashboardIcons.tsx
│   │   │   └── Admin/
│   │   │       ├── AdminDashboard.tsx
│   │   │       └── AdminIcons.tsx
│   │   ├── services/          # API services
│   │   │   └── api.ts         # Axios configuration & API calls
│   │   ├── store/             # State management
│   │   │   └── useAppStore.ts # Zustand store
│   │   ├── theme/             # Theme system
│   │   │   └── ThemeSystem.ts # Color palette & utilities
│   │   ├── performance/       # Performance utilities
│   │   │   ├── PerformanceMonitor.ts
│   │   │   ├── ResourceLoader.ts
│   │   │   └── CacheManager.ts
│   │   ├── utils/             # Utility functions
│   │   │   ├── gsapUtils.ts
│   │   │   └── performanceUtils.ts
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite configuration
│   └── tsconfig.json          # TypeScript configuration
│
├── README.md                  # This file
├── ADMIN_DASHBOARD_FIXES.md   # Admin dashboard documentation
└── .gitignore                 # Git ignore rules
```

---

## 🚀 Installation

### Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: v6.x or higher (local or MongoDB Atlas)
- **npm** or **yarn**: Package manager

### Clone Repository
```bash
git clone https://github.com/yourusername/summit.git
cd summit
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/summit
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/summit

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# JWT Expiration
JWT_EXPIRE=30d
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:5000` by default. If you need to change this, update the `API_URL` in `frontend/src/services/api.ts`:

```typescript
const API_URL = 'http://localhost:5000/api';
```

---

## 🏃 Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### Seed Database (Optional)
Populate the database with sample destinations:
```bash
cd backend
node seedDestinations.js
```

### Start Backend Server
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+92-300-1234567"
}
```

#### Upload Avatar
```http
POST /auth/upload-avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

avatar: <file>
```

### Booking Endpoints

#### Create Booking
```http
POST /bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": "destination_id",
  "itemName": "K2 Base Camp Trek",
  "type": "destination",
  "tripType": "adventure",
  "startDate": "2024-06-01",
  "endDate": "2024-06-15",
  "travelers": 2,
  "totalPrice": 150000,
  "specialRequests": "Vegetarian meals preferred"
}
```

#### Get User Bookings
```http
GET /bookings
Authorization: Bearer <token>
```

#### Update Booking
```http
PUT /bookings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed",
  "travelers": 3
}
```

#### Cancel Booking
```http
PATCH /bookings/:id/cancel
Authorization: Bearer <token>
```

### Destination Endpoints

#### Get All Destinations
```http
GET /destinations
```

#### Get Destination by ID
```http
GET /destinations/:id
```

### Admin Endpoints (Requires Admin Role)

#### Get Statistics
```http
GET /admin/stats
Authorization: Bearer <admin_token>
```

#### Get All Bookings
```http
GET /admin/bookings
Authorization: Bearer <admin_token>
```

#### Update Booking
```http
PUT /admin/bookings/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

#### Delete Booking
```http
DELETE /admin/bookings/:id
Authorization: Bearer <admin_token>
```

#### Get All Users
```http
GET /admin/users
Authorization: Bearer <admin_token>
```

#### Delete User
```http
DELETE /admin/users/:id
Authorization: Bearer <admin_token>
```

#### Create Destination
```http
POST /admin/destinations
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Hunza Valley",
  "category": "Valleys",
  "location": "Gilgit-Baltistan",
  "description": "Beautiful valley...",
  "highlights": ["Scenic views", "Local culture"],
  "bestTime": "March - October",
  "difficulty": "Easy",
  "duration": "5-7 Days",
  "price": 75000,
  "image": "https://example.com/image.jpg"
}
```

#### Update Destination
```http
PUT /admin/destinations/:id
Authorization: Bearer <admin_token>
```

#### Delete Destination
```http
DELETE /admin/destinations/:id
Authorization: Bearer <admin_token>
```

#### Get All Messages
```http
GET /admin/messages
Authorization: Bearer <admin_token>
```

#### Reply to Message
```http
PATCH /admin/messages/:id/reply
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "reply": "Thank you for your inquiry..."
}
```

#### Delete Message
```http
DELETE /admin/messages/:id
Authorization: Bearer <admin_token>
```

---

## 🎨 Frontend Architecture

### Component Structure

#### Pages
- **LandingPage**: Home page with hero, features, and CTAs
- **AboutPage**: Company information and mission
- **DestinationsPage**: Browse all available destinations
- **VehiclesPage**: Vehicle rental information
- **AuthPage**: Login and registration
- **DashboardPage**: User dashboard with bookings and profile
- **AdminDashboard**: Admin control panel

#### Reusable Components
- **Header**: Dynamic header with scroll behavior
- **Navbar**: Main navigation menu
- **Sidebar**: Mobile navigation drawer
- **BlobCursor**: Custom animated cursor
- **DarkVeil**: Background overlay effect
- **LoadingScreen**: Loading animation
- **Snowfall**: Decorative snow effect

### State Management (Zustand)

```typescript
interface AppStore {
  // User State
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  // UI State
  isSidebarOpen: boolean;
  reducedMotion: boolean;
  animationsEnabled: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  toggleSidebar: () => void;
  setReducedMotion: (value: boolean) => void;
  setAnimationsEnabled: (value: boolean) => void;
}
```

### Theme System

Custom theme system with consistent colors and utilities:

```typescript
const theme = {
  colors: {
    primary: '#00d4ff',
    secondary: '#ff006e',
    background: '#0a0e27',
    surface: '#1a1f3a',
    textPrimary: '#ffffff',
    textSecondary: '#a0aec0',
    border: '#2d3748',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
    secondary: 'linear-gradient(135deg, #ff006e 0%, #ff4d94 100%)'
  }
}
```

### Performance Optimizations

#### 1. Resource Management
- Lazy loading for images
- Code splitting by route
- Preloading critical resources
- Dynamic imports for heavy components

#### 2. Caching System
```typescript
// LRU Cache for API responses
cacheManager.createLRUCache('api-cache', {
  maxAge: 5 * 60 * 1000,  // 5 minutes
  maxSize: 50              // 50 items
});

// Image cache
cacheManager.createLRUCache('image-cache', {
  maxAge: 10 * 60 * 1000, // 10 minutes
  maxSize: 100             // 100 images
});
```

#### 3. Performance Monitoring
- FPS tracking
- Memory usage monitoring
- Page load metrics
- Low-end device detection
- Automatic animation reduction

#### 4. Animation Optimization
- GSAP with optimized defaults
- Reduced motion support
- GPU-accelerated transforms
- RequestAnimationFrame usage

---

## 🔧 Backend Architecture

### Express Server Setup

```javascript
// Middleware Stack
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/destinations', destinationRoutes);

// Error Handling
app.use(errorHandler);
app.use(notFoundHandler);
```

### Middleware

#### Authentication Middleware
```javascript
// Protect routes
export const protect = async (req, res, next) => {
  // Verify JWT token
  // Attach user to request
  // Continue or reject
};

// Admin-only routes
export const admin = (req, res, next) => {
  // Check if user is admin
  // Continue or reject
};
```

---

## 💾 Database Models

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  avatar: String,
  role: String (default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: 'User'),
  itemId: String,
  itemName: String,
  type: String (destination/vehicle/hotel),
  tripType: String,
  startDate: Date,
  endDate: Date,
  travelers: Number,
  totalPrice: Number,
  status: String (pending/confirmed/cancelled),
  specialRequests: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Destination Model
```javascript
{
  name: String (required),
  category: String (required),
  location: String (required),
  description: String (required),
  highlights: [String],
  bestTime: String,
  difficulty: String,
  duration: String,
  price: Number (required),
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  name: String (required),
  email: String (required),
  subject: String (required),
  content: String (required),
  status: String (unread/read/replied),
  reply: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication & Authorization

### JWT Token Flow
1. User registers/logs in
2. Server generates JWT token with user ID
3. Token sent to client
4. Client stores token in localStorage
5. Token included in Authorization header for protected routes
6. Server verifies token and attaches user to request

### Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- Never stored in plain text
- Compared using bcrypt.compare()

### Protected Routes
- User dashboard requires authentication
- Admin panel requires authentication + admin role
- Booking operations require authentication

---

## 🎛️ Admin Panel

### Access
- URL: `/admin`
- Email: `ininsico@gmail.com`
- Requires admin role

### Features

#### Dashboard Overview
- Total Revenue
- Total Users
- Total Bookings
- Pending Bookings Count

#### Booking Management
- View all bookings
- Filter by status (All/Pending/Confirmed/Cancelled)
- Quick approve/decline for pending bookings
- Edit booking details
- Delete bookings

#### Destination Management
- Create new destinations
- Edit existing destinations (all fields)
- Delete destinations
- View all destinations

#### User Management
- View all registered users
- Delete users (except admin)
- View user roles and information

#### Message Management
- View all contact messages
- Reply to messages
- Delete messages
- Track replied status

### Admin Dashboard Documentation
See [ADMIN_DASHBOARD_FIXES.md](./ADMIN_DASHBOARD_FIXES.md) for detailed admin panel documentation.

---

## 🎯 Key Features Breakdown

### 1. Responsive Design
- Mobile-first approach
- Breakpoints for all device sizes
- Touch-friendly interface
- Optimized for tablets and desktops

### 2. Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Reduced motion support
- High contrast ratios

### 3. SEO Optimization
- Meta tags
- Semantic structure
- Fast load times
- Mobile-friendly

### 4. Security
- JWT authentication
- Password hashing
- CORS protection
- Input validation
- XSS prevention
- SQL injection prevention (NoSQL)

---

## 🚀 Deployment

### Backend Deployment (Example: Heroku)
```bash
# Install Heroku CLI
heroku login
heroku create summit-api

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Example: Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Environment Variables for Production
Update API_URL in frontend to point to production backend:
```typescript
const API_URL = 'https://your-api-domain.com/api';
```

---

## 📊 Performance Metrics

### Target Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Optimization Techniques
- Code splitting
- Tree shaking
- Image optimization
- Lazy loading
- Caching strategies
- Minification
- Compression

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Developer

**Arslan Rathore**
- Email: ininsico@gmail.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- GSAP for animation library
- All open-source contributors

---

## 📞 Support

For support, email ininsico@gmail.com or open an issue on GitHub.

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Reviews and ratings system
- [ ] Social media integration
- [ ] Advanced search filters
- [ ] Wishlist functionality
- [ ] Referral program
- [ ] Mobile app (React Native)

---

**Built with ❤️ by Arslan Rathore**

*Last Updated: January 14, 2026*

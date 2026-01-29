# StreamFlix - Modern OTT Platform

A modern, responsive OTT (Over-The-Top) streaming platform built with the MERN stack, inspired by Netflix and Amazon Prime Video. This project features a complete streaming service with user authentication, content management, subscription plans, and an admin dashboard.

## 🚀 Features

### User Features
- **Authentication System**: Login, Register, and Profile Management
- **Content Browsing**: Browse movies and TV shows with advanced filtering
- **Search Functionality**: Search content by title, genre, language, and year
- **Video Player**: Custom video player with play, pause, seek, volume, and fullscreen controls
- **Watch History**: Track viewing progress and continue watching
- **My List**: Add/remove content to personal favorites
- **Subscription Plans**: Basic, Standard, and Premium tiers
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Admin Features
- **Dashboard**: Overview of users, content, subscriptions, and revenue
- **User Management**: View and manage user accounts
- **Content Management**: Add, edit, and delete movies/TV shows
- **Analytics**: View platform statistics and metrics

### Technical Features
- **Dark Theme**: Netflix-inspired dark UI design
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Modern UI Components**: Cards, sliders, modals, and forms
- **RESTful API**: Complete backend API with authentication and CRUD operations
- **Database Integration**: MongoDB for data persistence
- **Security**: JWT authentication, password hashing, and input validation

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with CSS variables
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd streamflix-ott-platform
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/streamflix
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=10mb
ADMIN_EMAIL=admin@streamflix.com
ADMIN_PASSWORD=admin123
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd Frontent
npm install
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🎯 Usage

### For Users
1. **Registration**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Browse Content**: Explore movies and TV shows on the homepage
4. **Search**: Use the search functionality with filters
5. **Watch Content**: Click play to start watching (demo video included)
6. **Manage Profile**: Update profile information and view watch history
7. **Subscription**: Choose from Basic, Standard, or Premium plans

### For Admins
1. **Access Admin Panel**: Login with admin credentials and visit `/admin`
2. **Dashboard**: View platform statistics and recent activity
3. **User Management**: Monitor and manage user accounts
4. **Content Management**: Add, edit, or remove movies and TV shows

### Demo Credentials
**Regular User:**
- Email: demo@streamflix.com
- Password: demo123

**Admin User:**
- Email: admin@streamflix.com
- Password: admin123

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-optimized interface with adapted layouts
- **Mobile**: Mobile-first design with simplified navigation

## 🎨 Design Features

### Visual Elements
- **Dark Theme**: Netflix-inspired color scheme
- **Gradient Overlays**: Cinematic backdrop effects
- **Card Animations**: Smooth hover transitions
- **Loading States**: Professional loading indicators
- **Typography**: Modern font hierarchy

### User Experience
- **Intuitive Navigation**: Easy-to-use menu and search
- **Content Discovery**: Multiple browsing categories
- **Seamless Playback**: Integrated video player
- **Progress Tracking**: Resume watching functionality
- **Personalization**: Customized recommendations

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Content
- `GET /api/content` - Get all content with filters
- `GET /api/content/:id` - Get content by ID
- `POST /api/content` - Create content (Admin)
- `PUT /api/content/:id` - Update content (Admin)
- `DELETE /api/content/:id` - Delete content (Admin)

### Users
- `GET /api/users/favorites` - Get user favorites
- `POST /api/users/favorites/:contentId` - Toggle favorite
- `GET /api/users/watch-history` - Get watch history
- `POST /api/users/watch-history/:contentId` - Add to watch history

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for API URL

### Backend Deployment (Heroku/Railway)
1. Set up environment variables on your hosting platform
2. Configure MongoDB connection string
3. Deploy the backend code
4. Update CORS settings for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Netflix and Amazon Prime Video
- Icons provided by Lucide React
- Sample video content for demonstration purposes
- MongoDB for database solutions
- React community for excellent documentation

## 📞 Support

For support, email support@streamflix.com or create an issue in the repository.

---

**Note**: This is a demonstration project for educational purposes. All content and branding are for showcase only.
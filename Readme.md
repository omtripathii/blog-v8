# Blog-V8 📝

A modern, full-stack Medium-inspired blogging platform built with React, TypeScript, and Cloudflare Workers.

## 📸 Screenshots

<!-- Screenshots will be added here -->

### Homepage
![Homepage Screenshot](path/to/homepage-screenshot.png)

### Blog Feed
![Blog Feed Screenshot](path/to/blog-feed-screenshot.png)

### Blog Reading Experience
![Blog Reading Screenshot](path/to/blog-reading-screenshot.png)

### Blog Writing Interface
![Blog Writing Screenshot](path/to/blog-writing-screenshot.png)

### Mobile Responsive Design
![Mobile Screenshot](path/to/mobile-screenshot.png)

---

## ✨ Features

- **User Authentication**: Secure signup and signin functionality
- **Blog Creation**: Rich text editor for creating and publishing blog posts
- **Blog Reading**: Clean, readable blog post viewing experience
- **User Dashboard**: View all published blogs in a card-based layout
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Feedback**: Toast notifications for user actions
- **Author Profiles**: Display author information with avatars

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Vite** for build tooling

### Backend
- **Cloudflare Workers** for serverless backend
- **Hono** web framework
- **JWT** for authentication
- **Prisma** ORM for database operations
- **PostgreSQL** database

### Shared
- **TypeScript** for type safety
- **Zod** for input validation
- **NPM Workspaces** for monorepo management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Medium
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   
   Create `.env` files in both frontend and backend directories:
   
   **Backend (.env):**
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   JWT_SECRET="your-jwt-secret-key"
   ```

4. **Database Setup**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start Development Servers**
   
   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   
   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

## 📁 Project Structure

```
Medium/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── config.ts       # Configuration file
│   └── package.json
├── backend/                 # Cloudflare Workers backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   └── middleware/     # Authentication middleware
│   └── package.json
├── common/                  # Shared types and utilities
│   └── package.json
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/signin` - User login

### Blogs
- `GET /api/v1/blog/bulk` - Get all blogs
- `GET /api/v1/blog/:id` - Get specific blog
- `POST /api/v1/blog/create` - Create new blog
- `GET /api/v1/blog/userDetails` - Get user details

## 📱 Key Features

### User Authentication
- Secure JWT-based authentication
- Protected routes and API endpoints
- Automatic token validation and refresh

### Blog Management
- Create rich text blog posts
- Real-time preview while writing
- Publish blogs with validation
- View all published blogs in a feed

### User Experience
- Clean, Medium-inspired UI
- Responsive design for all devices
- Loading states and error handling
- Success notifications for actions


## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist folder to your hosting service
```

### Backend (Cloudflare Workers)
```bash
cd backend
npm run deploy
```

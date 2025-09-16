# MERN Stack Starter Kit

Modern, full-stack web application starter kit with React frontend and TypeScript Express.js backend. Ready to run with Docker Compose in a single command!

## 🚀 Quick Start

### Prerequisites

- **Docker** (v20.10 or higher)
- **Docker Compose** (v2.0 or higher)
- **Node.js** (v22 or higher)

### One-Command Setup

```bash
# Clone the repository
git clone https://github.com/yilmazemrepala/mern-starter
cd mern-starter

# Install dependencies for both frontend and backend
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Start the entire application stack
docker-compose up
```

That's it! The application will be available at:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: http://localhost:27017

## 🛠️ Tech Stack Overview

### Frontend

- **React 19** with TypeScript
- **Vite 6** for lightning-fast development
- **Tailwind CSS v4** for styling
- **Shadcn/UI** components with Radix UI primitives
- **React Router v7** for navigation

### Backend

- **Node.js 20** with TypeScript
- **Express.js 5** web framework
- **MongoDB 7.0** with Mongoose ODM
- **JWT** authentication
- **Docker** containerization

## 📁 Project Structure

```
mern-starter/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── README.md     # Frontend documentation
├── backend/          # Express.js backend API
│   ├── src/          # Source code
│   └── README.md     # Backend documentation
├── docker-compose.yml # Multi-container orchestration
└── README.md         # This file
```

## 🔧 Port Configuration

- **Frontend (React + Nginx)**: Port 3000
- **Backend (Express.js)**: Port 3001
- **MongoDB**: Port 27017

## 🗄️ Database Connection

### MongoDB Compass

Connect to your database using MongoDB Compass:

```
mongodb://admin:password123@localhost:27017/mern_starter?authSource=admin
```

## 🚀 Development

### Start Development Environment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🚀 Production Deployment

### Build for Production

#### Frontend Build

```bash
cd frontend
npm run build
```

This command creates production-ready static files in the `dist/` folder.

#### Backend Build

```bash
cd backend
npm install --production
npm run build
```

**Important**: For the backend, you need to run `npm install` in the production environment to install `node_modules`. This is required for production dependencies to be installed.

### Deployment

After the build processes are completed:

1. **Frontend**: Upload the files from the `frontend/dist/` folder to your web server
2. **Backend**: Upload the built files from the `backend/dist/` folder and the `node_modules` folder to your server

### Production Environment Variables

Set the following environment variables for the backend in production:

```bash
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-production-jwt-secret
```

### Local Development (Without Docker)

If you prefer to run the application locally without Docker:

#### Backend Setup

```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### MongoDB Setup

- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URI` in `backend/.env` file

**Note**: Make sure MongoDB is running before starting the backend.

For detailed setup instructions, see individual README files in `frontend/` and `backend/` directories.

## 📚 Documentation

- **[Frontend Documentation](./frontend/README.md)** - React, TypeScript, Tailwind CSS, Shadcn/UI setup and features
- **[Backend Documentation](./backend/README.md)** - Express.js, MongoDB, JWT authentication, and API endpoints

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin only)

## 🐛 Troubleshooting

### Common Issues

1. **Port Conflicts**: Check if ports 3000, 3001, or 27017 are already in use
2. **MongoDB Connection**: Ensure MongoDB container is running
3. **CORS Errors**: Verify frontend and backend are running on correct ports

For detailed troubleshooting, see the individual README files in each directory.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_Made with ❤️ by Yilmaz Emre Pala_  
Linkedin: [Yilmaz Emre Pala](https://www.linkedin.com/in/yilmazemrepala/)

# MERN Stack Backend

TypeScript Express.js backend with MVC architecture for MERN stack starter kit.

## 🚀 Features

- **TypeScript** - Type-safe development with strict mode
- **Express.js 5** - Fast, unopinionated web framework
- **MongoDB 7.0** - NoSQL database with Mongoose ODM
- **JWT Authentication** - Secure user authentication and authorization
- **MVC Architecture** - Clean, maintainable code organization
- **Error Handling** - Comprehensive error handling middleware
- **Input Validation** - Request validation and sanitization
- **CORS** - Cross-origin resource sharing configuration
- **Morgan** - HTTP request logger middleware
- **Helmet** - Security middleware for Express
- **bcryptjs** - Password hashing and verification
- **Environment Variables** - Flexible configuration management
- **Docker Support** - Containerized deployment ready

## 🏗️ Project Structure

```
src/
├── config/          # Database and other configurations
│   └── database.ts  # MongoDB connection setup
├── controllers/     # Route controllers (business logic)
│   ├── auth.controller.ts    # Authentication logic
│   └── user.controller.ts    # User management logic
├── middleware/      # Custom middleware functions
│   ├── auth.ts      # JWT authentication middleware
│   ├── errorHandler.ts  # Error handling middleware
│   └── notFound.ts  # 404 handler middleware
├── models/          # Database models
│   └── User.ts      # User schema and model
├── routes/          # API routes
│   ├── auth.routes.ts    # Authentication routes
│   ├── user.routes.ts    # User management routes
│   └── index.routes.ts   # Main router
├── types/           # TypeScript type definitions
│   └── index.ts     # Common type definitions
├── utils/           # Utility functions
│   └── jwt.ts       # JWT token utilities
└── index.ts         # Application entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v22 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
```

3. **Update the `.env` file with your configuration:**

```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://admin:password123@mongodb:27017/mern_starter?authSource=admin
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Development

**Start the development server:**

```bash
npm run dev
```

The server will start on `http://localhost:3001` with hot reload enabled.

**Production build:**

```bash
npm run build
npm start
```

The build process compiles TypeScript files to JavaScript and outputs them to the `dist/` folder in CommonJS format.

### Local Development (Without Docker)

If you're running the backend locally without Docker:

1. **Install MongoDB locally** or use MongoDB Atlas
2. **Update `.env` file** with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mern_starter
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🗄️ Database Configuration

### MongoDB Connection

The backend connects to MongoDB using Mongoose ODM. Configuration is handled in `src/config/database.ts`.

**Connection String Format:**

```
mongodb://[username]:[password]@[host]:[port]/[database]?authSource=[authSource]
```

### MongoDB Compass Connection

To visually manage your database using MongoDB Compass:

1. **Open MongoDB Compass**
2. Enter the following URI in the **Connection String** field:
   ```
   mongodb://admin:password123@localhost:27017/mern_starter?authSource=admin
   ```
3. Click the **Connect** button

### Connection Details:

- **Host**: `localhost`
- **Port**: `27017`
- **Username**: `admin`
- **Password**: `password123`
- **Database**: `mern_starter`
- **Auth Source**: `admin`

### Database Structure:

- **Collection**: `users` - User information
- **Collection**: `sessions` - Session information (if any)

## 🌐 Web Server Support

### Nginx Configuration

For production deployment with Nginx, use this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache Configuration

For Apache web server, use this configuration:

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html

    # API Proxy
    ProxyPreserveHost On
    ProxyPass /api http://localhost:3001/api
    ProxyPassReverse /api http://localhost:3001/api

    # Frontend
    <Directory /var/www/html>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## 🔧 Port Configuration

- **Development Server**: `http://localhost:3001`
- **Docker Container**: `http://localhost:3001` (mapped from container port 3001)
- **Frontend Connection**: The frontend connects to backend via `VITE_API_URL=http://localhost:3001/api`
- **MongoDB**: `mongodb://localhost:27017/mern_starter` (Docker: `mongodb://mern-mongodb:27017/mern_starter`)

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `DELETE /api/users/:id` - Delete user (admin only)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### JWT Configuration

- **Secret**: Set in `JWT_SECRET` environment variable
- **Expiration**: Set in `JWT_EXPIRE` environment variable (default: 7d)
- **Algorithm**: HS256

## 📊 Error Handling

The API returns consistent error responses:

```json
{
	"success": false,
	"message": "Error message",
	"error": "Detailed error information (development only)"
}
```

### Error Types

- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Authentication required
- **403 Forbidden** - Insufficient permissions
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

## 🛡️ Security Features

- **Password Hashing** - bcryptjs with configurable rounds
- **JWT Tokens** - Secure authentication tokens
- **CORS** - Configurable cross-origin resource sharing
- **Helmet** - Security headers and protection
- **Input Validation** - Request data validation and sanitization
- **Rate Limiting** - Request rate limiting (configurable)

## 🐳 Docker Support

### Dockerfile

The backend includes a production-ready Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### Docker Compose

```yaml
backend:
  build: ./backend
  ports:
    - "3001:3001"
  environment:
    - NODE_ENV=production
    - MONGODB_URI=mongodb://mongodb:27017/mern_starter
  depends_on:
    - mongodb
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use (EADDRINUSE)**

   - Check if another process is using port 3001: `lsof -i :3001`
   - Kill the process or change the PORT in `.env`
   - Ensure Docker containers are stopped: `docker-compose down`

2. **MongoDB connection failed**

   - Verify MongoDB is running: `docker ps` (for Docker) or `brew services list` (for local)
   - Check `MONGODB_URI` in `.env` file
   - For Docker: Use `mongodb://mern-mongodb:27017/mern_starter`
   - For local: Use `mongodb://localhost:27017/mern_starter`

3. **CORS errors from frontend**

   - Verify `CLIENT_URL` in `.env` matches frontend URL
   - Check if frontend is running on the correct port (3000)
   - Ensure CORS middleware is properly configured

4. **JWT authentication issues**
   - Verify `JWT_SECRET` is set in `.env`
   - Check token format in Authorization header: `Bearer <token>`
   - Ensure token hasn't expired (check `JWT_EXPIRE` setting)

## 📝 Environment Variables

| Variable      | Description               | Default               | Required |
| ------------- | ------------------------- | --------------------- | -------- |
| `PORT`        | Server port               | 3001                  | Yes      |
| `NODE_ENV`    | Environment mode          | development           | Yes      |
| `MONGODB_URI` | MongoDB connection string | -                     | Yes      |
| `JWT_SECRET`  | JWT secret key            | -                     | Yes      |
| `JWT_EXPIRE`  | JWT expiration time       | 7d                    | No       |
| `CLIENT_URL`  | Frontend URL for CORS     | http://localhost:3000 | Yes      |

# MERN Stack Frontend

Modern React frontend application built with TypeScript, Vite, Tailwind CSS v4, and Shadcn/UI components for the MERN stack starter kit.

## 🚀 Features

- **React 19** - Latest React with modern features and concurrent rendering
- **TypeScript** - Type-safe development with strict mode enabled
- **Vite 6** - Lightning-fast build tool and development server
- **Tailwind CSS v4** - Utility-first CSS framework for rapid UI development
- **Shadcn/UI** - Beautiful, accessible UI components built on Radix UI
- **React Router v7** - Declarative routing for single-page applications
- **Responsive Design** - Mobile-first approach with responsive layouts
- **Hot Module Replacement** - Instant updates during development
- **Dynamic Title Management** - SEO-optimized page titles and meta tags
- **React Snap Integration** - Static site generation for better SEO performance
- **SEO Optimization** - robots.txt and sitemap.xml for search engine crawling
- **404 Error Handling** - Custom 404 page with proper SEO meta tags
- **Component Library** - Reusable UI components with consistent design
- **Type Safety** - Full TypeScript support across the entire application

## 🛠️ Tech Stack

### Core Technologies

| Technology     | Version | Purpose                                    |
| -------------- | ------- | ------------------------------------------ |
| **React**      | ^19.1.0 | Modern UI library with concurrent features |
| **TypeScript** | ~5.8.3  | Static type checking and enhanced DX       |
| **Vite**       | ^6.3.5  | Next-generation build tool and dev server  |

### UI and Styling

| Technology       | Version  | Purpose                            |
| ---------------- | -------- | ---------------------------------- |
| **Tailwind CSS** | ^4.1.8   | Utility-first CSS framework        |
| **Shadcn/UI**    | Latest   | Accessible UI component library    |
| **Radix UI**     | ^1.2.3   | Unstyled, accessible UI primitives |
| **Lucide React** | ^0.513.0 | Beautiful icon library             |

### Routing and State

| Technology           | Version  | Purpose                             |
| -------------------- | -------- | ----------------------------------- |
| **React Router DOM** | ^7.6.2   | Client-side routing                 |
| **React Context**    | Built-in | State management for authentication |

### Development Tools

| Technology     | Version | Purpose                           |
| -------------- | ------- | --------------------------------- |
| **ESLint**     | ^9.17.0 | Code linting and quality          |
| **TypeScript** | ~5.8.3  | Static type checking              |
| **Vite**       | ^6.3.5  | Development server and build tool |
| **React Snap** | ^1.23.0 | Static site generation for SEO    |

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── Header.tsx      # Main header component
│   ├── Footer.tsx      # Footer component
│   └── login-form.tsx  # Login form component
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
│   └── useDocumentMeta.ts # Document title and meta management
├── lib/                # Utility libraries
│   ├── api.ts          # API client configuration
│   └── utils.ts        # Utility functions
├── pages/              # Page components
│   ├── Home.tsx        # Home page
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── Dashboard.tsx   # Dashboard page
│   ├── About.tsx       # About page
│   └── NotFound.tsx    # 404 error page
├── services/           # API services
│   ├── authService.ts  # Authentication API calls
│   └── userService.ts  # User management API calls
├── types/              # TypeScript type definitions
│   └── api.ts          # API response types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports

public/
├── robots.txt          # Search engine crawling rules
├── sitemap.xml         # Site structure for search engines
├── vite.svg           # Vite logo
└── _redirects         # Netlify redirects (if using Netlify)
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v20 or higher)
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

3. **Update the `.env` file:**

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME="MERN Starter Kit"
VITE_APP_VERSION="1.0.0"
```

### Development

**Start the development server:**

```bash
npm run dev
```

The development server will start on `http://localhost:3000` with hot module replacement enabled.

**Build for production:**

```bash
npm run build
```

**Build with React Snap (SEO optimized):**

```bash
npm run build:snap
```

**Preview production build:**

```bash
npm run preview
```

### Local Development (Without Docker)

If you're running the frontend locally without Docker:

1. **Make sure the backend is running** on `http://localhost:3001`
2. **Update `.env` file** if needed:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🎨 UI Components

### Shadcn/UI Integration

This project uses Shadcn/UI components built on Radix UI primitives:

- **Button** - Versatile button component with multiple variants
- **Card** - Container component for content organization
- **Input** - Form input component with validation states
- **Avatar** - User profile image component
- **Dropdown Menu** - Contextual menu component

### Custom Components

- **Header** - Main navigation header with authentication state
- **Footer** - Site footer with links and information
- **Login Form** - Authentication form with validation
- **Dashboard** - Protected user dashboard

## 🔧 Configuration

### Vite Configuration

The project uses Vite 6 with optimized configuration:

```typescript
// vite.config.ts
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		host: true,
	},
	build: {
		outDir: "dist",
		sourcemap: false,
	},
});
```

### Tailwind CSS v4

Modern Tailwind CSS v4 with new features:

```css
/* index.css */
@import "tailwindcss";

@theme {
	--color-primary: #3b82f6;
	--color-secondary: #64748b;
}
```

### TypeScript Configuration

Strict TypeScript configuration for type safety:

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"useDefineForClassFields": true,
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"skipLibCheck": true,
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx",
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true
	}
}
```

## 🔌 API Integration

### Authentication Service

```typescript
// services/authService.ts
export const authService = {
	login: async (credentials: LoginCredentials) => {
		const response = await api.post("/auth/login", credentials);
		return response.data;
	},
	register: async (userData: RegisterData) => {
		const response = await api.post("/auth/register", userData);
		return response.data;
	},
};
```

### API Client Configuration

```typescript
// lib/api.ts
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
```

## 🎯 Features in Detail

### Dynamic Title Management

Custom hook for managing document titles and meta tags:

```typescript
// hooks/useDocumentMeta.ts
export const useDocumentMeta = (title: string, description?: string) => {
	useEffect(() => {
		document.title = title;
		if (description) {
			const metaDescription = document.querySelector(
				'meta[name="description"]'
			);
			if (metaDescription) {
				metaDescription.setAttribute("content", description);
			}
		}
	}, [title, description]);
};
```

### Authentication Context

Global authentication state management:

```typescript
// contexts/AuthContext.tsx
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Authentication logic...
};
```

### Responsive Design

Mobile-first responsive design with Tailwind CSS:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	<Card className="p-4">
		<h3 className="text-lg font-semibold">Responsive Card</h3>
	</Card>
</div>
```

## 🐳 Docker Support

### Dockerfile

Production-ready Dockerfile with Nginx:

```dockerfile
# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔍 SEO Optimization

### Search Engine Optimization

This project includes comprehensive SEO features for better search engine visibility:

#### robots.txt

- **Location**: `/public/robots.txt`
- **Purpose**: Controls search engine crawling behavior
- **Features**:
  - Allows crawling of public pages (`/`, `/about`, `/login`, `/register`, `/example-components`)
  - Blocks admin areas (`/dashboard`, `/api/`, `/admin/`)
  - Includes sitemap reference
  - Respectful crawl delay

#### sitemap.xml

- **Location**: `/public/sitemap.xml`
- **Purpose**: Provides site structure to search engines
- **Features**:
  - All public pages included
  - Priority and change frequency settings
  - Last modification dates
  - XML format for easy parsing

#### 404 Error Handling

- **Custom 404 Page**: `src/pages/NotFound.tsx`
- **SEO Optimized**: Proper meta tags with "404" in title
- **User Friendly**: Clear navigation options
- **Search Engine Friendly**: `noindex, nofollow` meta tags

#### Dynamic Meta Tags

- **Page-specific titles** and descriptions
- **Open Graph tags** for social media sharing
- **Twitter Card support**
- **Canonical URLs** for duplicate content prevention
- **Robots directives** per page

### SEO Best Practices

```typescript
// Example: SEO-optimized page
useDocumentMeta({
	title: "About Us",
	description: "Learn about our company and mission",
	keywords: ["about", "company", "mission"],
	siteName: "MERN Starter",
	robots: "index, follow",
	canonical: window.location.href,
});
```

## 🚀 Performance Optimizations

### React Snap Integration

This project includes React Snap for static site generation, improving SEO performance:

```json
// package.json
{
	"scripts": {
		"build": "vite build",
		"postbuild": "react-snap",
		"build:snap": "vite build && react-snap"
	},
	"reactSnap": {
		"source": "dist",
		"include": ["/", "/about", "/dashboard", "/login", "/register"],
		"skipThirdPartyRequests": true,
		"cacheAjaxRequests": false,
		"preloadImages": false,
		"minifyHtml": {
			"collapseWhitespace": false,
			"removeComments": false
		},
		"puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"]
	}
}
```

**Benefits of React Snap:**

- **SEO Optimization** - Pre-rendered HTML for better search engine crawling
- **Faster Initial Load** - Static HTML loads immediately
- **Social Media Sharing** - Proper meta tags for social platforms
- **Progressive Enhancement** - Works without JavaScript

### Code Splitting

Automatic code splitting with React.lazy:

```typescript
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
```

### Bundle Optimization

- **Tree Shaking** - Unused code elimination
- **Minification** - Code compression for production
- **Asset Optimization** - Image and font optimization
- **Caching** - Browser caching strategies
- **Static Generation** - Pre-rendered pages for better SEO

## 🐛 Troubleshooting

### Common Issues

1. **Vite Dev Server Not Starting**

   - Check if port 3000 is available
   - Verify Node.js version (v18+)
   - Clear node_modules and reinstall

2. **TypeScript Errors**

   - Run `npm run build` to check for type errors
   - Ensure all dependencies are properly typed
   - Check tsconfig.json configuration

3. **Tailwind CSS Not Working**

   - Verify Tailwind CSS v4 installation
   - Check import statements in index.css
   - Ensure proper configuration in vite.config.ts

4. **API Connection Issues**

   - Verify VITE_API_URL in .env file
   - Check if backend server is running
   - Ensure CORS is properly configured

5. **React Snap Build Issues**
   - Ensure Puppeteer is properly installed
   - Check if all routes are accessible during build
   - Verify React Snap configuration in package.json
   - For Docker builds, add `--no-sandbox` flag to puppeteerArgs

## 📝 Environment Variables

| Variable           | Description         | Default                   | Required |
| ------------------ | ------------------- | ------------------------- | -------- |
| `VITE_API_URL`     | Backend API URL     | http://localhost:3001/api | Yes      |
| `VITE_APP_NAME`    | Application name    | MERN Starter Kit          | No       |
| `VITE_APP_VERSION` | Application version | 1.0.0                     | No       |

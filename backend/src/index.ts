import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import router from "./routes/index.routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT!!;
const clientURL = process.env.CLIENT_URL!!;

// Connect to MongoDB
connectDB();

// Middleware
// Morgan HTTP request logger
app.use(morgan("combined"));

// Helmet security configuration
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
				fontSrc: ["'self'", "https://fonts.gstatic.com"],
				imgSrc: ["'self'", "data:", "https:"],
				scriptSrc: ["'self'"],
				connectSrc: ["'self'", clientURL],
				frameSrc: ["'none'"],
				objectSrc: ["'none'"],
				mediaSrc: ["'self'"],
				manifestSrc: ["'self'"],
			},
		},
		crossOriginEmbedderPolicy: false,
		hsts: {
			maxAge: 31536000, // 1 year
			includeSubDomains: true,
			preload: true,
		},
		frameguard: {
			action: "deny",
		},
		noSniff: true,
		xssFilter: true,
		referrerPolicy: {
			policy: "strict-origin-when-cross-origin",
		},
	})
);
app.use(
	cors({
		origin: [clientURL],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
		preflightContinue: false,
		optionsSuccessStatus: 200,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
	res.json({ message: "MERN Starter API is running!" });
});

// ALL API Routes
app.use("/api", router);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

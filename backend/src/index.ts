import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();
const PORT = parseInt(env.PORT, 10);

// Middleware
app.use(cors({
  origin: env.FRONTEND_URL || process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Backend API is running!' });
});

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


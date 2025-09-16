import { Request } from 'express';
import { Document } from 'mongoose';

// User interface
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Auth request interface
export interface AuthRequest extends Request {
  user?: IUser;
}

// API Response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register data
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// JWT Payload
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}
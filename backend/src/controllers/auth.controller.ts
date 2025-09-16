import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { ApiResponse, LoginCredentials, RegisterData, AuthRequest } from '../types';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password }: RegisterData = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      } as ApiResponse);
      return;
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginCredentials = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      } as ApiResponse);
      return;
    }

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      } as ApiResponse);
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      } as ApiResponse);
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      } as ApiResponse);
      return;
    }

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token
      }
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: 'User logged out successfully'
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during logout',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    
    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: { user }
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving user profile',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};
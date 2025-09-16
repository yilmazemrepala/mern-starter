import { Response } from 'express';
import User from '../models/User';
import { ApiResponse, AuthRequest } from '../types';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving users',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: { user }
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving user',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const userId = req.user?._id;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'Email is already taken'
        } as ApiResponse);
        return;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse);
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating profile',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse);
      return;
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user?._id.toString()) {
      res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      } as ApiResponse);
      return;
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    } as ApiResponse);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting user',
      error: error instanceof Error ? error.message : 'Unknown error'
    } as ApiResponse);
  }
};
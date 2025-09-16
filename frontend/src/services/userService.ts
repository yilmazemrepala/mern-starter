import { apiClient, API_ENDPOINTS } from '../lib/api';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ApiResponse,
  PaginatedResponse,
  QueryParams,
} from '../types/api';

class UserService {
  // Get all users
  async getAllUsers(params?: QueryParams): Promise<PaginatedResponse<User>> {
    const queryString = params ? new URLSearchParams(params as Record<string, string>).toString() : '';
    const endpoint = queryString ? `${API_ENDPOINTS.USERS.GET_ALL}?${queryString}` : API_ENDPOINTS.USERS.GET_ALL;
    
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User>>>(endpoint);
    return response.data!;
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.GET_BY_ID(id)
    );
    return response.data!;
  }

  // Create user
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>(
      API_ENDPOINTS.USERS.GET_ALL,
      userData
    );
    return response.data!;
  }

  // Update user
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(
      API_ENDPOINTS.USERS.UPDATE(id),
      userData
    );
    return response.data!;
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.USERS.DELETE(id)
    );
  }

  // Get current user profile
  async getCurrentUserProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/users/profile');
    return response.data!;
  }

  // Update current user profile
  async updateCurrentUserProfile(userData: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>('/users/profile', userData);
    return response.data!;
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.put<ApiResponse<void>>('/users/change-password', {
      currentPassword,
      newPassword,
    });
  }
}

export const userService = new UserService();
export default userService;
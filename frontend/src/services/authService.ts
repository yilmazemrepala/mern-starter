import { apiClient, API_ENDPOINTS } from "../lib/api";
import {
	LoginRequest,
	RegisterRequest,
	AuthResponse,
	ApiResponse,
} from "../types/api";

class AuthService {
	// Login
	async login(credentials: LoginRequest): Promise<AuthResponse> {
		const response = await apiClient.post<ApiResponse<AuthResponse>>(
			API_ENDPOINTS.AUTH.LOGIN,
			credentials
		);

		if (response.data) {
			// Save token to localStorage
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("refreshToken", response.data.refreshToken);
			localStorage.setItem("user", JSON.stringify(response.data.user));
		}

		return response.data!;
	}

	// Register
	async register(userData: RegisterRequest): Promise<AuthResponse> {
		const response = await apiClient.post<ApiResponse<AuthResponse>>(
			API_ENDPOINTS.AUTH.REGISTER,
			userData
		);

		if (response.data) {
			// Save token to localStorage
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("refreshToken", response.data.refreshToken);
			localStorage.setItem("user", JSON.stringify(response.data.user));
		}

		return response.data!;
	}

	// Refresh token
	async refreshToken(): Promise<AuthResponse> {
		const refreshToken = localStorage.getItem("refreshToken");
		if (!refreshToken) {
			throw new Error("No refresh token found");
		}

		const response = await apiClient.post<ApiResponse<AuthResponse>>(
			API_ENDPOINTS.AUTH.REFRESH,
			{ refreshToken }
		);

		if (response.data) {
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("refreshToken", response.data.refreshToken);
			localStorage.setItem("user", JSON.stringify(response.data.user));
		}

		return response.data!;
	}

	// Logout
	async logout(): Promise<void> {
		try {
			await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			// Clear localStorage in all cases
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("user");
		}
	}

	// Get current user from localStorage
	getCurrentUser() {
		const userStr = localStorage.getItem("user");
		return userStr ? JSON.parse(userStr) : null;
	}

	// Check if user is authenticated
	isAuthenticated(): boolean {
		return !!localStorage.getItem("token");
	}

	// Get token
	getToken(): string | null {
		return localStorage.getItem("token");
	}

	// Check if user is admin
	isAdmin(): boolean {
		const user = this.getCurrentUser();
		return user?.role === "admin";
	}
}

export const authService = new AuthService();
export default authService;

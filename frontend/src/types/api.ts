// API Response types
export interface ApiResponse<T = unknown> {
	success: boolean;
	message: string;
	data?: T;
}

export interface ApiError {
	success: false;
	message: string;
	error?: string;
}

// User types
export interface User {
	_id: string;
	name: string;
	email: string;
	role: "user" | "admin";
	createdAt: string;
	updatedAt: string;
}

export interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
	role?: "user" | "admin";
}

export interface UpdateUserRequest {
	name?: string;
	email?: string;
	role?: "user" | "admin";
}

// Auth types
export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	user: User;
	token: string;
	refreshToken: string;
}

// Generic types
export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		pages: number;
	};
}

export interface QueryParams {
	page?: number;
	limit?: number;
	search?: string;
	sort?: string;
	order?: "asc" | "desc";
}

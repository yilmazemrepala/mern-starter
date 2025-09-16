const API_BASE_URL = import.meta.env.VITE_API_URL!;

class ApiClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const config: RequestInit = {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		// Add token to header if exists
		const token = localStorage.getItem("token");
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message || `HTTP error! status: ${response.status}`
				);
			}

			return await response.json();
		} catch (error) {
			console.error("API request failed:", error);
			throw error;
		}
	}

	// GET request
	async get<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: "GET" });
	}

	// POST request
	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	// PUT request
	async put<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "PUT",
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	// DELETE request
	async delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: "DELETE" });
	}
}

// API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// API endpoints
export const API_ENDPOINTS = {
	// Auth endpoints
	AUTH: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		REFRESH: "/auth/refresh",
		LOGOUT: "/auth/logout",
	},
	// User endpoints
	USERS: {
		GET_ALL: "/users",
		GET_BY_ID: (id: string) => `/users/${id}`,
		UPDATE: (id: string) => `/users/${id}`,
		DELETE: (id: string) => `/users/${id}`,
	},
} as const;

export default apiClient;

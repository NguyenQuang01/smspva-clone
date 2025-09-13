import axios from "axios";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://14.225.205.10:9090/api/";

// Token storage utilities
const TokenStorage = {
  getAccessToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },
  getRefreshToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken");
    }
    return null;
  },
  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  },
  clearTokens: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  },
};

// Create instance
const apiConfig = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// Process failed requests queue
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor to add authorization header
apiConfig.interceptors.request.use(
  (config: any) => {
    const token = TokenStorage.getAccessToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiConfig.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiConfig(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = TokenStorage.getRefreshToken();

      if (!refreshToken) {
        TokenStorage.clearTokens();
        processQueue(error, null);
        isRefreshing = false;
        // Redirect to login page or handle unauthorized access
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        return Promise.reject(error);
      }

      try {
        // Call refresh token API
        const refreshResponse = await axios.post(`${apiUrl}users/refresh`, {
          refreshToken: refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;

        // Update stored tokens
        TokenStorage.setTokens(accessToken, newRefreshToken);

        // Update the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Process queued requests
        processQueue(null, accessToken);

        // Retry the original request
        return apiConfig(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        TokenStorage.clearTokens();
        processQueue(refreshError, null);

        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const apiServices = {
  post(urlApi: string, params?: any) {
    return apiConfig
      .post(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  put(urlApi: string, params?: any) {
    return apiConfig
      .put(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  patch(urlApi: string, params?: any) {
    return apiConfig
      .patch(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  get(urlApi: string, params?: any) {
    return apiConfig
      .get(urlApi, { params })
      .then((response) => response)
      .catch((error) => error);
  },
  delete(urlApi: string) {
    return apiConfig
      .delete(urlApi)
      .then((response) => response)
      .catch((error) => error);
  },
  postMultipart(urlApi: string, params?: any, urlParam?: string) {
    const instance = axios.create({
      baseURL: urlParam || apiUrl,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 10000,
    });

    return instance
      .post(urlApi, params)
      .then((response) => response)
      .catch((error) => error);
  },
  // Token management methods
  setTokens: (accessToken: string, refreshToken: string) => {
    TokenStorage.setTokens(accessToken, refreshToken);
  },
  clearTokens: () => {
    TokenStorage.clearTokens();
  },
  getAccessToken: () => {
    return TokenStorage.getAccessToken();
  },
  getRefreshToken: () => {
    return TokenStorage.getRefreshToken();
  },
  // Login method that handles token storage
  login: async (credentials: { username: string; password: string }) => {
    try {
      const response = await apiConfig.post("/users/login", credentials);

      if (response.data?.accessToken && response.data?.refreshToken) {
        TokenStorage.setTokens(response.data.accessToken, response.data.refreshToken);
      }

      return response;
    } catch (error) {
      return error;
    }
  },
  // Logout method that clears tokens
  logout: () => {
    TokenStorage.clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
  },
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!TokenStorage.getAccessToken();
  },
  // Manual refresh token method
  refreshToken: async () => {
    try {
      const refreshToken = TokenStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(`${apiUrl}users/refresh`, {
        refreshToken: refreshToken,
      });

      if (response.data?.accessToken && response.data?.refreshToken) {
        TokenStorage.setTokens(response.data.accessToken, response.data.refreshToken);
        return response.data;
      }

      throw new Error("Invalid refresh response");
    } catch (error) {
      TokenStorage.clearTokens();
      throw error;
    }
  },
};
export default apiServices;

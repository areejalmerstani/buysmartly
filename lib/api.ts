import axios from "axios";

export const apiClient = axios.create({
                                          baseURL: process.env.NEXT_PUBLIC_API_URL,
                                          timeout: 10000,
                                          headers: {
                                              "Content-Type": "application/json",
                                          },
                                      });

// Attach JWT token to every request automatically
apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Handle 401 — token expired
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Will handle redirect to login in Phase 2
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Typed API calls
export const api = {
    search: (params: Record<string, unknown>) =>
        apiClient.get("/search", { params }),
    getProduct: (id: string) =>
        apiClient.get(`/products/${id}`),
    getWishlist: () =>
        apiClient.get("/wishlist"),
    addToWishlist: (productId: string) =>
        apiClient.post("/wishlist", { productId }),
    removeFromWishlist: (productId: string) =>
        apiClient.delete(`/wishlist/${productId}`),
    getDeals: () =>
        apiClient.get("/recommendations/deals"),
};
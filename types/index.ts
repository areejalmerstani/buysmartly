// The normalized product shape from your Normalization service
export interface Product {
    id: string;
    title: string;
    description: string;
    image: string;
    normalizedTitle: string;
    price: number;
    originalPrice?: number;
    currency: string;
    rating: number;
    reviewCount: number;
    retailer: "amazon" | "ebay" | "aliexpress" | "noon" | "walmart";
    url: string;
    affiliateUrl: string;
    delivery?: string;
    deliveryEstimate: string;
    inStock: boolean;
    category: string;
    availability: "in_stock" | "out_of_stock"
    coupon?: ProductCoupon;
}

export interface ProductCoupon {
    badge: string;
    code?: string;
    description?: string;
    expiresAt?: string;
    isActive?: boolean;
}


// Search response from the Search service
export interface SearchResponse {
    results: Product[];
    total: number;
    page: number;
    pageSize: number;
    query: string;
}

// Search filters (map to query params)
export interface SearchFilters {
    q: string;
    retailer?: Product["retailer"][];
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sortBy?: "price_asc" | "price_desc" | "rating" | "relevance";
    page?: number;
}

// Auth
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: "user" | "admin";
}

export interface AuthToken {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

// Wishlist
export interface WishlistItem {
    id: string;
    product: Product;
    addedAt: string;
}

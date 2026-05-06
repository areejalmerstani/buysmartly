"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ProductCard } from "./ProductCard";
import { SearchSkeleton } from "./SearchSkeleton";
import { PackageSearch } from "lucide-react";
import type { SearchResponse } from "@/types";

interface SearchResultsProps {
    params: {
        q?: string;
        retailer?: string;
        minPrice?: string;
        maxPrice?: string;
        sortBy?: string;
        page?: string;
    };
}

export function SearchResults({ params }: SearchResultsProps) {
    const { q, retailer, minPrice, maxPrice, sortBy, page } = params;

    const { data, isLoading, isError } = useQuery<SearchResponse>({
                                                                      queryKey: ["search", q, retailer, minPrice, maxPrice, sortBy, page],
                                                                      queryFn: async () => {
                                                                          const res = await api.search({
                                                                                                           q,
                                                                                                           retailer,
                                                                                                           minPrice,
                                                                                                           maxPrice,
                                                                                                           sortBy,
                                                                                                           page: page ?? 1,
                                                                                                       });
                                                                          return res.data;
                                                                      },
                                                                      enabled: !!q,
                                                                  });

    if (!q) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
                <PackageSearch className="h-12 w-12" />
                <p className="text-lg font-medium">Enter a search term to get started</p>
                <p className="text-sm">Try searching for a product name, brand, or category</p>
            </div>
        );
    }

    if (isLoading) return <SearchSkeleton />;

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
                <p className="text-lg font-medium">Something went wrong</p>
                <p className="text-sm">Could not fetch results. Please try again.</p>
            </div>
        );
    }

    if (!data?.results?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
                <PackageSearch className="h-12 w-12" />
                <p className="text-lg font-medium">No results found for "{q}"</p>
                <p className="text-sm">Try different keywords or remove some filters</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
                {data.total.toLocaleString()} results found
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../application/search-products";
import type { SearchQuery, SearchResponse } from "../domain/search";
import { mockSearchRepository } from "../infrastructure/mock-search-repository";

interface UseProductSearchOptions {
  enabled?: boolean;
}

export function useProductSearch(query: SearchQuery, options?: UseProductSearchOptions) {
  return useQuery<SearchResponse>({
    queryKey: ["search", query],
    queryFn: () => searchProducts(mockSearchRepository, query),
    enabled: options?.enabled ?? query.q.length > 0,
  });
}

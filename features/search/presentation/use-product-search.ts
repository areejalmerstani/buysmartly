"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../application/search-products";
import type { SearchQuery, SearchResponse } from "../domain/search";
import { mockSearchRepository } from "../infrastructure/mock-search-repository";

export function useProductSearch(query: SearchQuery) {
  return useQuery<SearchResponse>({
    queryKey: ["search", query],
    queryFn: () => searchProducts(mockSearchRepository, query),
    enabled: query.q.length > 0,
  });
}

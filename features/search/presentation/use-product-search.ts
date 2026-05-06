"use client";

import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../application/search-products";
import type { SearchQuery, SearchResponse } from "../domain/search";
import { httpSearchRepository } from "../infrastructure/http-search-repository";

export function useProductSearch(query: SearchQuery) {
  return useQuery<SearchResponse>({
    queryKey: ["search", query],
    queryFn: () => searchProducts(httpSearchRepository, query),
    enabled: query.q.length > 0,
  });
}

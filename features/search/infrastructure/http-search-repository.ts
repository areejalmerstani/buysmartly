import { apiClient } from "@/lib/api";
import type { SearchQuery, SearchResponse } from "../domain/search";
import { toSearchApiParams } from "../domain/search";
import type { SearchRepository } from "../domain/search-repository";

export const httpSearchRepository: SearchRepository = {
  async search(query: SearchQuery): Promise<SearchResponse> {
    const response = await apiClient.get<SearchResponse>("/search", {
      params: toSearchApiParams(query),
    });

    return response.data;
  },
};

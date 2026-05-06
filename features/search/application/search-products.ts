import type { SearchQuery, SearchResponse } from "../domain/search";
import type { SearchRepository } from "../domain/search-repository";

export function searchProducts(
  repository: SearchRepository,
  query: SearchQuery
): Promise<SearchResponse> {
  return repository.search(query);
}

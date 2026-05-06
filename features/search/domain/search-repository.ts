import type { SearchQuery, SearchResponse } from "./search";

export interface SearchRepository {
  search(query: SearchQuery): Promise<SearchResponse>;
}

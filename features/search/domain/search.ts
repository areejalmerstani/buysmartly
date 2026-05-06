import type { Product, SearchResponse } from "@/types";

export type SearchRetailer = Product["retailer"];

export type SearchSort = "price_asc" | "price_desc" | "rating" | "relevance";

export interface SearchQuery {
  q: string;
  retailer: SearchRetailer[];
  minPrice?: number;
  maxPrice?: number;
  sortBy: SearchSort;
  page: number;
}

export type SearchPageParams = Record<string, string | string[] | undefined>;

export type { SearchResponse };

export const DEFAULT_PRICE_RANGE = [0, 5000] as const;

export const RETAILERS: { id: SearchRetailer; label: string }[] = [
  { id: "amazon", label: "Amazon" },
  { id: "ebay", label: "eBay" },
  { id: "noon", label: "Noon" },
  { id: "aliexpress", label: "AliExpress" },
  { id: "walmart", label: "Walmart" },
];

export const SORT_OPTIONS: { value: SearchSort; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating", label: "Highest rated" },
];

const RETAILER_IDS = new Set<SearchRetailer>(RETAILERS.map((retailer) => retailer.id));
const SORT_IDS = new Set<SearchSort>(SORT_OPTIONS.map((option) => option.value));

export function parseSearchQuery(params: SearchPageParams | URLSearchParams): SearchQuery {
  return {
    q: getParam(params, "q").trim(),
    retailer: parseRetailers(getParam(params, "retailer")),
    minPrice: parseOptionalNumber(getParam(params, "minPrice")),
    maxPrice: parseOptionalNumber(getParam(params, "maxPrice")),
    sortBy: parseSort(getParam(params, "sortBy")),
    page: parsePage(getParam(params, "page")),
  };
}

export function toSearchParams(query: SearchQuery): URLSearchParams {
  const params = new URLSearchParams();

  setParam(params, "q", query.q);
  setParam(params, "retailer", query.retailer.join(","));
  setParam(params, "minPrice", query.minPrice?.toString());
  setParam(params, "maxPrice", query.maxPrice?.toString());
  setParam(params, "sortBy", query.sortBy === "relevance" ? undefined : query.sortBy);
  setParam(params, "page", query.page > 1 ? query.page.toString() : undefined);

  return params;
}

export function toSearchApiParams(query: SearchQuery): Record<string, string | number> {
  const params: Record<string, string | number> = {
    q: query.q,
    sortBy: query.sortBy,
    page: query.page,
  };

  if (query.retailer.length > 0) params.retailer = query.retailer.join(",");
  if (query.minPrice !== undefined) params.minPrice = query.minPrice;
  if (query.maxPrice !== undefined) params.maxPrice = query.maxPrice;

  return params;
}

export function createSearchQuery(q: string): SearchQuery {
  return {
    q: q.trim(),
    retailer: [],
    sortBy: "relevance",
    page: 1,
  };
}

function getParam(params: SearchPageParams | URLSearchParams, key: string): string {
  if (params instanceof URLSearchParams) {
    return params.get(key) ?? "";
  }

  const value = params[key];
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function setParam(params: URLSearchParams, key: string, value?: string): void {
  const trimmedValue = value?.trim();
  if (trimmedValue) params.set(key, trimmedValue);
}

function parseRetailers(value: string): SearchRetailer[] {
  return value
    .split(",")
    .map((retailer) => retailer.trim())
    .filter((retailer): retailer is SearchRetailer => RETAILER_IDS.has(retailer as SearchRetailer));
}

function parseSort(value: string): SearchSort {
  return SORT_IDS.has(value as SearchSort) ? (value as SearchSort) : "relevance";
}

function parseOptionalNumber(value: string): number | undefined {
  if (!value.trim()) return undefined;

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parsePage(value: string): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

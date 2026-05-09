import type { Product } from "@/types";
import type { SearchQuery, SearchResponse } from "../domain/search";
import type { SearchRepository } from "../domain/search-repository";

interface SearchProductsFixture {
  products: Product[];
}

const PAGE_SIZE = 24;

export const mockSearchRepository: SearchRepository = {
  async search(query: SearchQuery): Promise<SearchResponse> {
    const response = await fetch("/data/search-products.json");

    if (!response.ok) {
      throw new Error("Could not load dummy search data");
    }

    const fixture = (await response.json()) as SearchProductsFixture;
    const normalizedTerm = query.q.toLowerCase();

    const filteredProducts = fixture.products
      .filter((product) => matchesSearchTerm(product, normalizedTerm))
      .filter((product) => query.retailer.length === 0 || query.retailer.includes(product.retailer))
      .filter((product) => query.minPrice === undefined || product.price >= query.minPrice)
      .filter((product) => query.maxPrice === undefined || product.price <= query.maxPrice)
      .sort((a, b) => sortProducts(a, b, query.sortBy));

    const start = (query.page - 1) * PAGE_SIZE;
    const results = filteredProducts.slice(start, start + PAGE_SIZE);

    return {
      results,
      total: filteredProducts.length,
      page: query.page,
      pageSize: PAGE_SIZE,
      query: query.q,
    };
  },
};

function matchesSearchTerm(product: Product, term: string): boolean {
  if (!term) return true;

  const searchableText = [
    product.title,
    product.description,
    product.normalizedTitle,
    product.category,
    product.retailer,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(term);
}

function sortProducts(a: Product, b: Product, sortBy: SearchQuery["sortBy"]): number {
  switch (sortBy) {
    case "price_asc":
      return a.price - b.price;
    case "price_desc":
      return b.price - a.price;
    case "rating":
      return b.rating - a.rating;
    case "relevance":
    default:
      return b.rating * 1000 + b.reviewCount - (a.rating * 1000 + a.reviewCount);
  }
}

"use client";

import { ProductCard } from "./ProductCard";
import { SearchSkeleton } from "./SearchSkeleton";
import { MarketplaceTabs } from "./MarketplaceTabs";
import { AlertCircle, PackageSearch, Search } from "lucide-react";
import type { SearchQuery } from "@/features/search/domain/search";
import { useProductSearch } from "@/features/search/presentation/use-product-search";

interface SearchResultsProps {
  query: SearchQuery;
}

export function SearchResults({ query }: SearchResultsProps) {
  const { data, isLoading, isError } = useProductSearch(query);

  if (!query.q) {
    return (
      <div className="rounded-lg border bg-card px-6 py-20 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Search className="h-7 w-7" />
        </div>
        <p className="text-lg font-semibold">Enter a search term to get started</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try searching for a product name, brand, or category.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <MarketplaceTabs query={query} />

      {isLoading ? <SearchSkeleton /> : null}

      {isError ? (
        <div className="rounded-lg border bg-card px-6 py-20 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-destructive/10 text-destructive">
            <AlertCircle className="h-7 w-7" />
          </div>
          <p className="text-lg font-semibold">Something went wrong</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Could not fetch results. Please try again.
          </p>
        </div>
      ) : null}

      {!isLoading && !isError && !data?.results?.length ? (
        <div className="rounded-lg border bg-card px-6 py-20 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <PackageSearch className="h-7 w-7" />
          </div>
          <p className="text-lg font-semibold">No results found for "{query.q}"</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another marketplace tab or remove some filters.
          </p>
        </div>
      ) : null}

      {data?.results?.length ? (
        <>
          <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 shadow-sm">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{data.total.toLocaleString()}</span>{" "}
              results found
            </p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {query.retailer.length === 1 ? "Marketplace filtered" : "All marketplaces"}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {data.results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

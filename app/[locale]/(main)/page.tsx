"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { PackageSearch, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/search/ProductCard";
import { SearchSkeleton } from "@/components/search/SearchSkeleton";
import { RETAILERS, type SearchQuery, type SearchRetailer } from "@/features/search/domain/search";
import { useProductSearch } from "@/features/search/presentation/use-product-search";
import { cn } from "@/lib/utils";

const FEATURED_SEARCHES = ["headphones", "laptop", "watch", "tablet"];

const RETAILER_ACCENTS: Record<SearchRetailer, string> = {
  amazon: "bg-orange-500",
  ebay: "bg-blue-500",
  noon: "bg-yellow-400",
  aliexpress: "bg-red-500",
  walmart: "bg-cyan-500",
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRetailer, setActiveRetailer] = useState<SearchRetailer | "all">("all");
  const deferredSearchTerm = useDeferredValue(searchTerm.trim());

  const query: SearchQuery = {
    q: deferredSearchTerm,
    retailer: activeRetailer === "all" ? [] : [activeRetailer],
    sortBy: "relevance",
    page: 1,
  };

  const { data, isLoading, isError, isFetching } = useProductSearch(query, { enabled: true });
  const products = data?.results ?? [];
  const productTotal = data?.total ?? products.length;
  const hasSearch = searchTerm.trim().length > 0;
  const activeRetailerLabel =
    activeRetailer === "all"
      ? "All marketplaces"
      : (RETAILERS.find((retailer) => retailer.id === activeRetailer)?.label ?? "Selected marketplace");

  function updateRetailer(retailer: SearchRetailer | "all") {
    startTransition(() => {
      setActiveRetailer(retailer);
    });
  }

  function useFeaturedSearch(term: string) {
    startTransition(() => {
      setSearchTerm(term);
      setActiveRetailer("all");
    });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[linear-gradient(180deg,oklch(0.985_0.003_75),oklch(0.96_0.01_75)_38%,oklch(0.985_0.003_75))]">
      <section className="border-b border-border/70 bg-background/75">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,0.55fr)] lg:px-8 lg:py-10">
          <div className="flex flex-col justify-center gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-md border border-border/80 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Live marketplace comparison
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl">
                Search once. Compare the best product offers instantly.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Browse Amazon, Noon, eBay, AliExpress, and Walmart from one responsive dashboard
                built for quick scanning and confident buying.
              </p>
            </div>

            <form
              className="flex w-full max-w-3xl flex-col gap-3 rounded-lg border border-border/80 bg-card p-2 shadow-lg shadow-foreground/5 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder='Search for "headphones", "laptop", or "watch"'
                  className="h-12 rounded-md border-transparent bg-muted/60 pl-9 pr-10 text-base shadow-none transition-colors focus-visible:bg-background"
                  aria-label="Search products"
                />
                {hasSearch ? (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
              <Button type="submit" size="lg" className="h-12 gap-2 px-5 shadow-sm shadow-primary/25">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </form>

            <div className="flex max-w-3xl flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Popular searches</span>
              {FEATURED_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => useFeaturedSearch(term)}
                  className="rounded-md border border-border/80 bg-background px-3 py-1.5 text-sm font-medium capitalize text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <aside className="grid content-center gap-3 rounded-lg border border-border/80 bg-card p-4 shadow-xl shadow-foreground/[0.06]">
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <div>
                <p className="text-sm font-semibold">Marketplace snapshot</p>
                <p className="text-xs text-muted-foreground">Fast filters for cleaner decisions</p>
              </div>
              <div className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                Live
              </div>
            </div>
            <div className="grid gap-2">
              {RETAILERS.slice(0, 4).map((retailer, index) => (
                <button
                  key={retailer.id}
                  type="button"
                  onClick={() => updateRetailer(retailer.id)}
                  className="flex items-center justify-between rounded-md border border-transparent bg-muted/50 p-3 text-left transition-all hover:border-border hover:bg-background"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn("h-9 w-1.5 rounded-full", RETAILER_ACCENTS[retailer.id])}
                    />
                    <span>
                      <span className="block text-sm font-medium">{retailer.label}</span>
                      <span className="block text-xs text-muted-foreground">
                        {index === 0 ? "Fast delivery focus" : "Verified marketplace offers"}
                      </span>
                    </span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">{index + 3} deals</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Product results
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-normal sm:text-3xl">
                {hasSearch ? `Results for "${deferredSearchTerm}"` : "Browse all products"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {activeRetailerLabel} sorted by relevance, rating, and available offers.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border/80 bg-card p-1 shadow-sm">
            <div className="flex max-w-full gap-1 overflow-x-auto">
              <button
                type="button"
                onClick={() => updateRetailer("all")}
                className={cn(
                  "inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium transition-all",
                  activeRetailer === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                All
              </button>
              {RETAILERS.map((retailer) => (
                <button
                  key={retailer.id}
                  type="button"
                  onClick={() => updateRetailer(retailer.id)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium transition-all",
                    activeRetailer === retailer.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className={cn("h-2 w-2 rounded-full", RETAILER_ACCENTS[retailer.id])} />
                  {retailer.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isError ? (
          <div className="rounded-lg border border-border/80 bg-card px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <PackageSearch className="h-7 w-7" />
            </div>
            <p className="text-lg font-semibold">Could not load products</p>
            <p className="mt-1 text-sm text-muted-foreground">Please refresh and try again.</p>
          </div>
        ) : isLoading ? (
          <SearchSkeleton />
        ) : products.length ? (
          <div className="space-y-4">
            <div className="flex flex-col gap-2 rounded-lg border border-border/80 bg-card px-4 py-3 text-sm shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{productTotal.toLocaleString()}</span>{" "}
                products found
              </p>
              <p className="text-xs text-muted-foreground">
                {isFetching ? "Refreshing offers..." : "Updated from marketplace fixtures"}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-border/80 bg-card px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <PackageSearch className="h-7 w-7" />
            </div>
            <p className="text-lg font-semibold">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different product name or switch back to all marketplaces.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

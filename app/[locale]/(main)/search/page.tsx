import { Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchSkeleton } from "@/components/search/SearchSkeleton";
import { parseSearchQuery, type SearchPageParams } from "@/features/search/domain/search";

interface SearchPageProps {
  searchParams: Promise<SearchPageParams>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = parseSearchQuery(await searchParams);

  return (
    <div className="hero-gradient min-h-[calc(100vh-4rem)] bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-lg border border-border/80 bg-card/95 p-5 shadow-sm backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Smart comparison
              </div>
              <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
                {query.q ? `Results for "${query.q}"` : "Search results"}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Comparing prices, delivery, ratings, and availability across Amazon, eBay, Noon,
                AliExpress, and Walmart.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground sm:w-72">
              <div className="rounded-md border border-border/80 bg-background/90 p-3">
                <p className="text-base font-semibold text-foreground">5</p>
                <p>retailers</p>
              </div>
              <div className="rounded-md border border-border/80 bg-background/90 p-3">
                <p className="text-base font-semibold text-foreground">Live</p>
                <p>prices</p>
              </div>
              <div className="rounded-md border border-border/80 bg-background/90 p-3">
                <p className="text-base font-semibold text-foreground">Safe</p>
                <p>links</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-border/80 bg-card/95 p-4 shadow-sm backdrop-blur">
              <FilterSidebar query={query} />
            </div>
          </div>

          <div className="min-w-0">
            <Suspense fallback={<SearchSkeleton />}>
              <SearchResults query={query} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

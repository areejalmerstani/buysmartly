"use client";

import { Store } from "lucide-react";
import { RETAILERS, type SearchQuery, type SearchRetailer } from "@/features/search/domain/search";
import { useSearchNavigation } from "@/features/search/presentation/use-search-navigation";
import { cn } from "@/lib/utils";

interface MarketplaceTabsProps {
  query: SearchQuery;
}

export function MarketplaceTabs({ query }: MarketplaceTabsProps) {
  const { goToSearch } = useSearchNavigation();
  const activeRetailer = query.retailer.length === 1 ? query.retailer[0] : undefined;

  function selectMarketplace(retailer?: SearchRetailer) {
    goToSearch({
      ...query,
      retailer: retailer ? [retailer] : [],
      page: 1,
    });
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-card p-1 shadow-sm">
      <div className="flex min-w-max items-center gap-1">
        <button
          type="button"
          onClick={() => selectMarketplace()}
          className={cn(
            "inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors",
            !activeRetailer
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Store className="h-4 w-4" />
          All
        </button>
        {RETAILERS.map((retailer) => (
          <button
            key={retailer.id}
            type="button"
            onClick={() => selectMarketplace(retailer.id)}
            className={cn(
              "inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors",
              activeRetailer === retailer.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {retailer.label}
          </button>
        ))}
      </div>
    </div>
  );
}

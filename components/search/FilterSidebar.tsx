"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DEFAULT_PRICE_RANGE,
  RETAILERS,
  SORT_OPTIONS,
  type SearchQuery,
  type SearchRetailer,
  type SearchSort,
} from "@/features/search/domain/search";
import { useSearchNavigation } from "@/features/search/presentation/use-search-navigation";

interface FilterSidebarProps {
  query: SearchQuery;
}

export function FilterSidebar({ query }: FilterSidebarProps) {
  const { goToSearch } = useSearchNavigation();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    query.minPrice ?? DEFAULT_PRICE_RANGE[0],
    query.maxPrice ?? DEFAULT_PRICE_RANGE[1],
  ]);
  const [selectedRetailers, setSelectedRetailers] = useState<SearchRetailer[]>(query.retailer);
  const [sortBy, setSortBy] = useState<SearchSort>(query.sortBy);

  useEffect(() => {
    setPriceRange([
      query.minPrice ?? DEFAULT_PRICE_RANGE[0],
      query.maxPrice ?? DEFAULT_PRICE_RANGE[1],
    ]);
    setSelectedRetailers(query.retailer);
    setSortBy(query.sortBy);
  }, [query]);

  function applyFilters() {
    goToSearch({
      ...query,
      retailer: selectedRetailers,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy,
      page: 1,
    });
  }

  function resetFilters() {
    goToSearch({
      ...query,
      retailer: [],
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: "relevance",
      page: 1,
    });
    setPriceRange([...DEFAULT_PRICE_RANGE]);
    setSelectedRetailers([]);
    setSortBy("relevance");
  }

  function toggleRetailer(id: SearchRetailer) {
    setSelectedRetailers((prev) =>
      prev.includes(id) ? prev.filter((retailer) => retailer !== id) : [...prev, id]
    );
  }

  return (
    <aside className="flex w-full flex-col gap-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold">Filters</h2>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Sort by
        </h3>
        <div className="grid gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted"
            >
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={sortBy === opt.value}
                onChange={() => setSortBy(opt.value)}
                className="accent-primary"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Retailer
        </h3>
        <div className="grid gap-1.5">
          {RETAILERS.map((retailer) => (
            <div
              key={retailer.id}
              className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-muted"
            >
              <Checkbox
                id={retailer.id}
                checked={selectedRetailers.includes(retailer.id)}
                onCheckedChange={() => toggleRetailer(retailer.id)}
              />
              <Label htmlFor={retailer.id} className="flex-1 cursor-pointer text-sm">
                {retailer.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Price range
        </h3>
        <Slider
          min={DEFAULT_PRICE_RANGE[0]}
          max={DEFAULT_PRICE_RANGE[1]}
          step={50}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
        />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-md border bg-background px-3 py-2">
            <p className="text-xs text-muted-foreground">Min</p>
            <p className="font-semibold tabular-nums">${priceRange[0]}</p>
          </div>
          <div className="rounded-md border bg-background px-3 py-2">
            <p className="text-xs text-muted-foreground">Max</p>
            <p className="font-semibold tabular-nums">${priceRange[1]}</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid gap-2">
        <Button onClick={applyFilters} className="w-full">
          Apply filters
        </Button>
        <Button onClick={resetFilters} variant="outline" className="w-full gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </aside>
  );
}

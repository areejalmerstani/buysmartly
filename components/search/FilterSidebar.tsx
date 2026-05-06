"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const RETAILERS = [
    { id: "amazon", label: "Amazon" },
    { id: "ebay", label: "eBay" },
    { id: "noon", label: "Noon" },
    { id: "aliexpress", label: "AliExpress" },
    { id: "walmart", label: "Walmart" },
];

const SORT_OPTIONS = [
    { value: "relevance", label: "Most relevant" },
    { value: "price_asc", label: "Price: low to high" },
    { value: "price_desc", label: "Price: high to low" },
    { value: "rating", label: "Highest rated" },
];

export function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("relevance");

    function applyFilters() {
        const params = new URLSearchParams(searchParams.toString());
        params.set("minPrice", priceRange[0].toString());
        params.set("maxPrice", priceRange[1].toString());
        params.set("sortBy", sortBy);
        if (selectedRetailers.length > 0) {
            params.set("retailer", selectedRetailers.join(","));
        } else {
            params.delete("retailer");
        }
        params.set("page", "1");
        router.push(`/search?${params.toString()}`);
    }

    function resetFilters() {
        const params = new URLSearchParams();
        params.set("q", searchParams.get("q") ?? "");
        router.push(`/search?${params.toString()}`);
        setPriceRange([0, 5000]);
        setSelectedRetailers([]);
        setSortBy("relevance");
    }

    function toggleRetailer(id: string) {
        setSelectedRetailers((prev) =>
                                 prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    }

    return (
        <aside className="flex flex-col gap-6 w-full">

            {/* Sort */}
            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-sm">Sort by</h3>
                <div className="flex flex-col gap-2">
                    {SORT_OPTIONS.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="sort"
                                value={opt.value}
                                checked={sortBy === opt.value}
                                onChange={() => setSortBy(opt.value)}
                                className="accent-primary"
                            />
                            <span className="text-sm">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Retailers */}
            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-sm">Retailer</h3>
                <div className="flex flex-col gap-2">
                    {RETAILERS.map((r) => (
                        <div key={r.id} className="flex items-center gap-2">
                            <Checkbox
                                id={r.id}
                                checked={selectedRetailers.includes(r.id)}
                                onCheckedChange={() => toggleRetailer(r.id)}
                            />
                            <Label htmlFor={r.id} className="text-sm cursor-pointer">
                                {r.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Price range */}
            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-sm">Price range</h3>
                <Slider
                    min={0}
                    max={5000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-col gap-2">
                <Button onClick={applyFilters} className="w-full">
                    Apply filters
                </Button>
                <Button onClick={resetFilters} variant="outline" className="w-full">
                    Reset
                </Button>
            </div>

        </aside>
    );
}
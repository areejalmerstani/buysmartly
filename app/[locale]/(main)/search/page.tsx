import { Suspense } from "react";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResults } from "@/components/search/SearchResults";
import { SearchSkeleton } from "@/components/search/SearchSkeleton";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        retailer?: string;
        minPrice?: string;
        maxPrice?: string;
        sortBy?: string;
        page?: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    const query = params.q ?? "";

    return (
        <div className="container mx-auto px-4 py-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">
                    {query ? `Results for "${query}"` : "Search results"}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Comparing prices across Amazon, eBay, Noon, AliExpress, and Walmart
                </p>
            </div>

            <div className="flex gap-8">

                {/* Sidebar */}
                <div className="hidden lg:block w-56 shrink-0">
                    <FilterSidebar />
                </div>

                {/* Results */}
                <div className="flex-1">
                    <Suspense fallback={<SearchSkeleton />}>
                        {/*<SearchResults params={params} />*/}
                    </Suspense>
                </div>

            </div>
        </div>
    );
}
import { Skeleton } from "@/components/ui/skeleton";

export function SearchSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3 rounded-xl border p-4">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
}
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

const RETAILER_COLORS: Record<Product["retailer"], string> = {
    amazon: "bg-orange-100 text-orange-800",
    ebay: "bg-blue-100 text-blue-800",
    noon: "bg-yellow-100 text-yellow-800",
    aliexpress: "bg-red-100 text-red-800",
    walmart: "bg-cyan-100 text-cyan-800",
};

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="group flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">

            <Link
                href={`/product/${product.id}`}
                className="relative aspect-square overflow-hidden bg-muted"
            >
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />
                <Badge
                    className={`absolute top-2 left-2 text-xs font-medium ${RETAILER_COLORS[product.retailer]}`}
                    variant="secondary"
                >
                    {product.retailer.charAt(0).toUpperCase() + product.retailer.slice(1)}
                </Badge>
            </Link>

            <CardContent className="flex flex-col flex-1 gap-3 p-4">

                <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium leading-snug line-clamp-2 hover:text-primary transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                    i < Math.floor(product.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted-foreground"
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Truck className="h-3.5 w-3.5" />
                    <span>{product.deliveryEstimate}</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t">
          <span className="text-lg font-bold">
            {product.currency} {product.price.toLocaleString()}
          </span>
                    <Button size="sm" className="gap-1.5 text-xs" asChild>
                        <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                            Buy Now
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}
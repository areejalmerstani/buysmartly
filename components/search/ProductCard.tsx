import Image from "next/image";
import Link from "next/link";
import { Star, Truck, ExternalLink, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import type { Route } from "next";

const RETAILER_COLORS: Record<Product["retailer"], string> = {
  amazon: "bg-orange-100 text-orange-800 ring-orange-200",
  ebay: "bg-blue-100 text-blue-800 ring-blue-200",
  noon: "bg-yellow-100 text-yellow-800 ring-yellow-200",
  aliexpress: "bg-red-100 text-red-800 ring-red-200",
  walmart: "bg-cyan-100 text-cyan-800 ring-cyan-200",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const productHref = `/product/${product.id}` as Route;

  return (
    <Card className="group overflow-hidden rounded-lg border border-border/80 bg-card/95 p-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/10">
      <Link
        href={productHref}
        className="relative block aspect-[4/3] overflow-hidden border-b border-border/70 bg-muted/60"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <Badge
          className={`absolute left-3 top-3 rounded-md text-xs font-medium ring-1 ${RETAILER_COLORS[product.retailer]}`}
          variant="secondary"
        >
          {product.retailer.charAt(0).toUpperCase() + product.retailer.slice(1)}
        </Badge>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <Link href={productHref}>
          <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 transition-colors hover:text-primary">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/35"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>
          {product.inStock && <BadgeCheck className="h-4 w-4 text-emerald-600" />}
        </div>

        <div className="flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/50 px-2.5 py-2 text-xs text-muted-foreground">
          <Truck className="h-3.5 w-3.5" />
          <span className="truncate">{product.deliveryEstimate}</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/70 pt-3">
          <div>
            <p className="text-xs text-muted-foreground">Best offer</p>
            <p className="text-lg font-semibold tabular-nums text-foreground">
              {product.currency} {product.price.toLocaleString()}
            </p>
          </div>
          <Button size="sm" className="gap-1.5 shadow-sm shadow-primary/25" asChild>
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
              Buy
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

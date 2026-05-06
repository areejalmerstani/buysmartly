"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Heart, ShoppingBag, Languages } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations();
    const locale = useLocale();

    const [query, setQuery] = useState(searchParams.get("q") ?? "");

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
    }

    function toggleLanguage() {
        const nextLocale = locale === "en" ? "ar" : "en";
        // Replace locale segment in current path
        const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
        router.push(newPath);
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center gap-4 px-4">

                {/* Logo */}
                <Link
                    href={`/${locale}`}
                    className="flex items-center gap-2 font-bold text-xl shrink-0"
                >
                    <ShoppingBag className="h-6 w-6 text-primary" />
                    <span>BuySmartly</span>
                </Link>

                {/* Search bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex flex-1 items-center gap-2 max-w-2xl mx-auto"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t("common.searchPlaceholder")}
                            className="pl-9 h-10"
                        />
                    </div>
                    <Button type="submit" className="h-10 px-6">
                        {t("common.search")}
                    </Button>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">

                    {/* Language toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleLanguage}
                        className="gap-2 font-medium"
                    >
                        <Languages className="h-4 w-4" />
                        {locale === "en" ? "عربي" : "English"}
                    </Button>

                    {/* Wishlist */}
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/${locale}/wishlist`}>
                            <Heart className="h-5 w-5" />
                        </Link>
                    </Button>

                </div>
            </div>
        </header>
    );
}
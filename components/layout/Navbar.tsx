"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Heart, Languages } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { useSearchNavigation } from "@/features/search/presentation/use-search-navigation";
import type { Route } from "next";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const locale = useLocale();
  const { submitSearch } = useSearchNavigation();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    submitSearch(query);
  }

  function toggleLanguage() {
    const nextLocale = locale === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath as Route);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}` as Route}
          className="flex shrink-0 items-center rounded-md pr-2"
          aria-label="BuySmartly home"
        >
          <img
            src="/nobg_logo.png"
            alt="BuySmartly"
            className="block h-9 w-auto max-w-[150px] object-contain sm:h-22 drop-shadow-sm"
          />
        </Link>

        <form
          onSubmit={handleSearch}
          className="mx-auto hidden max-w-2xl flex-1 items-center gap-2 md:flex"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("common.searchPlaceholder")}
              className="h-10 rounded-md border-border/80 bg-muted/60 pl-9 shadow-inner shadow-foreground/[0.03] focus-visible:bg-background"
            />
          </div>
          <Button type="submit" className="h-10 px-4 shadow-sm shadow-primary/25">
            {t("common.search")}
          </Button>
        </form>

        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2 border border-transparent font-medium hover:border-border/80"
          >
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{locale === "en" ? "عربي" : "English"}</span>
          </Button>

          <Button variant="outline" size="icon" asChild className="bg-background/70">
            <Link href={`/${locale}/wishlist` as Route} aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

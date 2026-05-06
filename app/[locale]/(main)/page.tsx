"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Zap, Shield, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

const RETAILERS = ["Amazon", "eBay", "Noon", "AliExpress", "Walmart"];

export default function HomePage() {
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations();
    const [query, setQuery] = useState("");

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
    }

    const features = [
        {
            icon: Search,
            title: t("home.features.searchEverywhere"),
            desc: t("home.features.searchEverywhereDesc"),
        },
        {
            icon: TrendingDown,
            title: t("home.features.bestPrice"),
            desc: t("home.features.bestPriceDesc"),
        },
        {
            icon: Zap,
            title: t("home.features.realTime"),
            desc: t("home.features.realTimeDesc"),
        },
        {
            icon: Shield,
            title: t("home.features.safe"),
            desc: t("home.features.safeDesc"),
        },
    ];

    return (
        <div className="flex flex-col items-center">

            {/* Hero */}
            <section className="w-full py-24 px-4 flex flex-col items-center text-center gap-6">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">
                    {t("home.hero")}
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl">
                    {t("home.heroSub")}
                </p>

                <form onSubmit={handleSearch} className="flex w-full max-w-xl gap-2 mt-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t("home.trySearching")}
                            className="pl-9 h-12 text-base"
                        />
                    </div>
                    <Button type="submit" size="lg" className="h-12 px-8">
                        {t("common.search")}
                    </Button>
                </form>

                <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
          <span className="text-sm text-muted-foreground">
            {t("home.searchesAcross")}
          </span>
                    {RETAILERS.map((name) => (
                        <span
                            key={name}
                            className="text-sm font-medium px-3 py-1 rounded-full border bg-muted"
                        >
              {name}
            </span>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="w-full max-w-4xl px-4 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex flex-col gap-2 p-4 rounded-xl border bg-card">
                        <Icon className="h-6 w-6 text-primary" />
                        <h3 className="font-semibold text-sm">{title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                ))}
            </section>

        </div>
    );
}
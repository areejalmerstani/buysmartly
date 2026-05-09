"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Search, Shield, Sparkles, TrendingDown, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useSearchNavigation } from "@/features/search/presentation/use-search-navigation";

const RETAILERS = ["Amazon", "eBay", "Noon", "AliExpress", "Walmart"];

export default function HomePage() {
  const t = useTranslations();
  const { submitSearch } = useSearchNavigation();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    submitSearch(query);
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
    <div className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,oklch(0.63_0.21_28/0.08),transparent_34%),linear-gradient(180deg,oklch(1_0_0/0.55),transparent_26%)]">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8 lg:py-16">
        <div className="flex min-h-[520px] flex-col gap-7">
          {/* <div className="inline-flex w-fit items-center gap-2 rounded-md border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Live marketplace comparison
          </div> */}

{/*           <Image
            src="/hero.png"
            alt="BuySmartly"
            width={420}
            height={140}
            className="h-40 w-auto drop-shadow-sm sm:h-80"
            priority
          /> */}

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              {t("home.hero")}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {t("home.heroSub")}
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-2xl flex-col gap-3 rounded-lg border bg-card p-2 shadow-lg sm:flex-row"
          >
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("home.trySearching")}
                className="h-12 border-transparent bg-muted/60 pl-9 text-base shadow-none focus-visible:bg-background"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-5 sm:px-6">
              {t("common.search")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex max-w-2xl flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-muted-foreground">{t("home.searchesAcross")}</span>
            {RETAILERS.map((name) => (
              <span
                key={name}
                className="rounded-md border bg-background px-3 py-1 text-sm font-medium text-foreground shadow-sm"
              >
                {name}
              </span>
            ))}
          </div>

        </div>

        <div className="grid content-center gap-3 lg:min-h-[520px]">
          <div className="rounded-lg border bg-card p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <div>
                <p className="text-sm font-medium">Price snapshot</p>
                <p className="text-xs text-muted-foreground">Same product, cleaner decisions</p>
              </div>
              <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                -18%
              </span>
            </div>
            <div className="space-y-3">
              {["Amazon", "Noon", "eBay"].map((name, index) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-md bg-muted/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-background text-sm font-semibold shadow-sm">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? "Fast delivery" : "Verified offer"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold tabular-nums">${[849, 879, 912][index]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-lg border bg-card p-4 shadow-sm">
                <Icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="text-sm font-semibold leading-snug">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

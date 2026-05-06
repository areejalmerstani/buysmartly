"use client";

import type { Route } from "next";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import type { SearchQuery } from "../domain/search";
import { createSearchQuery, toSearchParams } from "../domain/search";

export function useSearchNavigation() {
  const router = useRouter();
  const locale = useLocale();

  function goToSearch(query: SearchQuery) {
    const params = toSearchParams(query);
    const suffix = params.toString();
    router.push(`/${locale}/search${suffix ? `?${suffix}` : ""}` as Route);
  }

  function submitSearch(q: string) {
    const query = createSearchQuery(q);
    if (!query.q) return;

    goToSearch(query);
  }

  return {
    goToSearch,
    submitSearch,
  };
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { Hero } from "./Hero";
import { KpiStrip } from "./KpiStrip";
import { PanoramicBanner } from "./PanoramicBanner";
import { BenefitsSection } from "./BenefitsSection";
import { SolutionsGrid } from "./SolutionsGrid";
import { CaseCarousel } from "./CaseCarousel";
import { EditorialBlock } from "./EditorialBlock";
import { BlogGrid } from "./BlogGrid";
import { LeadForm } from "./LeadForm";
import { StickyCta } from "./StickyCta";
import { InfiniteScrollController } from "./InfiniteScrollController";
import { solutions } from "@/data/base-content";
import type { PlaceholderPage } from "@/types/placeholder";

interface LandingPageProps {
  initialPage: PlaceholderPage & { hasMore: boolean };
}

export function LandingPage({ initialPage }: LandingPageProps) {
  const [cases, setCases] = useState(initialPage.cases);
  const [posts, setPosts] = useState(initialPage.posts);
  const [products, setProducts] = useState(initialPage.products);
  const [page, setPage] = useState(initialPage.page);
  const [hasMore, setHasMore] = useState(initialPage.hasMore ?? true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setHasError(false);
    const nextPage = page + 1;

    try {
      const response = await fetch(`/api/placeholder?page=${nextPage}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data: PlaceholderPage & { hasMore: boolean } = await response.json();
      setCases((prev) => [...prev, ...data.cases]);
      setPosts((prev) => [...prev, ...data.posts]);
      setProducts((prev) => [...prev, ...data.products]);
      setPage(nextPage);
      setHasMore(data.hasMore ?? false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, page]);

  const onRetry = useCallback(async () => {
    await loadMore();
  }, [loadMore]);

  const extendedSolutions = useMemo(() => products, [products]);

  return (
    <div>
      <Hero />
      <KpiStrip />
      <PanoramicBanner />
      <BenefitsSection />
      <SolutionsGrid baseSolutions={solutions} extendedSolutions={extendedSolutions} />
      <CaseCarousel cases={cases} />
      <EditorialBlock />
      <StickyCta />
      <BlogGrid posts={posts} loading={isLoading} />
      <InfiniteScrollController
        onLoadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
        hasError={hasError}
        onRetry={onRetry}
      />
      <LeadForm />
    </div>
  );
}

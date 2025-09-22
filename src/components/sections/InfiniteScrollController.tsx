"use client";

import { useCallback, useEffect, useRef } from "react";

interface InfiniteScrollControllerProps {
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => Promise<void>;
}

export function InfiniteScrollController({
  onLoadMore,
  hasMore,
  isLoading,
  hasError,
  onRetry,
}: InfiniteScrollControllerProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    loadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    if (!hasMore || isLoading) {
      return undefined;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.85) {
            loadMoreRef.current().catch(() => {
              // handled upstream
            });
          }
        });
      },
      { rootMargin: "0px", threshold: [0.5, 0.75, 0.85, 1] },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const handleClick = useCallback(() => {
    void onRetry();
  }, [onRetry]);

  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center text-sm text-muted">
      <div ref={sentinelRef} className="h-1 w-full" aria-hidden />
      {isLoading ? (
        <div className="flex items-center gap-3" aria-live="polite">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand" aria-hidden />
          <span>[Copy_Breve_151]</span>
        </div>
      ) : null}
      {hasError ? (
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center gap-2 rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
        >
          [Texto_Boton_18]
        </button>
      ) : null}
      {!hasMore && !isLoading ? <p className="text-xs text-muted">[Copy_Breve_152]</p> : null}
    </div>
  );
}

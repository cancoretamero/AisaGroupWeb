"use client";

import clsx from "clsx";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={clsx("relative overflow-hidden rounded-3xl bg-slate-100", className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

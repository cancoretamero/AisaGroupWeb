"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SkeletonCard } from "../ui/SkeletonCard";
import { getAltFromPath } from "../utils/getAltFromPath";

export type BlogPost = {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
};

type BlogGridProps = {
  posts: BlogPost[];
  loading?: boolean;
  skeletonCount?: number;
};

export function BlogGrid({ posts, loading = false, skeletonCount = 3 }: BlogGridProps) {
  return (
    <section id="blog" aria-labelledby="blog-heading" className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">Latest perspectives</p>
            <h2 id="blog-heading" className="mt-3 max-w-3xl font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.2] text-ink">
              Insights from the Rurivo field desk.
            </h2>
          </div>
          <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-ink">
            Browse all posts
            <span aria-hidden>↗</span>
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={`${post.id}-${index}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative h-56">
                <Image
                  src={`/${post.image}`}
                  alt={getAltFromPath(post.image)}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 45vw, 90vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                  <span>{post.category}</span>
                  <span className="text-muted">{post.date}</span>
                </div>
                <h3 className="font-display text-[1.75rem] leading-[1.2] text-ink">{post.title}</h3>
                <p className="text-base leading-relaxed text-muted">{post.excerpt}</p>
                <Link
                  href="#"
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
                >
                  Read article
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </motion.article>
          ))}
          {loading
            ? Array.from({ length: skeletonCount }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} className="h-80" />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}

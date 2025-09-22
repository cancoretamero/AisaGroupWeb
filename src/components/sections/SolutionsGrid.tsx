"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Solution } from "@/data/base-content";
import { getAltFromPath } from "../utils/getAltFromPath";

export type SolutionCard = Solution;

export type ExtendedSolution = {
  id: string;
  title: string;
  description: string;
  image: string;
};

type SolutionsGridProps = {
  baseSolutions: SolutionCard[];
  extendedSolutions: ExtendedSolution[];
};

export function SolutionsGrid({ baseSolutions, extendedSolutions }: SolutionsGridProps) {
  const allSolutions = [...baseSolutions, ...extendedSolutions];

  return (
    <section id="products" aria-labelledby="solutions-heading" className="bg-bg py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">[Copy_Breve_121]</p>
            <h2
              id="solutions-heading"
              className="mt-3 max-w-3xl font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.2] text-ink"
            >
              [Copy_Breve_122]
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted">[Copy_Breve_123]</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {allSolutions.map((solution, index) => (
            <motion.article
              key={`${solution.id}-${index}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06, duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-soft"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={`/${solution.image}`}
                  alt={getAltFromPath(solution.image)}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 45vw, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" aria-hidden />
                <span className="absolute left-4 top-4 rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
                  [Copy_Breve_124]
                </span>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <h3 className="font-display text-[1.75rem] leading-[1.2] text-ink">{solution.title}</h3>
                <p className="text-base leading-relaxed text-muted">{solution.description}</p>
                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
                >
                  [Texto_Boton_10]
                  <span aria-hidden>↗</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

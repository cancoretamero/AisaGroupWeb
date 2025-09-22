"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getAltFromPath } from "../utils/getAltFromPath";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";

export type CaseStudy = {
  id: string;
  title: string;
  excerpt: string;
  logo: string;
  image: string;
};

type CaseCarouselProps = {
  cases: CaseStudy[];
};

export function CaseCarousel({ cases }: CaseCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || isHovered || cases.length === 0) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cases.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [cases.length, isHovered, prefersReducedMotion]);

  const activeCase = cases[activeIndex];

  return (
    <section
      aria-labelledby="cases-heading"
      className="bg-white py-20"
      id="case-carousel"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">[Copy_Breve_126]</p>
            <h2 id="cases-heading" className="mt-3 max-w-3xl font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.15] text-ink">
              [Copy_Breve_127]
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted">[Copy_Breve_128]</p>
        </div>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div
            className="relative overflow-hidden rounded-3xl bg-ink text-white shadow-soft"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCase?.id ?? "placeholder"}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full min-h-[24rem]"
              >
                {activeCase ? (
                  <>
                    <Image
                      src={`/${activeCase.image}`}
                      alt={getAltFromPath(activeCase.image)}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 60vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" aria-hidden />
                    <div className="relative flex h-full flex-col justify-end gap-6 p-10">
                      <div className="flex items-center gap-4">
                        <span className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10 p-2">
                          <Image
                            src={`/${activeCase.logo}`}
                            alt={getAltFromPath(activeCase.logo)}
                            fill
                            className="object-contain"
                          />
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">[Copy_Breve_129]</p>
                      </div>
                      <h3 className="font-display text-[clamp(2rem,3vw,2.75rem)] leading-[1.2] text-white">
                        {activeCase?.title}
                      </h3>
                      <p className="max-w-2xl text-base leading-relaxed text-slate-200">{activeCase?.excerpt}</p>
                      <button
                        type="button"
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent"
                      >
                        [Texto_Boton_12]
                        <span aria-hidden>→</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full min-h-[24rem] items-center justify-center text-sm text-white/70">
                    [Copy_Breve_130]
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted">[Copy_Breve_131]</p>
              <span className="text-sm font-semibold text-brand">
                {String(activeIndex + 1).padStart(2, "0")}/{String(cases.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {cases.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-1 min-w-[6.5rem] items-center justify-center gap-2 rounded-2xl border px-3 py-2 transition ${
                    index === activeIndex
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-slate-200/70 text-muted hover:border-brand hover:text-brand"
                  }`}
                  aria-label={`Caso ${index + 1}`}
                >
                  <span className="relative h-6 w-6 overflow-hidden rounded-full bg-white/80">
                    <Image
                      src={`/${item.logo}`}
                      alt={getAltFromPath(item.logo)}
                      fill
                      className="object-contain"
                    />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em]">[Copy_Breve_132]</span>
                </button>
              ))}
            </div>
            <div className="rounded-3xl border border-slate-200/70 bg-bg p-6 text-sm leading-relaxed text-muted">
              [Copy_Breve_133]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

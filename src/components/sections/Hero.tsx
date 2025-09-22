"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";

type Highlight = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-6%"]);

  const highlights: Highlight[] = useMemo(
    () => [
      {
        id: "highlight-1",
        eyebrow: "Collaborative network",
        title: "Collaborate and learn from industry experts and enthusiasts.",
        description:
          "Weekly labs with agronomists, climatologists, and regenerative innovators translate insights into live field execution.",
      },
      {
        id: "highlight-2",
        eyebrow: "Crop intelligence",
        title: "Next-gen solutions for optimal crop growth.",
        description:
          "Adaptive playbooks balance irrigation, nutrition, and climate signals to keep every hectare resilient and profitable.",
      },
      {
        id: "highlight-3",
        eyebrow: "Immersive experience",
        title: "Build lasting farming experiences for your teams.",
        description:
          "Bring drone imagery, soil telemetry, and human expertise together in a single collaborative operations studio.",
      },
    ],
    [],
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-ink text-white"
      aria-labelledby="hero-heading"
    >
      <motion.div style={{ y: parallaxY }} className="absolute inset-0">
        <Image
          src="/img/hero_placeholder.svg"
          alt="Aerial panorama of regenerative crops shaped into soft terraces"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/20" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center gap-16 px-4 py-24 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-200">
              <span>Premium agritech</span>
              <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-accent" />
              <span>Rurivo</span>
            </div>
            <h1 id="hero-heading" className="font-display text-[clamp(3.5rem,6vw,4.5rem)] font-semibold leading-[1.05]">
              Bring Fresh Growth To Agriculture.
            </h1>
            <p className="max-w-2xl text-lg leading-[1.6] text-slate-100">
              Rurivo orchestrates precision sensing, regenerative insights, and automated field execution so visionary growers can
              scale sustainable performance with confidence.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#lead"
                className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-accent focus-visible:bg-accent"
              >
                Get started
              </Link>
              <Link
                href="#products"
                className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:text-accent"
              >
                Explore platform
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                Trusted by more than 200 estates worldwide
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                Carbon-positive deployments since 2016
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: prefersReducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {highlights.map((highlight, index) => (
              <motion.article
                key={highlight.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.08, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">{highlight.eyebrow}</span>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.25] text-white">
                  {highlight.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{highlight.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-6%"]);

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
          alt="[Alt_Imagen_3]"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-24 text-left lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.5em] text-accent">[Copy_Breve_109]</p>
          <h1
            id="hero-heading"
            className="font-display text-[clamp(3.5rem,6vw,4.5rem)] font-semibold leading-[1.1] text-white"
          >
            [H1_Principal]
          </h1>
          <p className="mt-6 max-w-2xl text-[1.25rem] leading-[1.5] text-slate-100">[Lead_Explicativo]</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#lead"
              className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-accent focus-visible:bg-accent"
            >
              [Texto_Boton_1]
            </Link>
            <Link
              href="#products"
              className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:text-accent"
            >
              [Texto_Boton_2]
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: prefersReducedMotion ? 0 : 0.24 }}
          className="grid gap-6 text-sm text-slate-200 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.45em] text-accent">[Copy_Breve_110]</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-100">[Copy_Breve_111]</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.45em] text-accent">[Copy_Breve_112]</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-100">[Copy_Breve_113]</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.45em] text-accent">[Copy_Breve_114]</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-100">[Copy_Breve_115]</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.45em] text-accent">[Copy_Breve_116]</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-100">[Copy_Breve_117]</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

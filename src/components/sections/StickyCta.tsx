"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function StickyCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink" aria-labelledby="sticky-cta-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,195,74,0.2),_transparent)]" aria-hidden />
      <div className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col items-start justify-center gap-8 px-4 py-20 text-white lg:px-6">
        <motion.h2
          id="sticky-cta-heading"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.75rem,4.5vw,4rem)] leading-[1.15]"
        >
          [Únete a la revolución]
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.12, duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-lg leading-relaxed text-slate-200"
        >
          [Copy_Breve_150]
        </motion.p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="#lead"
            className="rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-accent"
          >
            [Texto_Boton_16]
          </Link>
          <Link
            href="#products"
            className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:border-white"
          >
            [Texto_Boton_17]
          </Link>
        </div>
      </div>
    </section>
  );
}

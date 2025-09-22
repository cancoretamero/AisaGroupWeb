"use client";

import { motion } from "framer-motion";
import type { Benefit } from "@/data/base-content";

export function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, boxShadow: "0 32px 60px -36px rgba(17, 17, 17, 0.35)" }}
      className="group flex flex-col gap-4 rounded-3xl border border-slate-200/70 bg-white p-8 shadow-subtle transition will-change-transform"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M12 2v20M2 12h20" strokeLinecap="round" />
        </svg>
      </span>
      <h3 className="font-display text-[1.75rem] leading-[1.25] text-ink">{benefit.title}</h3>
      <p className="text-base leading-relaxed text-muted">{benefit.description}</p>
      <button
        type="button"
        className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-transparent bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
      >
        [Texto_Boton_9]
        <span aria-hidden>→</span>
      </button>
    </motion.article>
  );
}

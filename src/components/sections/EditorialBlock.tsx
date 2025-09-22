"use client";

import { motion } from "framer-motion";
import { editorialTags } from "@/data/base-content";

export function EditorialBlock() {
  return (
    <section className="bg-white py-20" aria-labelledby="editorial-heading">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">[Copy_Breve_125]</p>
          <h2 id="editorial-heading" className="font-display text-[clamp(2.75rem,4.5vw,3.75rem)] leading-[1.1] text-ink">
            [Titular_Editorial]
          </h2>
          <div className="flex flex-wrap gap-3">
            {editorialTags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand"
              >
                {tag.label}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.12, duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 text-base leading-relaxed text-muted"
        >
          <p>[Copy_Largo_1]</p>
          <p>[Copy_Largo_2]</p>
          <a
            href="#"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand transition hover:text-ink"
          >
            [Texto_Boton_11]
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

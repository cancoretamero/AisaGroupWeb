"use client";

import { benefits } from "@/data/base-content";
import { BenefitCard } from "./BenefitCard";

export function BenefitsSection() {
  return (
    <section className="bg-white py-20" aria-labelledby="benefits-heading">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">[Copy_Breve_153]</p>
            <h2 id="benefits-heading" className="mt-3 max-w-3xl font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.15] text-ink">
              [H2_Beneficios]
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted">[Copy_Breve_154]</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

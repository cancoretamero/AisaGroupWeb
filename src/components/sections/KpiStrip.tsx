"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { metrics } from "@/data/base-content";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";

function AnimatedMetric({
  target,
  prefix,
  suffix,
  display,
  label,
  summary,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  display: string;
  label: string;
  summary: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 90,
    damping: 20,
  });
  const value = useTransform(spring, (latest) => {
    const formatted = Math.round(latest).toLocaleString("es-ES");
    return `${prefix ?? ""}${formatted}${suffix ?? ""}`;
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(prefersReducedMotion ? target : target);
    }
  }, [isInView, target, motionValue, prefersReducedMotion]);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted/80">{label}</span>
      <motion.span
        aria-label={display}
        className="font-display text-[clamp(2.5rem,4vw,3.25rem)] font-semibold leading-none text-ink"
      >
        {prefersReducedMotion ? display : value}
      </motion.span>
      <p className="max-w-xs text-sm leading-relaxed text-muted">{summary}</p>
    </div>
  );
}

export function KpiStrip() {
  return (
    <section aria-labelledby="kpi-heading" className="relative z-10 -mt-16 pb-10" id="about">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="rounded-[2.5rem] border border-white/60 bg-white/90 p-10 shadow-card backdrop-blur-sm">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand/80">Since 2005</p>
              <h2
                id="kpi-heading"
                className="max-w-xl font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.1] text-ink"
              >
                The journey to perfection continues.
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-muted">
                Benchmarked across our 2024 deployments and audited by independent agronomists to validate impact, traceability,
                and profitability.
              </p>
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-muted/80">
                <span className="rounded-full bg-bg px-4 py-2">Regenerative by design</span>
                <span className="rounded-full bg-bg px-4 py-2">Data certified</span>
                <span className="rounded-full bg-bg px-4 py-2">Global stewardship</span>
              </div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div key={metric.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-subtle">
                  <AnimatedMetric
                    target={metric.target}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    display={metric.display}
                    label={metric.label}
                    summary={metric.summary}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

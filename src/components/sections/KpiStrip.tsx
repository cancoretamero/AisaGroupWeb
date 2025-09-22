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
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  display: string;
  label: string;
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
    <div ref={ref} className="flex flex-col">
      <span className="text-sm uppercase tracking-[0.35em] text-muted">{label}</span>
      <motion.span
        aria-label={display}
        className="mt-2 font-display text-[2.75rem] font-semibold leading-none text-ink"
      >
        {prefersReducedMotion ? display : value}
      </motion.span>
    </div>
  );
}

export function KpiStrip() {
  return (
    <section
      aria-labelledby="kpi-heading"
      className="bg-white py-16"
      id="about"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">[Copy_Breve_118]</p>
          <h2 id="kpi-heading" className="max-w-3xl font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.15] text-ink">
            [Copy_Breve_119]
          </h2>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="rounded-3xl border border-slate-200/70 bg-bg p-6 shadow-subtle">
              <AnimatedMetric
                target={metric.target}
                prefix={metric.prefix}
                suffix={metric.suffix}
                display={metric.display}
                label={metric.label}
              />
              <p className="mt-4 text-sm leading-relaxed text-muted">[Copy_Breve_120]</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";

export function PanoramicBanner() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    let ctx: { revert: () => void } | undefined;

    async function setup() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current) {
        return;
      }

      ctx = gsap.context(() => {
        gsap.to(containerRef.current, {
          backgroundPositionY: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, containerRef);
    }

    void setup();

    return () => ctx?.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="reviews"
      aria-labelledby="panoramic-heading"
      className="relative isolate overflow-hidden"
    >
      <div
        ref={containerRef}
        className="relative min-h-[60vh] w-full overflow-hidden bg-ink"
        style={{ backgroundImage: "url(/img/placeholder_33.svg)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" aria-hidden />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center gap-6 px-4 py-20 text-white lg:px-6">
          <motion.h2
            id="panoramic-heading"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.1]"
          >
            [Claim_Visual]
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: prefersReducedMotion ? 0 : 0.24 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#lead"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-accent"
            >
              [Reserva_Demo]
            </Link>
            <Link
              href="#products"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white"
            >
              [Texto_Boton_8]
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0" aria-hidden>
          <Image src="/img/placeholder_33.svg" alt="[Alt_Imagen_4]" fill className="opacity-0" sizes="100vw" />
        </div>
      </div>
    </section>
  );
}

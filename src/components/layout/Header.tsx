"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavMenu } from "../navigation/NavMenu";
import { MobileMenu } from "../navigation/MobileMenu";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 mx-auto w-full border-b border-white/20 bg-white/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
        <Link href="#home" className="flex items-center gap-3" aria-label="Ir al inicio">
          <span className="relative h-10 w-10 overflow-hidden rounded-full bg-brand/10 p-2">
            <Image src="/svg/logo_placeholder_main.svg" alt="Logotipo de Rurivo" fill className="object-contain" />
          </span>
          <span className="hidden text-lg font-semibold tracking-[0.28em] text-brand uppercase md:block">
            Rurivo
          </span>
        </Link>
        <div className="hidden items-center gap-10 lg:flex">
          <NavMenu className="text-sm text-ink" />
          <div className="flex items-center gap-4">
            <Link
              href="#lead"
              className="rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white focus-visible:bg-brand focus-visible:text-white"
            >
              Book a demo
            </Link>
            <Link
              href="#lead"
              className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-ink focus-visible:bg-ink"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <Link
            href="#lead"
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-subtle transition hover:bg-ink focus-visible:bg-ink sm:block"
          >
            Get started
          </Link>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand bg-white text-brand shadow-subtle transition hover:bg-brand hover:text-white"
          >
            <span className="sr-only">Abrir menú</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="stroke-current">
              <path d="M3 5h14M3 10h14M3 15h14" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <span
        className={`pointer-events-none block h-px w-full transition-opacity ${isScrolled ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  );
}

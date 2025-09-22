"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { NavMenu } from "./NavMenu";
import { usePrefersReducedMotion } from "../utils/usePrefersReducedMotion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-50"
        >
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white p-8 shadow-soft"
            aria-label="Menú móvil"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-muted">
                [Copy_Breve_91]
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-brand px-3 py-1 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
              >
                [Texto_Boton_6]
              </button>
            </div>
            <NavMenu orientation="vertical" className="mt-8 gap-4 text-ink" />
            <div className="mt-10 space-y-3 text-sm text-muted">
              <p>[Copy_Breve_92]</p>
              <p>[Copy_Breve_93]</p>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

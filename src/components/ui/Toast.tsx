"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

type ToastProps = {
  message: string | null;
  type?: "success" | "error";
};

export function Toast({ message, type = "success" }: ToastProps) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={clsx(
            "pointer-events-auto fixed bottom-6 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 rounded-3xl px-6 py-4 text-sm shadow-card",
            type === "success" ? "bg-brand text-white" : "bg-red-500 text-white",
          )}
          role="status"
          aria-live="polite"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

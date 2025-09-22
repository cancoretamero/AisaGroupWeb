"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toast } from "../ui/Toast";

interface LeadFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  honeypot?: string;
}

export function LeadForm() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>();

  const onSubmit = async (values: LeadFormValues) => {
    setSubmitting(true);
    setToast(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, preferences: "prefers-default" }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const payload = await response.json();
      setToast({ message: payload?.message ?? "[Copy_Breve_89]", type: "success" });
      reset();
    } catch {
      setToast({ message: "[Copy_Breve_90]", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="lead" aria-labelledby="lead-form-heading" className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">[Copy_Breve_136]</p>
          <h2 id="lead-form-heading" className="font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.15] text-ink">
            [Copy_Breve_137]
          </h2>
          <p className="text-base leading-relaxed text-muted">[Copy_Breve_138]</p>
          <div className="rounded-3xl border border-slate-200/70 bg-bg p-6 text-sm leading-relaxed text-muted">
            [Copy_Largo_3]
          </div>
        </div>
        <div>
          <form
            className="space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            aria-describedby="form-errors"
            noValidate
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-name" className="text-sm font-semibold text-ink">
                  [Copy_Breve_139]
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  {...register("name", { required: true })}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                  placeholder="[Copy_Breve_139]"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name ? <span className="text-xs text-red-500">[Copy_Breve_140]</span> : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-email" className="text-sm font-semibold text-ink">
                  [Copy_Breve_141]
                </label>
                <input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: true, pattern: /.+@.+\..+/ })}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                  placeholder="[Copy_Breve_141]"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email ? <span className="text-xs text-red-500">[Copy_Breve_142]</span> : null}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-phone" className="text-sm font-semibold text-ink">
                  [Copy_Breve_143]
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  autoComplete="tel"
                  {...register("phone", { required: true })}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                  placeholder="[Copy_Breve_143]"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone ? <span className="text-xs text-red-500">[Copy_Breve_144]</span> : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-company" className="text-sm font-semibold text-ink">
                  [Copy_Breve_145]
                </label>
                <input
                  id="lead-company"
                  type="text"
                  autoComplete="organization"
                  {...register("company", { required: true })}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                  placeholder="[Copy_Breve_145]"
                  aria-invalid={errors.company ? "true" : "false"}
                />
                {errors.company ? <span className="text-xs text-red-500">[Copy_Breve_146]</span> : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lead-message" className="text-sm font-semibold text-ink">
                [Copy_Breve_147]
              </label>
              <textarea
                id="lead-message"
                rows={4}
                {...register("message", { required: true })}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                placeholder="[Copy_Breve_147]"
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message ? <span className="text-xs text-red-500">[Copy_Breve_148]</span> : null}
            </div>
            <div className="hidden">
              <label htmlFor="lead-honeypot">No completar</label>
              <input id="lead-honeypot" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-card transition hover:bg-ink"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                  [Texto_Boton_15]
                </span>
              ) : (
                <span>[Texto_Boton_15]</span>
              )}
            </button>
            <div id="form-errors" className="text-xs text-red-500" aria-live="assertive">
              {Object.keys(errors).length > 0 ? "[Copy_Breve_149]" : null}
            </div>
          </form>
        </div>
      </div>
      <Toast message={toast?.message ?? null} type={toast?.type} />
    </section>
  );
}

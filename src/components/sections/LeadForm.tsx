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
      setToast({ message: payload?.message ?? "Thanks for reaching out. Our agronomy desk will reply within one business day.", type: "success" });
      reset();
    } catch {
      setToast({ message: "We couldn't submit your request. Please try again in a moment.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="lead" aria-labelledby="lead-form-heading" className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">Talk with us</p>
          <h2 id="lead-form-heading" className="font-display text-[clamp(2.5rem,4vw,3.25rem)] leading-[1.15] text-ink">
            Let’s design your precision agriculture roadmap.
          </h2>
          <p className="text-base leading-relaxed text-muted">
            Share a few details about your estate and ambitions, and we’ll curate a personalised walkthrough with our strategy
            team.
          </p>
          <div className="rounded-3xl border border-slate-200/70 bg-bg p-6 text-sm leading-relaxed text-muted">
            Prefer email? Write to <a className="font-semibold text-brand" href="mailto:consult@rurivo.com">consult@rurivo.com</a>
            or schedule at <a className="font-semibold text-brand" href="https://cal.com/rurivo">cal.com/rurivo</a>.
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
                  Full name
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  {...register("name", { required: true })}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                  placeholder="Full name"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name ? <span className="text-xs text-red-500">Please add your name.</span> : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-email" className="text-sm font-semibold text-ink">
                  Work email
                </label>
                <input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: true, pattern: /.+@.+\..+/ })}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                  placeholder="Work email"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email ? <span className="text-xs text-red-500">Enter a valid email address.</span> : null}
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-phone" className="text-sm font-semibold text-ink">
                  Phone number
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  autoComplete="tel"
                  {...register("phone", { required: true })}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                  placeholder="Phone number"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone ? <span className="text-xs text-red-500">Phone number is required.</span> : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lead-company" className="text-sm font-semibold text-ink">
                  Company
                </label>
                <input
                  id="lead-company"
                  type="text"
                  autoComplete="organization"
                  {...register("company", { required: true })}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                  placeholder="Company"
                  aria-invalid={errors.company ? "true" : "false"}
                />
                {errors.company ? <span className="text-xs text-red-500">Company is required.</span> : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lead-message" className="text-sm font-semibold text-ink">
                Tell us about your goals
              </label>
              <textarea
                id="lead-message"
                rows={4}
                {...register("message", { required: true })}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink focus-visible:border-brand"
                placeholder="Tell us about your goals"
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message ? <span className="text-xs text-red-500">Please describe your project.</span> : null}
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
                  Submit request
                </span>
              ) : (
                <span>Submit request</span>
              )}
            </button>
            <div id="form-errors" className="text-xs text-red-500" aria-live="assertive">
              {Object.keys(errors).length > 0 ? "Review the highlighted fields." : null}
            </div>
          </form>
        </div>
      </div>
      <Toast message={toast?.message ?? null} type={toast?.type} />
    </section>
  );
}

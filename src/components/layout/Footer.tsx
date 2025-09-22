import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white" aria-label="Pie de página">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div className="space-y-4">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">Rurivo</span>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Premium agritech platform enabling data-rich, regenerative operations for ambitious growers.
          </p>
          <p className="text-xs text-muted">© 2025 Rurivo Technologies Ltd.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Navigation</h3>
          <nav aria-label="Navegación inferior" className="mt-4 flex flex-col gap-2 text-sm text-ink/80">
            <Link href="#home" className="hover:text-ink">
              Home
            </Link>
            <Link href="#about" className="hover:text-ink">
              About
            </Link>
            <Link href="#reviews" className="hover:text-ink">
              Reviews
            </Link>
            <Link href="#products" className="hover:text-ink">
              Products
            </Link>
            <Link href="#blog" className="hover:text-ink">
              Blog
            </Link>
          </nav>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Connect</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="https://www.linkedin.com/company/rurivo" className="transition hover:text-ink">
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/@rurivo" className="transition hover:text-ink">
                YouTube
              </Link>
            </li>
            <li>
              <Link href="mailto:press@rurivo.com" className="transition hover:text-ink">
                Press & partnerships
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">Newsletter</h3>
          <form className="mt-4 space-y-3" aria-label="Formulario de newsletter">
            <label htmlFor="newsletter-email" className="sr-only">
              Work email
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="newsletter-email"
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-ink focus-visible:border-brand"
              placeholder="Work email"
              required
            />
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
            >
              Join newsletter
            </button>
            <p className="text-xs leading-relaxed text-muted">
              We send monthly dispatches covering product updates, field intelligence, and upcoming salons.
            </p>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-200/60 bg-bg py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted sm:flex-row">
          <p>Registered in Singapore and Madrid · EU sustainability compliance pending certification.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-ink">
              Terms
            </Link>
            <Link href="#" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="#" className="hover:text-ink">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

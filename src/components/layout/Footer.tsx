import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white" aria-label="Pie de página">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div className="space-y-4">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">
            [Copy_Breve_94]
          </span>
          <p className="max-w-xs text-sm leading-relaxed text-muted">[Copy_Breve_95]</p>
          <p className="text-xs text-muted">[Copy_Breve_96]</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">[Copy_Breve_97]</h3>
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">[Copy_Breve_98]</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="#" className="transition hover:text-ink">
                [Copy_Breve_99]
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-ink">
                [Copy_Breve_100]
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-ink">
                [Copy_Breve_101]
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted">[Copy_Breve_102]</h3>
          <form className="mt-4 space-y-3" aria-label="Formulario de newsletter">
            <label htmlFor="newsletter-email" className="sr-only">
              [Copy_Breve_103]
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="newsletter-email"
              className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-ink focus-visible:border-brand"
              placeholder="[Copy_Breve_103]"
              required
            />
            <button
              type="submit"
              className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
            >
              [Texto_Boton_7]
            </button>
            <p className="text-xs leading-relaxed text-muted">[Copy_Breve_104]</p>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-200/60 bg-bg py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted sm:flex-row">
          <p>[Copy_Breve_105]</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-ink">
              [Copy_Breve_106]
            </Link>
            <Link href="#" className="hover:text-ink">
              [Copy_Breve_107]
            </Link>
            <Link href="#" className="hover:text-ink">
              [Copy_Breve_108]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

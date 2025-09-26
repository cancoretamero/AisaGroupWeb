"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useMemo, useRef, useState } from "react";
import type { UrlObject } from "url";
import { usePathname } from "next/navigation";

type BaseItem = {
  id: string;
  label: string;
  href: string;
  anchorHref?: string;
};

type SimpleSubItem = {
  label: string;
  href: string;
};

type NavItem =
  | (BaseItem & {
      kind: "link";
    })
  | (BaseItem & {
      kind: "submenu";
      items: SimpleSubItem[];
    })
  | (BaseItem & {
      kind: "mega";
      items: Array<SimpleSubItem & { icon: JSX.Element }>;
    })
  | (BaseItem & {
      kind: "filters";
      items: SimpleSubItem[];
    });

type MobileState = Record<string, boolean>;

const classNames = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

const DivisionIcons = {
  mining: (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4 6.5 16 3l12 3.5v5.9c0 5.27-2.73 10.17-7.3 12.98L16 29l-4.7-3.62C6.73 22.57 4 17.67 4 12.4Zm3 .9v5c0 4.24 2.2 8.17 5.8 10.35L16 24l3.2-1.25C22.8 20.57 25 16.64 25 12.4v-5L16 5.05Z"
      />
    </svg>
  ),
  solar: (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M16 6a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm-1-8h2v4h-2Zm0 26h2v4h-2ZM2 15h4v2H2Zm24 0h4v2h-4ZM5.76 6.17l1.4-1.42 2.83 2.83-1.4 1.41ZM21 24l2.83-2.83 1.4 1.42L22.4 25.4ZM24.24 6.17 21.4 9l-1.41-1.42 2.83-2.83ZM8.17 21.4l-2.83 2.83 1.41 1.42L9.6 22.8Z"
      />
    </svg>
  ),
  seafood: (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4 16c3.18-4.53 6.9-7 12-7 6.22 0 10.6 3.87 12 7-1.4 3.13-5.78 7-12 7-5.1 0-8.82-2.47-12-7Zm12-5c-3.84 0-6.94 2.1-9.49 5C9.06 18.9 12.16 21 16 21c4.28 0 7.52-2.4 9.5-5-1.98-2.6-5.22-5-9.5-5Zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
      />
    </svg>
  ),
  livestock: (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6 6h4l2 3h8l2-3h4v4h-2l-.26 4.3A6.5 6.5 0 0 1 28 20.5V26h-4v-4h-2v4h-4v-6h-4v6H6v-5.5A6.5 6.5 0 0 1 8.26 14.3L8 10H6Zm4.22 6.2A4.5 4.5 0 0 0 7.5 16.5V24h1.5v-4h4v4H15v-4h6v4h2v-4h4v4h1.5v-4.5a4.5 4.5 0 0 0-2.72-4.3L25 10h-1.86l-1.87 2.8H10.73L8.87 10H7Z"
      />
    </svg>
  ),
  crops: (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M15 2h2v28h-2ZM9 6c2.5 0 5 2.69 5 6s-2.5 6-5 6-5-2.69-5-6 2.5-6 5-6Zm0 2c-1.67 0-3 1.79-3 4s1.33 4 3 4 3-1.79 3-4-1.33-4-3-4Zm14-2c2.5 0 5 2.69 5 6s-2.5 6-5 6-5-2.69-5-6 2.5-6 5-6Zm0 2c-1.67 0-3 1.79-3 4s1.33 4 3 4 3-1.79 3-4-1.33-4-3-4Z"
      />
    </svg>
  ),
  realEstate: (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6 28V11l10-7 10 7v17h-6v-9h-8v9Zm12-20.27L16 6.2l-2 1.53V10h4Z"
      />
    </svg>
  )
} as const;

const NAV_ITEMS: NavItem[] = [
  {
    id: "somos",
    label: "Somos Aisa",
    href: "/somos",
    anchorHref: "/#somos",
    kind: "submenu",
    items: [
      { label: "Historia", href: "/somos/#historia" },
      { label: "Propiedad familiar", href: "/somos/#propiedad" },
      { label: "Valores & excelencia", href: "/somos/#valores" },
      { label: "Equipo directivo", href: "/somos/#equipo" },
      { label: "Estructura corporativa", href: "/somos/#estructura" },
      { label: "Ética & cumplimiento", href: "/somos/#etica" }
    ]
  },
  {
    id: "divisiones",
    label: "Divisiones",
    href: "/divisiones",
    kind: "mega",
    items: [
      { label: "Minería", href: "/divisiones/mineria", icon: DivisionIcons.mining },
      { label: "Energías renovables", href: "/divisiones/energia", icon: DivisionIcons.solar },
      {
        label: "Pesca & mariscos",
        href: "/divisiones/pesca-mariscos",
        icon: DivisionIcons.seafood
      },
      { label: "Carne", href: "/divisiones/carne", icon: DivisionIcons.livestock },
      {
        label: "Productos agrícolas",
        href: "/divisiones/agro",
        icon: DivisionIcons.crops
      },
      {
        label: "Real estate",
        href: "/divisiones/real-estate",
        icon: DivisionIcons.realEstate
      }
    ]
  },
  {
    id: "proyectos",
    label: "Proyectos",
    href: "/proyectos",
    anchorHref: "/#proyectos",
    kind: "filters",
    items: [
      { label: "Todos", href: "/proyectos/#todos" },
      { label: "Minería", href: "/proyectos/#mineria" },
      { label: "Energía", href: "/proyectos/#energia" },
      { label: "Alimentos", href: "/proyectos/#alimentos" },
      { label: "Real estate", href: "/proyectos/#real-estate" },
      { label: "Mapa", href: "/proyectos/#mapa" }
    ]
  },
  {
    id: "actualidad",
    label: "Actualidad",
    href: "/noticias",
    anchorHref: "/#noticias",
    kind: "submenu",
    items: [
      { label: "Sala de prensa", href: "/noticias/#sala-de-prensa" },
      { label: "Notas", href: "/noticias/#notas" },
      { label: "Recursos para medios", href: "/noticias/#recursos" }
    ]
  },
  {
    id: "sostenibilidad",
    label: "Sostenibilidad",
    href: "/esg",
    anchorHref: "/#sostenibilidad",
    kind: "submenu",
    items: [
      { label: "Política ESG", href: "/esg/#politica" },
      { label: "Metas & Reportes", href: "/esg/#metas" },
      { label: "Seguridad & Salud", href: "/esg/#seguridad" },
      { label: "Comunidades", href: "/esg/#comunidades" },
      { label: "Gobernanza", href: "/esg/#gobernanza" }
    ]
  }
];

const isDesktopMatch = () => window.matchMedia("(min-width: 1024px)").matches;

const toHref = (href: string): Route<string> | UrlObject => {
  if (href.includes("#")) {
    const [pathname, hash] = href.split("#");
    return { pathname: pathname || "/", hash };
  }
  return href as Route<string>;
};

export default function Header() {
  const pathname = usePathname();
  const [isCondensed, setIsCondensed] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSections, setMobileSections] = useState<MobileState>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsCondensed(window.scrollY > 32);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current) return;
      if (headerRef.current.contains(event.target as Node)) return;
      setOpenDesktopMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  const handleDesktopOpen = (id: string | null) => {
    if (!isDesktopMatch()) return;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDesktopMenu(id);
  };

  const scheduleClose = () => {
    if (!isDesktopMatch()) return;
    if (prefersReducedMotion) {
      setOpenDesktopMenu(null);
      return;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => setOpenDesktopMenu(null), 150);
  };

  const cancelScheduledClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const desktopMenuOpen = useMemo(() => openDesktopMenu, [openDesktopMenu]);

  const toggleMobileSection = (id: string) => {
    setMobileSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeLanguage = pathname?.startsWith("/en") ? "en" : "es";

  return (
    <header
      ref={headerRef}
      className={classNames("site-header", isCondensed && "site-header--condensed")}
      data-condensed={isCondensed || undefined}
    >
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="AISA Group">
          <span aria-hidden="true">AISA</span>
          <span className="site-header__logo-mark">Group</span>
        </Link>
        <nav className="site-header__nav" aria-label="Menú principal">
          <ul className="site-header__nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href);
              const isOpen = desktopMenuOpen === item.id;
              return (
                <li
                  key={item.id}
                  className={classNames(
                    "site-header__nav-item",
                    item.kind !== "link" && "site-header__nav-item--has-children",
                    isActive && "is-active"
                  )}
                  onMouseEnter={() => handleDesktopOpen(item.id)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => handleDesktopOpen(item.id)}
                  onBlur={scheduleClose}
                >
                  <Link
                    href={toHref(item.href)}
                    className="site-header__trigger"
                    aria-haspopup={item.kind !== "link" ? "true" : undefined}
                    aria-expanded={item.kind !== "link" ? isOpen : undefined}
                    aria-controls={item.kind !== "link" ? `${item.id}-menu` : undefined}
                    onMouseEnter={cancelScheduledClose}
                    onFocus={cancelScheduledClose}
                  >
                    <span>{item.label}</span>
                    {item.kind !== "link" && <span className="site-header__caret" aria-hidden="true">▾</span>}
                  </Link>
                  {item.kind === "submenu" && (
                    <div
                      id={`${item.id}-menu`}
                      role="menu"
                      aria-label={item.label}
                      className={classNames(
                        "site-header__submenu",
                        isOpen && "site-header__submenu--open"
                      )}
                      onMouseEnter={cancelScheduledClose}
                      onMouseLeave={scheduleClose}
                      onFocus={cancelScheduledClose}
                      onBlur={scheduleClose}
                    >
                      <div className="site-header__submenu-body">
                        <div className="site-header__submenu-intro">
                          <Link href={toHref(item.href)} className="site-header__submenu-link">
                            Ver {item.label}
                          </Link>
                          {item.anchorHref && (
                            <Link href={toHref(item.anchorHref)} className="site-header__submenu-link">
                              Ir a sección
                            </Link>
                          )}
                        </div>
                        <ul className="site-header__submenu-list">
                          {item.items.map((subItem) => (
                            <li key={subItem.href}>
                              <Link href={toHref(subItem.href)} role="menuitem">
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  {item.kind === "mega" && (
                    <div
                      id={`${item.id}-menu`}
                      role="menu"
                      aria-label={item.label}
                      className={classNames(
                        "site-header__mega",
                        isOpen && "site-header__mega--open"
                      )}
                      onMouseEnter={cancelScheduledClose}
                      onMouseLeave={scheduleClose}
                      onFocus={cancelScheduledClose}
                      onBlur={scheduleClose}
                    >
                      <div className="site-header__mega-body">
                        {item.items.map((division) => (
                          <Link
                            key={division.href}
                            href={toHref(division.href)}
                            role="menuitem"
                            className="site-header__mega-item"
                          >
                            <span className="site-header__mega-icon">{division.icon}</span>
                            <span>{division.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.kind === "filters" && (
                    <div
                      id={`${item.id}-menu`}
                      role="menu"
                      aria-label={`${item.label} filtros`}
                      className={classNames(
                        "site-header__filters",
                        isOpen && "site-header__filters--open"
                      )}
                      onMouseEnter={cancelScheduledClose}
                      onMouseLeave={scheduleClose}
                      onFocus={cancelScheduledClose}
                      onBlur={scheduleClose}
                    >
                      <div className="site-header__filters-body">
                        <div className="site-header__submenu-intro">
                          <Link href={toHref(item.href)} className="site-header__submenu-link">
                            Ver proyectos
                          </Link>
                          {item.anchorHref && (
                            <Link href={toHref(item.anchorHref)} className="site-header__submenu-link">
                              Ir a sección
                            </Link>
                          )}
                        </div>
                        <ul className="site-header__filters-list">
                          {item.items.map((filter) => (
                            <li key={filter.href}>
                              <Link href={toHref(filter.href)} role="menuitem">
                                {filter.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="site-header__actions">
          <div className="site-header__lang">
            <Link
              href="/"
              className={classNames(
                "site-header__lang-link",
                activeLanguage === "es" && "is-active"
              )}
              aria-current={activeLanguage === "es" ? "page" : undefined}
            >
              ES
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/en"
              className={classNames(
                "site-header__lang-link",
                activeLanguage === "en" && "is-active"
              )}
              aria-current={activeLanguage === "en" ? "page" : undefined}
            >
              EN
            </Link>
          </div>
          <Link href={toHref("/contacto")} className="site-header__cta">
            Contactar
          </Link>
          <button
            type="button"
            className="site-header__burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <>
          <div
            className="site-header__overlay"
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="site-header__mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
          >
            <div className="site-header__mobile-header">
              <p>Menú</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="site-header__mobile-close"
                aria-label="Cerrar menú"
              >
                <span />
                <span />
              </button>
            </div>
            <div className="site-header__mobile-lang">
              <Link
                href="/"
                className={classNames(
                  "site-header__lang-link",
                  activeLanguage === "es" && "is-active"
                )}
                onClick={() => setMobileOpen(false)}
              >
                ES
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/en"
                className={classNames(
                  "site-header__lang-link",
                  activeLanguage === "en" && "is-active"
                )}
                onClick={() => setMobileOpen(false)}
              >
                EN
              </Link>
            </div>
            <nav className="site-header__mobile-nav">
              <ul>
                {NAV_ITEMS.map((item) => {
                  const expanded = mobileSections[item.id] ?? false;
                  const hasChildren = item.kind !== "link";
                  return (
                    <li key={item.id}>
                      <div className="site-header__mobile-item">
                        <Link
                          href={toHref(item.href)}
                          onClick={() => setMobileOpen(false)}
                          className="site-header__mobile-link"
                        >
                          {item.label}
                        </Link>
                        {hasChildren && (
                          <button
                            type="button"
                            className="site-header__mobile-toggle"
                            aria-expanded={expanded}
                            onClick={() => toggleMobileSection(item.id)}
                            aria-controls={`${item.id}-mobile`}
                          >
                            <span>{expanded ? "−" : "+"}</span>
                          </button>
                        )}
                      </div>
                      {hasChildren && (
                        <div
                          id={`${item.id}-mobile`}
                          className={classNames(
                            "site-header__mobile-submenu",
                            expanded && "site-header__mobile-submenu--open"
                          )}
                        >
                          <ul>
                            {(item.kind === "mega" || item.kind === "submenu" || item.kind === "filters") &&
                              item.items.map((subItem) => (
                                <li key={subItem.href}>
                              <Link
                                href={toHref(subItem.href)}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {subItem.label}
                                  </Link>
                                </li>
                              ))}
                            {item.anchorHref && (
                              <li>
                                <Link href={toHref(item.anchorHref)} onClick={() => setMobileOpen(false)}>
                                  Ir a sección
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="site-header__mobile-footer">
              <Link href={toHref("/contacto")} onClick={() => setMobileOpen(false)}>
                Contactar
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

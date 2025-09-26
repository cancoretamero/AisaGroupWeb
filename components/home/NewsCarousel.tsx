"use client";

import Link from "next/link";
import type { Route } from "next";
import type { UrlObject } from "url";
import { useEffect, useRef, useState } from "react";

type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

type NewsCarouselProps = {
  items: NewsItem[];
  intervalMs?: number;
};

export default function NewsCarousel({ items, intervalMs = 7000 }: NewsCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [items.length]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = Array.from(containerRef.current.children) as HTMLElement[];
    const target = cards[index];
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", inline: "start" });
    }
  }, [index, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || paused || items.length <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, paused, items.length, intervalMs]);

  const handleInteractionStart = () => setPaused(true);
  const handleInteractionEnd = () => setPaused(false);

  const toHref = (href: string): Route<string> | UrlObject => {
    if (href.includes("#")) {
      const [pathname, hash] = href.split("#");
      return { pathname: pathname || "/", hash };
    }
    return href as Route<string>;
  };

  return (
    <div
      className="slider"
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
    >
      <div
        ref={containerRef}
        className="slider__track"
        onFocusCapture={handleInteractionStart}
        onBlurCapture={handleInteractionEnd}
        aria-label="Noticias recientes"
        role="list"
      >
        {items.map((item) => (
          <article key={item.href} className="news-card" role="listitem">
            <div className="news-card__visual">
              <span>Actualidad</span>
            </div>
            <div className="news-card__body">
              <span className="news-card__date">{item.date}</span>
              <h3 className="news-card__title">{item.title}</h3>
              <p className="news-card__excerpt">{item.excerpt}</p>
              <Link href={toHref(item.href)} className="news-card__cta">
                Leer
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

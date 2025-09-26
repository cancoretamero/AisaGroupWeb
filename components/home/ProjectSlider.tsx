"use client";

import Link from "next/link";
import type { Route } from "next";
import type { UrlObject } from "url";
import { useEffect, useRef, useState } from "react";

type ProjectItem = {
  title: string;
  tag: string;
  description: string;
  href: string;
};

type ProjectSliderProps = {
  items: ProjectItem[];
  intervalMs?: number;
};

export default function ProjectSlider({ items, intervalMs = 7000 }: ProjectSliderProps) {
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
        aria-label="Proyectos destacados"
        role="list"
      >
        {items.map((item) => (
          <article key={item.href} className="slider__card" role="listitem">
            <div className="slider__visual">
              <span className="slider__tag">{item.tag}</span>
            </div>
            <div className="slider__content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={toHref(item.href)} className="link-cta">
                Ver proyecto
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

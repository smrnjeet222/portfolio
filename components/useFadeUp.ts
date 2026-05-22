"use client";

import { useEffect, useRef } from "react";

export function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Determine direction: if user scrolled down, slide from bottom; up → from top
          const scrollingDown = window.scrollY >= lastScrollY;
          if (scrollingDown) {
            el.classList.remove("from-top");
          } else {
            el.classList.add("from-top");
          }
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    const onScroll = () => { lastScrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return ref;
}

"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    // ❌ Jika bukan desktop → hentikan
    if (!isDesktop) return;

    // ✅ Hanya desktop yang pakai Lenis
    const lenis = new Lenis({
      duration: 1.4,
      lerp: 0.07,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.6,
      gestureOrientation: "vertical",
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

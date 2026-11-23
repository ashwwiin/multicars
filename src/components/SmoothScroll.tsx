"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const lenisRef = useRef<LenisRef>(null);

  // Reset scroll to top immediately when navigating between routes
  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.05, // Lower value = longer, more luxurious floating drift
        wheelMultiplier: 1.15, // Smooth travel distance per wheel tick
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.05,
        touchInertiaExponent: 2.0,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

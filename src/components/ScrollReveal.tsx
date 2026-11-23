"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  childSelector?: string;
  stagger?: number;
  yOffset?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  childSelector,
  stagger = 0.08,
  yOffset = 30,
  duration = 0.8,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (childSelector) {
          gsap.set(containerRef.current.querySelectorAll(childSelector), {
            opacity: 1,
            y: 0,
          });
        } else {
          gsap.set(containerRef.current, { opacity: 1, y: 0 });
        }
        return;
      }

      const targets = childSelector
        ? containerRef.current.querySelectorAll(childSelector)
        : containerRef.current;

      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: childSelector ? stagger : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [childSelector, stagger, yOffset, duration, delay] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

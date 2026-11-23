"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Register ScrollTrigger once on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!countRef.current) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        countRef.current.textContent = value.toLocaleString();
        return;
      }

      const counter = { val: 0 };

      gsap.to(counter, {
        val: value,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = Math.round(counter.val).toLocaleString();
          }
        },
      });
    },
    { scope: containerRef, dependencies: [value] }
  );

  return (
    <div ref={containerRef}>
      <dt className="text-sm text-steel-600 uppercase font-mono tracking-wider">{label}</dt>
      <dd className="display text-5xl lg:text-6xl text-ink mt-1">
        <span ref={countRef}>0</span>
        {suffix}
      </dd>
    </div>
  );
}

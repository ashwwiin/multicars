"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { useRef } from "react";
import { services } from "@/lib/services";
import { money } from "@/lib/site";

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLenis(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalDistance = rect.height - windowHeight;
    if (totalDistance <= 0) return;

    // Calculate normalized progress within this section (0 to 1)
    const progress = Math.min(Math.max(-rect.top / totalDistance, 0), 1);

    // Calculate maximum horizontal travel
    const trackWidth = trackRef.current.scrollWidth;
    const viewWidth = window.innerWidth;
    const maxTranslate = Math.max(0, trackWidth - viewWidth + 96);

    trackRef.current.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] bg-steel-100 border-t-2 border-b-2 border-ink"
    >
      {/* Pinned viewport window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center gap-12 sm:gap-14 py-6 sm:py-8">
        {/* Header inside pinned track */}
        <div className="mx-auto w-full max-w-[1720px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="display text-4xl sm:text-6xl lg:text-7xl text-ink">
            SERVICES IN MOTION.
          </h2>
        </div>

        {/* Sliding horizontal track */}
        <div className="w-full overflow-visible">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 sm:gap-8 px-6 sm:px-12 lg:px-16 will-change-transform transition-transform ease-out"
            style={{ width: "max-content" }}
          >
            {services.map((service, index) => (
              <div
                key={service.slug}
                className="group relative flex flex-col justify-between rounded-2xl border-2 border-ink bg-white p-6 sm:p-8 w-[310px] sm:w-[380px] shrink-0 shadow-[6px_6px_0px_0px_#13222b] hover:shadow-[10px_10px_0px_0px_#ffd60a] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-steel-600">
                      SERVICE 0{index + 1}
                    </span>
                    <span className="rounded-full bg-hivis px-2.5 py-0.5 text-xs font-bold text-ink">
                      from {money(service.from)}
                    </span>
                  </div>

                  <h3 className="display-sm mt-5 text-2xl sm:text-3xl text-ink group-hover:text-ink-soft">
                    {service.name}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-steel-600 line-clamp-3">
                    {service.summary}
                  </p>

                  <div className="mt-6 border-t border-steel-100 pt-4">
                    <span className="font-mono text-xs font-semibold text-steel-600 uppercase">
                      INCLUDES:
                    </span>
                    <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-ink">
                      {service.includes.slice(0, 3).map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <span className="text-hivis-deep font-bold">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t-2 border-ink flex items-center justify-between">
                  <span className="text-xs font-mono text-steel-600">
                    DURATION: {service.time}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-ink underline decoration-2 underline-offset-4 group-hover:text-hivis-deep"
                  >
                    View Service →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

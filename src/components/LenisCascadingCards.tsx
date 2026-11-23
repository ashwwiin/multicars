"use client";

import { useLenis } from "lenis/react";
import React, { useRef, useState } from "react";
import { processSteps } from "@/lib/services";

const stepBadges = [
  "STAGE 01 // DROP-OFF",
  "STAGE 02 // DIAGNOSTICS",
  "STAGE 03 // ESTIMATE",
  "STAGE 04 // EXECUTION",
  "STAGE 05 // HANDOVER",
];

export function LenisCascadingCards() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Sync with Lenis smooth scroll loop to drive progress through the runway
  useLenis(() => {
    if (!runwayRef.current) return;
    const rect = runwayRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalDistance = rect.height - windowHeight;
    if (totalDistance <= 0) return;

    const p = Math.min(Math.max(-rect.top / totalDistance, 0), 1);
    setProgress(p);
  });

  const count = processSteps.length;

  return (
    <section
      ref={runwayRef}
      className="relative h-[380vh] bg-steel-50 border-t-2 border-b-2 border-ink"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start p-6 sm:p-10 lg:p-14 xl:p-16">
        {/* Top Section Header - anchored top right */}
        <div className="mx-auto w-full max-w-[1720px] relative z-30 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink bg-white px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-ink uppercase shadow-sm">
              <span className="h-2 w-2 rounded-full bg-signal" />
              HOW WE REPAIR
            </div>
          </div>

          <div className="text-right">
            <h2 className="display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-ink leading-[0.9]">
              HOW WE REPAIR.
            </h2>
            <p className="mt-1 font-mono text-xs sm:text-sm text-steel-600">
              MULTI CARS 5-PHASE PROTOCOL
            </p>
          </div>
        </div>

        {/* Desktop Cascading Deck (Diagonal Staircase Overlap, exact lenis.dev math) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {processSteps.map((step, i) => {
            const stepThreshold = i === 0 ? 0 : (i - 0.5) / (count - 0.8);
            const isVisible = progress >= stepThreshold;
            const revealProgress = Math.min(
              Math.max((progress - stepThreshold) / 0.16, 0),
              1
            );

            // Diagonal coordinates spread across full widescreen
            const leftPercent = 5 + (i * (68 / (count - 1)));
            const topPercent = 17 + (i * (42 / (count - 1)));

            const translateY = (1 - revealProgress) * 70;
            const opacity = isVisible ? revealProgress : 0;
            const scale = 0.95 + revealProgress * 0.05;

            return (
              <div
                key={step.title}
                className="absolute pointer-events-auto transition-all duration-300 ease-out"
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  zIndex: i + 10,
                  transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                  opacity,
                }}
              >
                <div className="w-[330px] xl:w-[370px] aspect-square flex flex-col justify-between p-7 xl:p-8 rounded-none border-2 border-ink bg-white/95 backdrop-blur-md shadow-[10px_10px_0px_0px_#13222b] hover:shadow-[14px_14px_0px_0px_#ffd60a] transition-all duration-200">
                  {/* Top: Large Numeral + Stage Badge */}
                  <div className="flex items-start justify-between">
                    <span className="display text-6xl text-signal font-black leading-none">
                      0{i + 1}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-ink border border-ink px-2 py-0.5 bg-hivis">
                      {stepBadges[i]}
                    </span>
                  </div>

                  {/* Bottom: Title & Body */}
                  <div>
                    <h3 className="display-sm text-2xl text-ink uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs text-steel-600 leading-relaxed font-sans line-clamp-3">
                      {step.body}
                    </p>

                    <div className="mt-4 pt-3 border-t border-steel-300 flex items-center justify-between text-[10px] font-mono text-steel-600">
                      <span>VERIFIED STEP</span>
                      <span className="text-ink font-bold">MULTI CARS ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Cascading Deck (Stacked Overlap) */}
        <div className="block lg:hidden relative z-20 flex-1 my-auto flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square">
            {processSteps.map((step, i) => {
              const stepThreshold = i === 0 ? 0 : (i - 0.5) / (count - 0.8);
              const isVisible = progress >= stepThreshold;
              const revealProgress = Math.min(
                Math.max((progress - stepThreshold) / 0.16, 0),
                1
              );

              const translateY = (1 - revealProgress) * 50;
              const offsetTop = i * 20;
              const scale = 1 - (count - 1 - i) * 0.03;

              return (
                <div
                  key={step.title}
                  className="absolute inset-x-0 transition-all duration-300 ease-out"
                  style={{
                    top: `${offsetTop}px`,
                    zIndex: i + 10,
                    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
                    opacity: isVisible ? revealProgress : 0,
                  }}
                >
                  <div className="w-full p-6 border-2 border-ink bg-white/95 backdrop-blur-md shadow-[6px_6px_0px_0px_#13222b]">
                    <div className="flex items-center justify-between">
                      <span className="display text-4xl text-signal font-black">
                        0{i + 1}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-ink bg-hivis px-2 py-0.5 border border-ink">
                        {stepBadges[i]}
                      </span>
                    </div>
                    <h3 className="display-sm mt-3 text-xl text-ink uppercase">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs text-steel-600">
                      {step.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clean bottom - no runway text, progress bar, or footer collisions */}
      </div>
    </section>
  );
}

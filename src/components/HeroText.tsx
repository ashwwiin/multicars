"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import { Magnetic } from "./Magnetic";
import { OpenNow } from "./OpenNow";
import { ExternalButton, Icon, LinkButton } from "./ui";
import { site, whatsappHref } from "@/lib/site";

const HEADLINE_TEXT = "Tell us what’s wrong. Get a written quote before we touch the car.";

export function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const skewQuickTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      // Respect accessibility preferences
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([".hero-char", ".hero-sub", ".hero-cta", ".hero-info", ".hero-cursor"], {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          scale: 1,
        });
        return;
      }

      // Initialize quickTo for velocity skew on the headline
      if (h1Ref.current) {
        skewQuickTo.current = gsap.quickTo(h1Ref.current, "skewY", {
          duration: 0.35,
          ease: "power3.out",
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Kinetic Letter-by-Letter / Typewriter reveal
      tl.fromTo(
        ".hero-char",
        { y: "115%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.28,
          stagger: 0.02,
          ease: "power3.out",
        }
      )
        // 2. Cursor appears as typing completes
        .to(".hero-cursor", { opacity: 1, duration: 0.15 }, "-=0.25")
        // 3. Subtitle fades up
        .fromTo(
          ".hero-sub",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
          "-=0.4"
        )
        // 4. CTA buttons pop in
        .fromTo(
          ".hero-cta",
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        )
        // 5. Badges (OpenNow, location) fade in
        .fromTo(
          ".hero-info",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );

      // Blinking typing cursor loop
      gsap.to(".hero-cursor", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.53,
        ease: "steps(1)",
        delay: 1.35,
      });
    },
    { scope: containerRef }
  );

  // GSAP + Lenis Velocity Text Skew: text dynamically skews during high-speed scroll
  useLenis((lenis) => {
    if (!skewQuickTo.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const clampedSkew = Math.max(-3.5, Math.min(3.5, lenis.velocity * 0.08));
    skewQuickTo.current(clampedSkew);
  });

  const words = HEADLINE_TEXT.split(" ");

  return (
    <div ref={containerRef}>
      <h1
        ref={h1Ref}
        aria-label={HEADLINE_TEXT}
        className="display text-[2.75rem] sm:text-[3.8rem] lg:text-[4.4rem] xl:text-[5rem] leading-[1.02] tracking-tight will-change-transform"
      >
        <span aria-hidden="true">
          {words.map((word, wIdx) => {
            const isLastWord = wIdx === words.length - 1;

            return (
              <span
                key={wIdx}
                className="hero-word inline-block whitespace-nowrap mr-[0.24em] last:mr-0"
              >
                {word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-block overflow-hidden align-bottom pb-[0.08em]"
                  >
                    <span className="hero-char inline-block translate-y-[115%] opacity-0 will-change-transform">
                      {char}
                    </span>
                  </span>
                ))}
                {isLastWord && (
                  <span
                    aria-hidden
                    className="hero-cursor inline-block w-[0.14em] h-[0.75em] bg-hivis ml-1 align-baseline rounded-[1px] select-none pointer-events-none overflow-hidden"
                    style={{ verticalAlign: "-0.02em" }}
                  >
                    &nbsp;
                  </span>
                )}
              </span>
            );
          })}
        </span>
      </h1>

      <p className="hero-sub mt-6 max-w-2xl text-lg text-steel-600 sm:text-xl lg:text-2xl opacity-0 will-change-transform">
        {site.name} diagnoses, explains and fixes. You see the problem, the
        price and the timeline first, and nothing starts until you approve.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="hero-cta opacity-0 will-change-transform">
          <Magnetic strength={0.25}>
            <LinkButton href="/book">Book a service</LinkButton>
          </Magnetic>
        </div>
        <div className="hero-cta opacity-0 will-change-transform">
          <Magnetic strength={0.25}>
            <ExternalButton
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <Icon name="whatsapp" />
              WhatsApp us
            </ExternalButton>
          </Magnetic>
        </div>
      </div>

      <div className="hero-info mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-steel-600 opacity-0 will-change-transform">
        <OpenNow />
        <span className="inline-flex items-center gap-2 text-sm">
          <Icon name="pin" className="h-4 w-4" />
          {site.address.locality}
        </span>
      </div>
    </div>
  );
}

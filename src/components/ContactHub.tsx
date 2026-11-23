"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Magnetic } from "./Magnetic";
import { OpenNow } from "./OpenNow";
import { Container, Icon } from "./ui";
import { hoursSummary, site, whatsappHref } from "@/lib/site";

// Spotlight Card component inspired by React Bits
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 204, 0, 0.16)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border-2 border-ink bg-white p-6 transition-all duration-300 hover:shadow-[6px_6px_0_0_var(--color-ink)] hover:-translate-y-1 ${className}`}
    >
      {/* React Bits dynamic spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// 1-Click Copy Button with animated check feedback
function CopyButton({
  text,
  label = "Copy",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 rounded-md border-2 border-ink bg-steel-100 px-3 py-1.5 text-xs font-bold text-ink transition-all duration-150 hover:bg-hivis active:scale-95 ${
        copied ? "!bg-emerald-500 !text-white !border-emerald-600" : ""
      } ${className}`}
      title={`Copy "${text}" to clipboard`}
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

export function ContactHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const a = site.address;

  // GSAP kinetic entrance animation
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([".contact-header", ".contact-tile", ".map-card", ".info-card"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".contact-header",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
        .fromTo(
          ".contact-tile",
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )
        .fromTo(
          ".map-card",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          ".info-card",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="py-12 sm:py-16 lg:py-20">
      <Container className="space-y-12">
        {/* Intro Status Strip */}
        <div className="contact-header flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-steel-600">
                Direct Workshop Desk
              </span>
            </div>
            <h2 className="display mt-2 text-4xl sm:text-5xl lg:text-6xl">
              Get in touch directly.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <OpenNow />
            <span className="rounded-full border-2 border-ink bg-white px-3.5 py-1 text-sm font-semibold">
              📍 {a.locality}, Kerala
            </span>
          </div>
        </div>

        {/* 1. Quick Action Communication Tiles (Simplified & Clean) */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tile 1: Primary Line */}
          <SpotlightCard className="contact-tile flex flex-col justify-between p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-hivis shadow-sm">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-steel-500">
                    Primary Line
                  </span>
                  <h3 className="display-sm text-lg leading-tight text-ink">
                    Service & Emergency
                  </h3>
                </div>
              </div>
              <CopyButton text={site.phoneDigits} label="Copy" className="!text-xs !py-1 !px-2.5 shrink-0" />
            </div>

            <div className="mt-4">
              <Magnetic strength={0.2} className="w-full">
                <a
                  href={`tel:${site.phoneDigits}`}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-ink bg-hivis px-4 py-2.5 font-mono text-sm sm:text-base font-bold text-ink shadow-[2px_2px_0_0_var(--color-ink)] hover:bg-hivis-deep hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  <span>{site.phoneDisplay}</span>
                </a>
              </Magnetic>
            </div>
          </SpotlightCard>

          {/* Tile 2: Secondary Line */}
          <SpotlightCard className="contact-tile flex flex-col justify-between p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-steel-100 text-ink shadow-sm">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-steel-500">
                    Secondary Line
                  </span>
                  <h3 className="display-sm text-lg leading-tight text-ink">
                    Bodywork & Queries
                  </h3>
                </div>
              </div>
              <CopyButton text={site.secondaryPhoneDigits} label="Copy" className="!text-xs !py-1 !px-2.5 shrink-0" />
            </div>

            <div className="mt-4">
              <Magnetic strength={0.2} className="w-full">
                <a
                  href={`tel:${site.secondaryPhoneDigits}`}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-ink bg-white px-4 py-2.5 font-mono text-sm sm:text-base font-bold text-ink shadow-[2px_2px_0_0_var(--color-ink)] hover:bg-steel-50 hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  <span>{site.secondaryPhoneDisplay}</span>
                </a>
              </Magnetic>
            </div>
          </SpotlightCard>

          {/* Tile 3: WhatsApp Chat */}
          <SpotlightCard
            className="contact-tile flex flex-col justify-between p-5 sm:col-span-2 lg:col-span-1"
            spotlightColor="rgba(37, 211, 102, 0.18)"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-sm">
                  <Icon name="whatsapp" className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Direct Chat
                  </span>
                  <h3 className="display-sm text-lg leading-tight text-ink">
                    WhatsApp Message
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>

            <div className="mt-4">
              <Magnetic strength={0.2} className="w-full">
                <a
                  href={whatsappHref("Hi Multi Cars, I'd like an estimate or advice for my car.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-[#1fa851] bg-[#25D366] px-4 py-2.5 text-sm sm:text-base font-bold text-white shadow-[2px_2px_0_0_var(--color-ink)] hover:bg-[#20ba5a] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </Magnetic>
            </div>
          </SpotlightCard>
        </div>

        {/* 2. Interactive Workshop Map Hub (Compact 2-Column Split Layout) */}
        <div className="map-card overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-[6px_6px_0_0_var(--color-ink)]">
          <div className="grid lg:grid-cols-12 items-stretch">
            {/* Left Column: Workshop Details, Address, Proximity, Actions */}
            <div className="flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-ink p-6 sm:p-8 lg:col-span-5 bg-white">
              <div>
                {/* Header status */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-steel-600">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Google Verified
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center font-bold text-amber-500">
                    4.0 ★★★★☆
                  </span>
                </div>

                <h3 className="display-sm mt-2 text-2xl sm:text-3xl text-ink">
                  Multi Cars Service Point
                </h3>

                {/* Address */}
                <div className="mt-3 rounded-lg border border-steel-200 bg-steel-50 p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-ink text-sm sm:text-base leading-snug">
                        {a.street}
                      </p>
                      <p className="text-xs sm:text-sm text-steel-600 mt-0.5">
                        {a.locality}, {a.region} {a.postalCode}
                      </p>
                    </div>
                    <CopyButton
                      text={`${a.street}, ${a.locality}, ${a.region} ${a.postalCode}`}
                      label="Copy"
                      className="shrink-0"
                    />
                  </div>
                </div>

                {/* Landmark & Plus Code */}
                <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-steel-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hivis text-ink ring-1 ring-ink">
                      <Icon name="pin" className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      <strong className="text-ink">Landmark:</strong> Paliyath Valappu Junction
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-steel-700">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-steel-100 text-ink ring-1 ring-ink">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                      </span>
                      <span>
                        <strong className="text-ink">Plus Code:</strong> {site.plusCode} Morazha
                      </span>
                    </div>
                    <CopyButton text={site.plusCode} label="Copy" className="!py-0.5 !px-2 !text-[11px]" />
                  </div>

                  <div className="flex items-center gap-2.5 text-steel-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-steel-100 text-ink ring-1 ring-ink">
                      <Icon name="clock" className="h-3.5 w-3.5" />
                    </span>
                    <span>5 mins from Kannapuram Railway Station</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-steel-200">
                <Magnetic strength={0.2} className="flex-1">
                  <a
                    href={site.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-ink bg-hivis px-4 py-2.5 text-sm font-bold text-ink shadow-[2px_2px_0_0_var(--color-ink)] hover:bg-hivis-deep hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    <Icon name="pin" className="h-4 w-4" />
                    Get directions
                  </a>
                </Magnetic>
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border-2 border-ink bg-white px-3.5 py-2.5 text-sm font-bold text-ink hover:bg-steel-50"
                  title="Open in Google Maps App"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>

            {/* Right Column: Compact Google Map Embed */}
            <div className="relative h-64 sm:h-72 lg:h-full min-h-[280px] lg:min-h-[340px] bg-steel-100 lg:col-span-7">
              {site.mapsEmbed ? (
                <iframe
                  title={`Google Map for ${site.name}`}
                  src={site.mapsEmbed}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : null}

              {/* Floating location tag */}
              <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-ink/30 bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink shadow-sm backdrop-blur-sm">
                📍 Multi Cars, Morazha
              </div>
            </div>
          </div>
        </div>

        {/* 3. Opening Hours & Visiting Guidelines Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Card A: Opening Hours */}
          <div className="info-card rounded-2xl border-2 border-ink bg-white p-6 sm:p-8 shadow-[4px_4px_0_0_var(--color-ink)]">
            <div className="flex items-center justify-between border-b-2 border-ink pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-hivis text-ink">
                  <Icon name="clock" className="h-5 w-5" />
                </span>
                <h3 className="display-sm text-2xl">Opening hours</h3>
              </div>
              <OpenNow />
            </div>

            <dl className="mt-6 space-y-3">
              {hoursSummary().map((r, i) => (
                <div
                  key={r.label}
                  className={`flex items-center justify-between rounded-lg p-3 text-sm sm:text-base ${
                    i === 0
                      ? "bg-steel-50 border border-steel-200 font-medium"
                      : "border-b border-steel-200"
                  }`}
                >
                  <dt className="text-ink font-semibold">{r.label}</dt>
                  <dd className="font-mono font-bold text-ink">{r.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-steel-600">
              * Emergency breakdown support is available by phone during and slightly outside regular business hours.
            </p>
          </div>

          {/* Card B: What to Expect When Dropping Off + Email */}
          <div className="info-card flex flex-col justify-between rounded-2xl border-2 border-ink bg-ink text-white p-6 sm:p-8 shadow-[4px_4px_0_0_var(--color-ink)]">
            <div>
              <div className="flex items-center gap-3 border-b border-white/20 pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-hivis text-ink font-bold">
                  ✓
                </span>
                <h3 className="display-sm text-2xl text-white">Dropping off your car?</h3>
              </div>

              <ul className="mt-6 space-y-4 text-sm sm:text-base text-steel-100">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hivis text-ink text-xs font-bold">
                    1
                  </span>
                  <span>
                    <strong className="text-white">No appointment strictly necessary:</strong> You can drive in directly for diagnostics, quick inspections, or breakdown drop-off.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hivis text-ink text-xs font-bold">
                    2
                  </span>
                  <span>
                    <strong className="text-white">Quote before any tool touches the car:</strong> We inspect the issue, list parts and labour, and await your green light.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hivis text-ink text-xs font-bold">
                    3
                  </span>
                  <span>
                    <strong className="text-white">Old parts kept for review:</strong> We hold worn or replaced parts so you see exactly what was swapped out.
                  </span>
                </li>
              </ul>
            </div>

            {/* Direct Email row */}
            <div className="mt-8 rounded-xl border border-white/20 bg-white/5 p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase tracking-wider text-steel-300">Official Email</span>
                <p className="font-mono text-sm font-semibold text-white">{site.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton
                  text={site.email}
                  label="Copy"
                  className="!border-white/30 !bg-white/10 !text-white hover:!bg-hivis hover:!text-ink"
                />
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-md border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white hover:text-ink transition-colors"
                >
                  Send email ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Trust Anchor */}
        <div className="info-card flex flex-wrap items-center justify-between gap-4 rounded-xl border-2 border-dashed border-ink bg-hivis/20 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hivis text-ink font-bold ring-2 ring-ink">
              ★
            </span>
            <div>
              <h4 className="font-bold text-ink">Prefer to leave a review or view past feedback?</h4>
              <p className="text-sm text-steel-600">
                See verified local feedback from Kannur &amp; Morazha drivers or leave your own review.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/reviews"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border-2 border-ink bg-white px-4 py-2 text-sm font-bold text-ink hover:bg-ink hover:text-white"
            >
              Read customer reviews →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

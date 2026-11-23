"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { Magnetic } from "./Magnetic";
import { Icon, LinkButton } from "./ui";

export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="display-sm inline-flex items-center gap-2.5 text-2xl leading-none">
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        className="h-8 w-8 shrink-0 rounded-[8px] transition-transform duration-200 group-hover:scale-105"
      >
        <rect width="64" height="64" rx="16" fill="#13222B" />
        <rect
          x="2.5"
          y="2.5"
          width="59"
          height="59"
          rx="13.5"
          fill="none"
          stroke="#FFCC00"
          strokeWidth="3"
        />
        <path
          d="M21 26 L26.5 15 C27.5 13 29.5 12.5 32 12.5 C34.5 12.5 36.5 13 37.5 15 L43 26 Z"
          fill="#FFCC00"
        />
        <path
          d="M23.5 25 L28 16 C28.8 14.5 30 14 32 14 C34 14 35.2 14.5 36 16 L40.5 25 Z"
          fill="#13222B"
        />
        <path
          d="M13 30 C11.5 31 10.5 33 10.5 36 L10.5 42 C10.5 45 12.5 46.5 15.5 46.5 L18 46.5 C20 46.5 21.5 44.5 22.5 42.5 L23.5 40 C24.5 38 26.5 37 28.5 37 L35.5 37 C37.5 37 39.5 38 40.5 40 L41.5 42.5 C42.5 44.5 44 46.5 46 46.5 L48.5 46.5 C51.5 46.5 53.5 45 53.5 42 L53.5 36 C53.5 33 52.5 31 51 30 L45 27 C43 26 41 25.5 39 25.5 L25 25.5 C23 25.5 21 26 19 27 Z"
          fill="#FFCC00"
        />
        <polygon points="15,33 23.5,33 21.5,37 14,37" fill="#FFFFFF" />
        <polygon points="49,33 40.5,33 42.5,37 50,37" fill="#FFFFFF" />
        <path
          d="M26 40.5 L29 45.5 C30 46.5 31 47 32 47 C33 47 34 46.5 35 45.5 L38 40.5 Z"
          fill="#13222B"
        />
        <path
          d="M28 41 L32 45 L36 41"
          fill="none"
          stroke="#FFCC00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="31" r="2" fill="#E02438" />
      </svg>
      <span className="inline-flex items-center">
        <span className={dark ? "text-white" : "text-ink"}>Multi</span>
        <span className="ml-1 rounded-[4px] bg-hivis px-1.5 py-0.5 text-ink">
          Cars
        </span>
      </span>
    </span>
  );
}

export function Header() {
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openFor === pathname;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-steel-50/95 backdrop-blur">
      <div
        className="mx-auto flex w-full max-w-[1720px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16"
        style={{ height: "var(--header-h)" }}
      >
        <Link href="/" aria-label={`${site.name} home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.97rem] font-medium underline-offset-8 hover:underline ${active ? "underline decoration-2" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneDigits}`}
            className="hidden items-center gap-2 text-sm font-semibold xl:inline-flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <Magnetic strength={0.25} className="max-sm:hidden">
            <LinkButton
              href="/book"
              className="!min-h-10 !px-4 !py-2 text-sm"
            >
              Book a service
            </LinkButton>
          </Magnetic>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenFor(open ? null : pathname)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t-2 border-ink bg-steel-50 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-steel-300 py-3.5 text-lg font-medium"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <LinkButton href="/book" className="w-full">
                Book a service
              </LinkButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

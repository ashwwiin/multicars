import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "light";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold leading-none transition-colors duration-150 min-h-12 text-[1rem]";

const variants: Record<Variant, string> = {
  primary:
    "bg-hivis text-ink border-2 border-ink hover:bg-hivis-deep shadow-[3px_3px_0_0_var(--color-ink)] hover:shadow-[1px_1px_0_0_var(--color-ink)] hover:translate-x-[2px] hover:translate-y-[2px]",
  dark: "bg-ink text-white border-2 border-ink hover:bg-ink-soft",
  outline:
    "bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-white",
  light:
    "bg-white text-ink border-2 border-white hover:bg-steel-100 hover:border-steel-100",
};

export function LinkButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; children: ReactNode }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function ExternalButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1720px] px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark pegboard bg-ink text-white">
      <Container className="py-14 sm:py-20">
        <h1 className="display max-w-3xl text-5xl sm:text-7xl">{title}</h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-lg text-steel-100 sm:text-xl">
            {lead}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: "phone" | "whatsapp" | "pin" | "clock" | "check" | "arrow" | "menu" | "close";
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };
  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3 21l1.7-5.1A8.5 8.5 0 1 1 8 19.4L3 21Z" />
          <path d="M9 10c0 3 2.5 5 5 5l1.2-1.2a.8.8 0 0 0 0-1l-1.3-.9a.8.8 0 0 0-1 .1l-.4.4c-.9-.4-1.7-1.200-2.100-2.100l.4-.4a.8.8 0 0 0 .1-1L10 7.700a.8.8 0 0 0-1 0L9 10Z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
  }
}

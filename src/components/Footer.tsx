import Link from "next/link";
import { hoursSummary, nav, site, whatsappHref } from "@/lib/site";
import { services } from "@/lib/services";
import { Wordmark } from "./Header";
import { Container } from "./ui";

export function Footer() {
  const a = site.address;
  return (
    <footer className="on-dark mt-auto bg-ink text-steel-100">
      <Container className="grid gap-10 py-14 pb-24 md:grid-cols-4 md:pb-14">
        <div className="md:col-span-1">
          <Wordmark dark />
          <p className="mt-4 text-sm text-steel-300">{site.tagline}.</p>
        </div>

        <div>
          <h2 className="display-sm text-lg text-white">Services</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link className="hover:underline" href={`/services/${s.slug}`}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="display-sm text-lg text-white">Visit us</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {a.street}
            <br />
            {a.locality}, {a.region} {a.postalCode}
          </address>
          <ul className="mt-3 space-y-1 text-sm">
            {hoursSummary().map((r) => (
              <li key={r.label} className="flex justify-between gap-4">
                <span>{r.label}</span>
                <span className="text-white">{r.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="display-sm text-lg text-white">Talk to us</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a className="hover:underline" href={`tel:${site.phoneDigits}`}>
                Call {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:underline" href={`tel:${site.secondaryPhoneDigits}`}>
                Call {site.secondaryPhoneDisplay}
              </a>
            </li>
            <li>
              <a
                className="hover:underline"
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
            </li>
            <li>
              <a className="hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-steel-300">
            {nav.map((n) => (
              <li key={n.href}>
                <Link className="hover:text-white hover:underline" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/15">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-5 pb-24 text-xs text-steel-300 md:pb-5">
          <span>© {site.name}. All rights reserved.</span>
          <Link href="/privacy" className="hover:text-white hover:underline">
            Privacy policy
          </Link>
        </Container>
      </div>
    </footer>
  );
}

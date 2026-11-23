import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/figtree/index.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Car repair and service`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} repairs and services cars. Describe the problem, get a written quote before any work starts, and book online or by phone.`,
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Car repair and service`,
    description: site.tagline,
    images: [{ url: "/logo.svg", width: 512, height: 512, alt: `${site.name} logo` }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#13222b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  url: site.url,
  telephone: [`+${site.phoneDigits}`, `+${site.secondaryPhoneDigits}`],
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: site.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][h.day],
    opens: h.open,
    closes: h.close,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <SmoothScroll>
          <ScrollProgressBar />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-hivis focus:px-4 focus:py-2 focus:font-semibold"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileBar />
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

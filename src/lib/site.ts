/**
 * Single source of truth for business details.
 * Every value marked REPLACE is a placeholder: update it before launch.
 */
export const site = {
  name: "Multi Cars",
  tagline: "Car repair and service with a written quote before any work starts",
  /** REPLACE: production URL (also set NEXT_PUBLIC_SITE_URL) */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  phoneDisplay: "+91 82815 29570",
  secondaryPhoneDisplay: "+91 94961 74767",
  phoneDigits: "918281529570",
  secondaryPhoneDigits: "919496174767",
  whatsappDigits: "918281529570",
  email: "multicars@gmail.com",
  address: {
    street: "Morazha Kannapuram Rd, Paliyath Valappu",
    locality: "Morazha",
    region: "Kerala",
    postalCode: "670331",
    country: "India",
  },
  plusCode: "X8GQ+8VQ",
  /** Permanent Google Maps share link and embed */
  mapsLink: "https://maps.google.com/?cid=6065683077233904656",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.9863266205937!2d75.33707407584737!3d11.975837136706912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4150051f7b6c7%3A0x542da29f12a00c10!2sMulti%20Cars%20Service%20Point!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  /** Direct 1-click Google review submission link */
  reviewLink: "https://search.google.com/local/writereview?placeid=ChIJx7b3UQAVpDsREAygEp-iLVQ",
  googlePlaceId: "ChIJx7b3UQAVpDsREAygEp-iLVQ",
  /** Currency symbol and number format used on the pricing page. REPLACE if needed. */
  currency: "₹",
  locale: "en-IN",
  /** Opening hours. day: 0 = Sunday ... 6 = Saturday. REPLACE with real hours. */
  hours: [
    { day: 1, open: "09:00", close: "18:30" },
    { day: 2, open: "09:00", close: "18:30" },
    { day: 3, open: "09:00", close: "18:30" },
    { day: 4, open: "09:00", close: "18:30" },
    { day: 5, open: "09:00", close: "18:30" },
    { day: 6, open: "09:00", close: "17:00" },
  ] as { day: number; open: string; close: string }[],
  /**
   * Optional trust facts. Leave a field out and it is hidden everywhere.
   * Only add numbers the shop can prove.
   */
  facts: {
    yearsInBusiness: 3,
    carsServiced: 1000,
    warranty: "6 months or 10,000 km warranty",
  } as { yearsInBusiness?: number; carsServiced?: number; warranty?: string },
};

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Groups consecutive days with identical hours, e.g. "Monday to Friday". */
export function hoursSummary() {
  const rows: { label: string; time: string }[] = [];
  const byDay = new Map(site.hours.map((h) => [h.day, h]));
  const order = [1, 2, 3, 4, 5, 6, 0];
  let i = 0;
  while (i < order.length) {
    const d = byDay.get(order[i]);
    const key = d ? `${d.open}-${d.close}` : "closed";
    let j = i;
    while (j + 1 < order.length) {
      const n = byDay.get(order[j + 1]);
      const nk = n ? `${n.open}-${n.close}` : "closed";
      if (nk !== key) break;
      j++;
    }
    const start = dayNames[order[i]];
    const end = dayNames[order[j]];
    rows.push({
      label: i === j ? start : `${start} to ${end}`,
      time: d ? `${formatTime(d.open)} to ${formatTime(d.close)}` : "Closed",
    });
    i = j + 1;
  }
  return rows;
}

export const money = (n: number) =>
  `${site.currency}${n.toLocaleString(site.locale)}`;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const whatsappHref = (text = "Hi Multi Cars, I'd like help with my car.") =>
  `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(text)}`;

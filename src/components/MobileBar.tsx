import Link from "next/link";
import { site, whatsappHref } from "@/lib/site";
import { Icon } from "./ui";

/** Fixed action bar on phones: the three things a visitor most needs. */
export function MobileBar() {
  const item =
    "flex flex-1 items-center justify-center gap-2 py-3.5 text-[0.95rem] font-semibold";
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex border-t-2 border-ink bg-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={`tel:${site.phoneDigits}`} className={`${item} border-r-2 border-ink`}>
        <Icon name="phone" className="h-4 w-4" />
        Call
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} border-r-2 border-ink`}
      >
        <Icon name="whatsapp" className="h-4 w-4" />
        WhatsApp
      </a>
      <Link href="/book" className={`${item} bg-hivis`}>
        Book
      </Link>
    </div>
  );
}

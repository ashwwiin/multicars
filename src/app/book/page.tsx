import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { OpenNow } from "@/components/OpenNow";
import { Container, ExternalButton, Icon, PageHeader } from "@/components/ui";
import { hoursSummary, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a service",
  description:
    "Request a service or a quote. Tell us about your car and the problem, and we confirm by phone or WhatsApp.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <PageHeader
        title="Book a service"
        lead="Tell us about the car and what it is doing. We confirm by phone or WhatsApp before you come in."
      />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <BookingForm variant="full" />

          <aside className="space-y-8">
            <div>
              <h2 className="display-sm text-3xl">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {[
                  "We read your request and call or message you to confirm a time.",
                  "You bring the car in. We inspect it and explain what we find.",
                  "You get a written quote. Work starts only after you approve.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="display flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink text-xl text-hivis">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg border-2 border-ink bg-white p-6">
              <h2 className="display-sm text-2xl">Rather talk to someone?</h2>
              <div className="mt-4 flex flex-col gap-3">
                <ExternalButton href={`tel:${site.phoneDigits}`} variant="dark">
                  <Icon name="phone" />
                  Call {site.phoneDisplay}
                </ExternalButton>
                <ExternalButton href={`tel:${site.secondaryPhoneDigits}`} variant="outline">
                  <Icon name="phone" />
                  Call {site.secondaryPhoneDisplay}
                </ExternalButton>
                <ExternalButton
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                >
                  <Icon name="whatsapp" />
                  WhatsApp us
                </ExternalButton>
              </div>
              <div className="mt-5">
                <OpenNow />
              </div>
              <dl className="mt-3 space-y-1 text-sm">
                {hoursSummary().map((r) => (
                  <div key={r.label} className="flex justify-between gap-4">
                    <dt>{r.label}</dt>
                    <dd className="font-semibold">{r.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}

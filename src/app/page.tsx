import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { HeroText } from "@/components/HeroText";
import { HorizontalShowcase } from "@/components/HorizontalShowcase";
import { LenisCascadingCards } from "@/components/LenisCascadingCards";
import { Magnetic } from "@/components/Magnetic";
import { OpenNow } from "@/components/OpenNow";
import { ScrollReveal } from "@/components/ScrollReveal";
import { StatCounter } from "@/components/StatCounter";
import { Container, ExternalButton, Icon, LinkButton } from "@/components/ui";
import { getReviews } from "@/lib/reviews";
import { services } from "@/lib/services";
import { hoursSummary, money, site } from "@/lib/site";

export default function HomePage() {
  const reviews = getReviews();

  return (
    <>
      {/* Hero: the job card is the one memorable element on the page. */}
      <section className="border-b-2 border-ink">
        <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.3fr_1fr] lg:gap-14 xl:gap-20 lg:py-20 xl:py-24">
          <HeroText />

          <div className="job-card-enter">
            <BookingForm variant="compact" />
          </div>
        </Container>
      </section>

      {/* Urgent strip: the breakdown visitor's shortcut. */}
      <section aria-label="Breakdown help" className="bg-ink text-white">
        <div className="hazard h-2" aria-hidden />
        <Container className="flex flex-col items-start justify-between gap-3 py-5 sm:flex-row sm:items-center">
          <p className="display-sm text-2xl sm:text-3xl">
            Broken down or a warning light just came on?
          </p>
          <Magnetic strength={0.25}>
            <a
              href={`tel:${site.phoneDigits}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-signal px-5 py-3 text-lg font-bold text-white hover:bg-[#a9172f]"
            >
              <Icon name="phone" />
              Call {site.phoneDisplay}
            </a>
          </Magnetic>
        </Container>
      </section>

      {/* Lenis Signature 1: Pinned Horizontal Showcase */}
      <HorizontalShowcase />

      {/* Services as a ruled ledger, led by what the driver notices. */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-5xl sm:text-6xl">What do you need?</h2>
            <Link href="/services" className="font-semibold underline underline-offset-4">
              See all services
            </Link>
          </div>
          <ScrollReveal stagger={0.06} childSelector=".service-row">
            <ul className="mt-10 border-t-2 border-ink">
              {services.map((s) => (
                <li key={s.slug} className="service-row border-b-2 border-ink">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group grid gap-2 py-5 sm:grid-cols-[1.2fr_1.8fr_auto] sm:items-center sm:gap-10 sm:py-7"
                  >
                    <span className="display-sm text-2xl group-hover:underline group-hover:decoration-4 group-hover:underline-offset-4 sm:text-3xl lg:text-4xl">
                      {s.name}
                    </span>
                    <span className="text-steel-600 sm:text-lg">
                      {s.symptoms.slice(0, 2).join(". ")}.
                    </span>
                    <span className="font-semibold text-lg sm:text-right">
                      from {money(s.from)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </Container>
      </section>

      {/* Lenis Signature: Cascading Diagonal Stacking Deck */}
      <LenisCascadingCards />

      {/* Commitments + visit details. */}
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div>
            <h2 className="display text-5xl sm:text-6xl">No surprises on the bill.</h2>
            <ScrollReveal stagger={0.1} childSelector=".commitment-row">
              <ul className="mt-8 space-y-5">
                {[
                  ["Written quote first", "Parts and labour listed separately, before any work begins."],
                  ["Your approval for extras", "If we find something new, we show you and ask. We never add work quietly."],
                  ["Old parts on request", "Ask at drop-off and we keep what we replace so you can see it."],
                ].map(([title, body]) => (
                  <li key={title} className="commitment-row flex gap-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-hivis text-ink ring-2 ring-ink">
                      <Icon name="check" className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="display-sm text-2xl">{title}</h3>
                      <p className="text-steel-600">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-steel-300">
              <StatCounter
                value={site.facts.yearsInBusiness ?? 3}
                suffix="+"
                label="years in business"
              />
              <StatCounter
                value={site.facts.carsServiced ?? 1000}
                suffix="+"
                label="cars serviced"
              />
              <StatCounter
                value={99}
                suffix="%"
                label="customer satisfaction"
              />
            </dl>
          </div>

          <div className="rounded-lg border-2 border-ink bg-white p-6 sm:p-8">
            <h2 className="display-sm text-3xl">Visit the workshop</h2>
            <address className="mt-4 not-italic">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
            </address>
            <dl className="mt-5 space-y-1.5">
              {hoursSummary().map((r) => (
                <div key={r.label} className="flex justify-between gap-6 border-b border-steel-300 py-1.5">
                  <dt>{r.label}</dt>
                  <dd className="font-semibold">{r.time}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              <OpenNow />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ExternalButton
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
              >
                <Icon name="pin" />
                Get directions
              </ExternalButton>
              <LinkButton href="/contact" variant="outline">
                Contact details
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {reviews.length > 0 && (
        <section className="border-t-2 border-ink bg-white py-16 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="display text-5xl sm:text-6xl">Customers say</h2>
                <p className="mt-2 text-steel-600">Real feedback from drivers we work with across Morazha and Kannur.</p>
              </div>
              <Link href="/reviews" className="font-semibold underline underline-offset-4">
                See all {reviews.length} reviews or leave one
              </Link>
            </div>
            <ScrollReveal stagger={0.12} childSelector=".review-card">
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {reviews.slice(0, 3).map((r) => (
                  <figure key={r.id} className="review-card flex flex-col justify-between border-l-4 border-hivis-deep pl-5 py-2">
                    <div>
                      <div className="flex text-amber-400 text-sm leading-none mb-2">
                        {"★".repeat(r.rating)}
                        <span className="text-steel-300">{"★".repeat(5 - r.rating)}</span>
                      </div>
                      <blockquote className="text-lg text-ink">&ldquo;{r.text}&rdquo;</blockquote>
                    </div>
                    <figcaption className="mt-4 text-sm font-semibold text-ink">
                      {r.name}
                      {r.service ? (
                        <span className="block text-xs font-normal text-steel-600 font-mono mt-0.5">
                          {r.service}
                        </span>
                      ) : null}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </ScrollReveal>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <LinkButton href="/reviews" variant="dark">
                Read all reviews
              </LinkButton>
              <LinkButton href="/reviews" variant="outline">
                Write a review
              </LinkButton>
            </div>
          </Container>
        </section>
      )}

      <section className="border-t-2 border-ink bg-hivis py-14 sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="display max-w-2xl text-4xl sm:text-6xl">
            Not sure what the car needs? Book a check and we&rsquo;ll tell you.
          </h2>
          <Magnetic strength={0.3}>
            <LinkButton href="/book" variant="dark" className="shrink-0">
              Book a service
              <Icon name="arrow" />
            </LinkButton>
          </Magnetic>
        </Container>
      </section>
    </>
  );
}

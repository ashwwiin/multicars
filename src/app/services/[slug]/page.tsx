import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { Container, Icon, PageHeader } from "@/components/ui";
import { getService, services } from "@/lib/services";
import { money, site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: `${service.summary} Typical time: ${service.time}. From ${money(service.from)}.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@type": "AutoRepair", name: site.name, url: site.url },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: service.from,
        priceCurrency: site.currency === "₹" ? "INR" : undefined,
      },
    },
  };

  return (
    <>
      <PageHeader title={service.name} lead={service.summary} />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-12">
            <div>
              <h2 className="display-sm text-3xl">Signs you need this</h2>
              <ul className="mt-4 space-y-3">
                {service.symptoms.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-ink" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="display-sm text-3xl">What&rsquo;s included</h2>
              <ul className="mt-4 space-y-3">
                {service.includes.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hivis ring-2 ring-ink">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid max-w-md grid-cols-2 gap-6 border-y-2 border-ink py-6">
              <div>
                <dt className="text-sm text-steel-600">Typical time</dt>
                <dd className="mt-1 text-xl font-semibold">{service.time}</dd>
              </div>
              <div>
                <dt className="text-sm text-steel-600">Starting price</dt>
                <dd className="mt-1 text-xl font-semibold">{money(service.from)}</dd>
              </div>
              <p className="col-span-2 text-sm text-steel-600">
                The final price depends on your car and what we find. You get it
                in writing before any work starts.
              </p>
            </dl>

            {service.faqs.length > 0 && (
              <div>
                <h2 className="display-sm text-3xl">Common questions</h2>
                <div className="mt-4 border-t-2 border-ink">
                  {service.faqs.map((f) => (
                    <details key={f.q} className="group border-b-2 border-ink py-4">
                      <summary className="cursor-pointer list-none font-semibold marker:hidden">
                        <span className="flex items-start justify-between gap-4">
                          {f.q}
                          <span aria-hidden className="text-2xl leading-none group-open:rotate-45">
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-3 text-steel-600">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <BookingForm variant="full" defaultService={service.name} />
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

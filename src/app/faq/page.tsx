import type { Metadata } from "next";
import { Container, LinkButton, PageHeader } from "@/components/ui";
import { generalFaqs, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Answers about quotes, approvals, timelines, parts and payment, plus common questions for each service.",
  alternates: { canonical: "/faq" },
};

const groups = [
  { title: "Before and during the job", items: generalFaqs },
  ...services
    .filter((s) => s.faqs.length > 0)
    .map((s) => ({ title: s.name, items: s.faqs })),
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups
      .flatMap((g) => g.items)
      .map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
  };

  return (
    <>
      <PageHeader
        title="Questions, answered."
        lead="Can't find yours? Call or message us and we will help."
      >
        <LinkButton href="/contact">Contact us</LinkButton>
      </PageHeader>

      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl space-y-14">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="display-sm text-3xl">{g.title}</h2>
              <div className="mt-4 border-t-2 border-ink">
                {g.items.map((f) => (
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
          ))}
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

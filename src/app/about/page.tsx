import type { Metadata } from "next";
import { Container, LinkButton, PageHeader } from "@/components/ui";
import { team } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `How ${site.name} works: honest diagnosis, written quotes and repairs you approve first.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "We explain before we fix",
    body: "A technician shows you what they found, in plain words, so you understand what the car needs and what can wait.",
  },
  {
    title: "We price in writing",
    body: "Every job starts with an itemised quote. The price you approve is the price you pay unless you agree to extra work.",
  },
  {
    title: "We fix what is needed",
    body: "No upselling. If a part can safely last longer, we say so and note it for next time.",
  },
  {
    title: "We stand behind the work",
    body: "If something we repaired is not right, bring it back and we put it right.",
  },
];

export default function AboutPage() {
  const { yearsInBusiness, carsServiced, warranty } = site.facts;
  return (
    <>
      <PageHeader
        title="A workshop that explains the work."
        lead={`${site.name} is a car repair and service workshop built around one idea: you should understand the problem, the price and the plan before we pick up a tool.`}
      >
        <LinkButton href="/book">Book a service</LinkButton>
      </PageHeader>

      <section className="py-14 sm:py-20">
        <Container>
          <h2 className="display text-5xl sm:text-6xl">How we work</h2>
          <dl className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="border-t-4 border-ink pt-4">
                <dt className="display-sm text-2xl">{p.title}</dt>
                <dd className="mt-2 text-steel-600">{p.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {(yearsInBusiness || carsServiced || warranty) && (
        <section className="border-y-2 border-ink bg-white py-12">
          <Container>
            <dl className="flex flex-wrap gap-x-14 gap-y-6">
              {yearsInBusiness ? (
                <div>
                  <dt className="text-sm text-steel-600">In business</dt>
                  <dd className="display text-5xl">{yearsInBusiness}+ years</dd>
                </div>
              ) : null}
              {carsServiced ? (
                <div>
                  <dt className="text-sm text-steel-600">Cars serviced</dt>
                  <dd className="display text-5xl">
                    {carsServiced.toLocaleString(site.locale)}+
                  </dd>
                </div>
              ) : null}
              {warranty ? (
                <div className="max-w-sm">
                  <dt className="text-sm text-steel-600">Our warranty</dt>
                  <dd className="mt-1 text-lg font-semibold">{warranty}</dd>
                </div>
              ) : null}
            </dl>
          </Container>
        </section>
      )}

      {team.length > 0 && (
        <section className="py-14 sm:py-20">
          <Container>
            <h2 className="display text-5xl sm:text-6xl">The team</h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.name} className="border-t-4 border-ink pt-4">
                  <h3 className="display-sm text-2xl">{m.name}</h3>
                  <p className="text-sm font-semibold text-steel-600">{m.role}</p>
                  {m.bio && <p className="mt-2">{m.bio}</p>}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}

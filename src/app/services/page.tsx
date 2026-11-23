import type { Metadata } from "next";
import Link from "next/link";
import { Container, LinkButton, PageHeader } from "@/components/ui";
import { services } from "@/lib/services";
import { money } from "@/lib/site";

export const metadata: Metadata = {
  title: "Car repair and service",
  description:
    "Periodic service, engine and gearbox, brakes, AC, electrical, bodywork and tyres. Find your problem, see what is included and what it costs.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Find the problem. See the fix."
        lead="Start with what you notice. Each service lists the signs to look for, what we check and a starting price."
      >
        <LinkButton href="/book">Book a service</LinkButton>
      </PageHeader>

      <section className="py-14 sm:py-20">
        <Container>
          <ul className="grid gap-10 md:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug} className="flex flex-col border-t-4 border-ink pt-5">
                <h2 className="display-sm text-3xl">
                  <Link href={`/services/${s.slug}`} className="hover:underline">
                    {s.name}
                  </Link>
                </h2>
                <p className="mt-2 text-steel-600">{s.summary}</p>
                <p className="mt-4 text-sm font-semibold">You might notice</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-[0.97rem]">
                  {s.symptoms.slice(0, 3).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <span className="font-semibold">from {money(s.from)}</span>
                  <Link
                    href={`/services/${s.slug}`}
                    className="font-semibold underline underline-offset-4"
                  >
                    Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

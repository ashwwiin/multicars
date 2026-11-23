import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects and uses your details.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Starter policy. Have it reviewed against the data-protection rules that
 * apply to your business, and update it if you add analytics or other tools.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy policy" lead="What we collect, why, and your choices." />
      <section className="py-14 sm:py-20">
        <Container className="legal max-w-3xl space-y-8">
          <div>
            <h2>What we collect</h2>
            <p>When you send a booking or enquiry form, we collect what you type into it:</p>
            <ul>
              <li>Your name and phone number</li>
              <li>Your email address, if you give one</li>
              <li>Your car details, registration number and notes about the problem</li>
              <li>Your preferred date and time</li>
            </ul>
          </div>
          <div>
            <h2>Why we use it</h2>
            <p>
              We use your details only to answer your request, confirm your
              booking, send you a quote and carry out the work you approve. We do
              not sell your details.
            </p>
          </div>
          <div>
            <h2>Who sees it</h2>
            <p>
              Our staff and the service providers that deliver this website and
              our messages, such as hosting and email or messaging tools. They
              may only use your details to provide those services to us.
            </p>
          </div>
          <div>
            <h2>How long we keep it</h2>
            <p>
              We keep your details for as long as we need them to respond and to
              keep records of work done on your car, then delete them.
            </p>
          </div>
          <div>
            <h2>Your choices</h2>
            <p>
              You can ask us what we hold about you, ask us to correct it or ask
              us to delete it. Email{" "}
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or call {site.phoneDisplay}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ContactHub } from "@/components/ContactHub";
import { PageHeader } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and location",
  description: `Find ${site.name}, see opening hours, call ${site.phoneDisplay} or ${site.secondaryPhoneDisplay}, message on WhatsApp, or get directions to our workshop in Morazha.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Come in, call or message."
        lead="Direct access to our technicians and workshop in Morazha, Kerala."
      />
      <ContactHub />
    </>
  );
}

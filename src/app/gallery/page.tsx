import type { Metadata } from "next";
import Image from "next/image";
import { Container, ExternalButton, Icon, PageHeader } from "@/components/ui";
import { gallery } from "@/lib/content";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "The workshop, the team and the work we have done.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="The work, up close."
        lead="Workshop, team and finished jobs."
      />
      <section className="py-14 sm:py-20">
        <Container>
          {gallery.length === 0 ? (
            <div className="max-w-xl rounded-lg border-2 border-dashed border-ink bg-white p-8">
              <h2 className="display-sm text-3xl">Photos are on the way.</h2>
              <p className="mt-3 text-steel-600">
                Want to see how we work? Message us and we will send photos of
                the workshop or a similar job.
              </p>
              <ExternalButton
                href={whatsappHref("Hi, can you send me photos of your workshop?")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6"
              >
                <Icon name="whatsapp" />
                Ask on WhatsApp
              </ExternalButton>
            </div>
          ) : (
            <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {gallery.map((g) => (
                <li key={g.src} className="mb-6 break-inside-avoid">
                  <figure className="overflow-hidden rounded-lg border-2 border-ink bg-white">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={900}
                      height={700}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-auto w-full"
                    />
                    {g.caption && (
                      <figcaption className="px-4 py-3 text-sm">{g.caption}</figcaption>
                    )}
                  </figure>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}

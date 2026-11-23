import type { Metadata } from "next";
import { ReviewsList } from "@/components/ReviewsList";
import { Container, PageHeader } from "@/components/ui";
import { getReviews } from "@/lib/reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer reviews",
  description: `What customers say about ${site.name}.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const initialReviews = getReviews();

  return (
    <>
      <PageHeader
        title="What customers say."
        lead="Real feedback from drivers we work with across Morazha and Kannur."
      />
      <section className="py-14 sm:py-20">
        <Container>
          <ReviewsList initialReviews={initialReviews} />
        </Container>
      </section>
    </>
  );
}

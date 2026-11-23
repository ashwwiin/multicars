import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getReviews, saveReview } from "@/lib/reviews";

export async function GET() {
  const reviews = getReviews();
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, rating, service, text } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5 stars." }, { status: 400 });
    }

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Feedback text is required." }, { status: 400 });
    }

    const created = saveReview({
      name: name.trim(),
      rating: Math.round(numericRating),
      service: service && typeof service === "string" ? service.trim() : undefined,
      text: text.trim(),
    });

    revalidatePath("/reviews");
    revalidatePath("/");

    return NextResponse.json({ success: true, review: created });
  } catch (error) {
    console.error("Failed to save review:", error);
    return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  }
}

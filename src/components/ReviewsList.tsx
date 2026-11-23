"use client";

import React, { useState } from "react";
import { CustomerReview } from "@/lib/reviews";
import { GoogleRatingBadge } from "./GoogleRatingBadge";
import { ReviewForm } from "./ReviewForm";
import { ExternalButton, Icon } from "./ui";
import { site } from "@/lib/site";

interface ReviewsListProps {
  initialReviews: CustomerReview[];
}

export function ReviewsList({ initialReviews }: ReviewsListProps) {
  const [reviews, setReviews] = useState<CustomerReview[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);

  const fetchFreshReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-10">
      {/* Top action header: Google Badge + Write review button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl border-2 border-ink bg-white">
        <GoogleRatingBadge />

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-hivis px-5 py-2.5 font-bold text-ink border-2 border-ink hover:bg-hivis-deep transition-all shadow-[2px_2px_0px_0px_#0B131A] active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Icon name="check" className="h-4 w-4" />
            {showForm ? "Hide form" : "Write a review"}
          </button>
          {site.reviewLink && (
            <ExternalButton
              href={site.reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="text-sm font-semibold"
            >
              Post directly on Google
            </ExternalButton>
          )}
        </div>
      </div>

      {/* Review form (toggleable or inline) */}
      {showForm && (
        <div className="animate-in fade-in duration-300">
          <ReviewForm
            onSuccess={() => {
              fetchFreshReviews();
            }}
          />
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <h2 className="display-sm text-3xl text-ink">
            Customer feedback ({reviews.length})
          </h2>
          <span className="text-sm text-steel-600 font-mono">
            Direct & Google Reviews
          </span>
        </div>

        {reviews.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-ink bg-white p-12 text-center">
            <h3 className="display-sm text-2xl text-ink">No reviews yet.</h3>
            <p className="mt-2 text-steel-600">Be the first to share your experience with Multi Cars!</p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-hivis px-6 py-2.5 font-bold text-ink border-2 border-ink hover:bg-hivis-deep transition-all"
            >
              Write the first review
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure
                key={r.id}
                className="flex flex-col justify-between rounded-xl border-2 border-ink bg-white p-6 shadow-[3px_3px_0px_0px_#0B131A] transition-transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    {/* Stars */}
                    <div className="flex text-amber-400 text-lg leading-none" aria-label={`${r.rating} stars`}>
                      {"★".repeat(r.rating)}
                      <span className="text-steel-300">{"★".repeat(5 - r.rating)}</span>
                    </div>

                    {/* Source badge */}
                    {r.source === "google" ? (
                      <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
                        Google
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-steel-100 px-2 py-0.5 text-xs font-bold text-steel-700 border border-steel-300">
                        Verified customer
                      </span>
                    )}
                  </div>

                  {r.service && (
                    <p className="mt-2 text-xs font-mono font-semibold uppercase tracking-wider text-steel-600">
                      {r.service}
                    </p>
                  )}

                  <blockquote className="mt-3 text-base text-ink leading-relaxed">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-5 pt-3 border-t border-steel-200 flex items-center justify-between text-xs text-steel-600">
                  <span className="font-bold text-ink text-sm">{r.name}</span>
                  <span>{r.date}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

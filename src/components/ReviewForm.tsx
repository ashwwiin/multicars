"use client";

import React, { useState } from "react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { Icon } from "./ui";

interface ReviewFormProps {
  onSuccess?: () => void;
}

export function ReviewForm({ onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedText, setSubmittedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!text.trim()) {
      setError("Please write a few words about your experience.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          service: service.trim() || undefined,
          text: text.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSubmittedText(text.trim());
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyAndGoGoogle = async () => {
    if (submittedText) {
      try {
        await navigator.clipboard.writeText(submittedText);
        setCopied(true);
      } catch {
        // clipboard write fallback
      }
    }
    window.open(site.reviewLink, "_blank", "noopener,noreferrer");
  };

  if (submittedText) {
    return (
      <div className="rounded-xl border-2 border-ink bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_#0B131A]">
        <div className="flex items-center gap-3 text-signal-green">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal-green/10 text-signal-green ring-2 ring-signal-green">
            <Icon name="check" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="display-sm text-2xl text-ink">Review published!</h3>
            <p className="text-sm text-steel-600">Your feedback is now live on our website.</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border-2 border-steel-200 bg-steel-50 p-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-steel-600 font-mono">
            Want to help us on Google too?
          </p>
          <p className="mt-1 text-sm text-steel-600">
            Clicking below will copy your review and open Google Maps so you can paste it with one tap!
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleCopyAndGoGoogle}
              className="inline-flex min-h-11 items-center gap-2 rounded-md bg-hivis px-5 py-2.5 font-bold text-ink border-2 border-ink hover:bg-hivis-deep transition-all shadow-[2px_2px_0px_0px_#0B131A] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span>{copied ? "✓ Copied! Opening Google..." : "📋 Copy & Post to Google"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmittedText(null);
                setName("");
                setText("");
                setCopied(false);
              }}
              className="text-sm font-semibold text-steel-600 hover:text-ink underline underline-offset-4 px-2 py-1"
            >
              Write another review
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border-2 border-ink bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_#0B131A]"
    >
      <h3 className="display-sm text-2xl sm:text-3xl text-ink">Write a review</h3>
      <p className="mt-1 text-sm text-steel-600">
        Share your experience with Multi Cars. Your review is displayed immediately.
      </p>

      {error && (
        <div className="mt-4 rounded-md border border-signal bg-signal/10 p-3 text-sm font-medium text-signal">
          {error}
        </div>
      )}

      {/* Star selector */}
      <div className="mt-5">
        <label className="block text-sm font-mono font-semibold uppercase tracking-wider text-steel-600">
          Your Rating
        </label>
        <div className="mt-1.5 flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = (hoverRating || rating) >= star;
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                className="text-3xl transition-transform hover:scale-125 focus:outline-none p-1"
              >
                <span className={active ? "text-amber-400 drop-shadow-sm" : "text-steel-300"}>
                  ★
                </span>
              </button>
            );
          })}
          <span className="ml-2 font-mono text-sm font-semibold text-steel-600">
            {rating} of 5 stars
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Name input */}
        <div>
          <label
            htmlFor="reviewer-name"
            className="block text-sm font-mono font-semibold uppercase tracking-wider text-steel-600"
          >
            Your Name *
          </label>
          <input
            id="reviewer-name"
            type="text"
            required
            placeholder="e.g. Rahul M."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-md border-2 border-ink px-3.5 py-2.5 font-medium text-ink focus:border-hivis focus:outline-none"
          />
        </div>

        {/* Service dropdown */}
        <div>
          <label
            htmlFor="service-type"
            className="block text-sm font-mono font-semibold uppercase tracking-wider text-steel-600"
          >
            Service Received (Optional)
          </label>
          <select
            id="service-type"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-1.5 w-full rounded-md border-2 border-ink bg-white px-3.5 py-2.5 font-medium text-ink focus:border-hivis focus:outline-none"
          >
            <option value="">Select a service...</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="General Inspection & Diagnosis">General Inspection & Diagnosis</option>
            <option value="Other Workshop Service">Other Workshop Service</option>
          </select>
        </div>
      </div>

      {/* Review comments */}
      <div className="mt-4">
        <label
          htmlFor="review-text"
          className="block text-sm font-mono font-semibold uppercase tracking-wider text-steel-600"
        >
          Your Feedback *
        </label>
        <textarea
          id="review-text"
          required
          rows={3}
          placeholder="How was the service? Did the written quote match the final bill?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1.5 w-full rounded-md border-2 border-ink px-3.5 py-2.5 font-medium text-ink focus:border-hivis focus:outline-none resize-y"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-steel-600">
          Posted directly to Multi Cars website. No account needed.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-ink px-6 py-2.5 font-bold text-white hover:bg-steel-800 transition-colors disabled:opacity-50"
        >
          {submitting ? "Publishing..." : "Submit review"}
        </button>
      </div>
    </form>
  );
}

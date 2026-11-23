"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { normalise, validate, type BookingErrors } from "@/lib/booking";
import { services, symptomChoices } from "@/lib/services";
import { site } from "@/lib/site";

type Props = {
  variant?: "compact" | "full";
  defaultService?: string;
};

type Status = "idle" | "sending" | "success" | "error";

const field =
  "mt-1.5 w-full rounded-md border-2 border-ink bg-white px-3.5 py-3 text-base outline-none placeholder:text-steel-600/70 focus:border-ink focus:ring-4 focus:ring-hivis/70";

export function BookingForm({ variant = "full", defaultService = "" }: Props) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<BookingErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const [symptom, setSymptom] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");

  // Set on the DOM node in the browser so server HTML never depends on today's date.
  const setMinToday = (el: HTMLInputElement | null) => {
    if (!el || el.min) return;
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    el.min = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const input = normalise({
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      vehicle: form.get("vehicle"),
      registration: form.get("registration"),
      service: form.get("service"),
      symptom,
      date: form.get("date"),
      slot: form.get("slot"),
      notes: form.get("notes"),
      company: form.get("company"),
      source: variant === "compact" ? "home" : "book",
    });

    const found = validate(input);
    setErrors(found);
    setServerMessage("");
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(id(first))?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSubmittedName(input.name);
        setSubmittedPhone(input.phone);
        setStatus("success");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerMessage(
        data.message ?? "Something went wrong. Please check the form or call us.",
      );
      setStatus("error");
    } catch {
      setServerMessage(
        "We could not reach the server. Check your connection or call us.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="relative rounded-lg border-2 border-ink bg-white p-6 sm:p-8"
        role="status"
      >
        <span className="stamp-enter absolute right-5 top-5 rounded border-4 border-signal px-3 py-1 text-lg font-extrabold uppercase tracking-wide text-signal">
          Received
        </span>
        <h2 className="display-sm pr-32 text-3xl">Thanks, {submittedName}.</h2>
        <p className="mt-3 max-w-md">
          We have your request and will contact you on{" "}
          <strong>{submittedPhone}</strong> to confirm the details and give you a
          written quote.
        </p>
        <p className="mt-4 text-sm text-steel-600">
          Need help sooner? Call{" "}
          <a className="font-semibold underline" href={`tel:${site.phoneDigits}`}>
            {site.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const compact = variant === "compact";
  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`rounded-xl border-2 border-ink bg-white ${compact ? "p-6 sm:p-8 xl:p-10 max-w-xl xl:max-w-2xl lg:ml-auto" : "p-6 sm:p-10 max-w-2xl mx-auto"} shadow-[8px_8px_0_0_var(--color-ink)]`}
    >
      <h2 className={`display-sm ${compact ? "text-2xl" : "text-3xl"}`}>
        {compact ? "What's the car doing?" : "Tell us about your car"}
      </h2>
      <p className="mt-1 text-sm text-steel-600">
        {compact
          ? "Pick the closest match. We call back with next steps and a written quote."
          : "We confirm every request by phone or WhatsApp before you come in."}
      </p>

      <div className="mt-5 space-y-5">
        <fieldset>
          <legend className="text-sm font-semibold">
            {compact ? "Closest match" : "What is the problem?"}
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {symptomChoices.map((s) => (
              <label key={s} className="cursor-pointer">
                <input
                  type="radio"
                  name="symptom"
                  value={s}
                  checked={symptom === s}
                  onChange={() => setSymptom(s)}
                  className="peer sr-only"
                />
                <span className="inline-block rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-medium transition-colors peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:bg-steel-100 peer-checked:hover:bg-ink">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2"}>
          <div>
            <label htmlFor={id("name")} className="text-sm font-semibold">
              Your name
            </label>
            <input
              id={id("name")}
              name="name"
              autoComplete="name"
              className={field}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? id("name-err") : undefined}
            />
            {errors.name && (
              <p id={id("name-err")} className="mt-1 text-sm font-medium text-signal">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={id("phone")} className="text-sm font-semibold">
              Phone number
            </label>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={field}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? id("phone-err") : undefined}
            />
            {errors.phone && (
              <p id={id("phone-err")} className="mt-1 text-sm font-medium text-signal">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {!compact && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={id("vehicle")} className="text-sm font-semibold">
                  Car make, model and year
                </label>
                <input
                  id={id("vehicle")}
                  name="vehicle"
                  placeholder="e.g. Hyundai i20, 2019"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor={id("registration")} className="text-sm font-semibold">
                  Registration number <span className="font-normal text-steel-600">(optional)</span>
                </label>
                <input
                  id={id("registration")}
                  name="registration"
                  autoCapitalize="characters"
                  className={field}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={id("service")} className="text-sm font-semibold">
                  Service
                </label>
                <select
                  id={id("service")}
                  name="service"
                  defaultValue={defaultService}
                  className={field}
                >
                  <option value="">Not sure, help me decide</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={id("email")} className="text-sm font-semibold">
                  Email <span className="font-normal text-steel-600">(optional)</span>
                </label>
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={field}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? id("email-err") : undefined}
                />
                {errors.email && (
                  <p id={id("email-err")} className="mt-1 text-sm font-medium text-signal">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={id("date")} className="text-sm font-semibold">
                  Preferred date
                </label>
                <input
                  id={id("date")}
                  name="date"
                  type="date"
                  ref={setMinToday}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor={id("slot")} className="text-sm font-semibold">
                  Preferred time
                </label>
                <select id={id("slot")} name="slot" className={field} defaultValue="">
                  <option value="">Any time</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor={id("notes")} className="text-sm font-semibold">
                Anything else we should know?
              </label>
              <textarea
                id={id("notes")}
                name="notes"
                rows={4}
                placeholder="When did it start? Does it happen all the time or only sometimes?"
                className={field}
              />
            </div>
          </>
        )}

        {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      {status === "error" && serverMessage && (
        <p
          role="alert"
          className="mt-5 rounded-md border-2 border-signal bg-signal/5 px-4 py-3 text-sm font-medium text-signal"
        >
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md border-2 border-ink bg-hivis px-5 py-3 text-base font-semibold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-hivis-deep hover:shadow-[1px_1px_0_0_var(--color-ink)] disabled:cursor-wait disabled:opacity-70"
      >
        {sending ? "Sending…" : compact ? "Request a call back" : "Send booking request"}
      </button>

      <p className="mt-3 text-xs text-steel-600">
        We use your details only to respond to this request. See our{" "}
        <Link href="/privacy" className="underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

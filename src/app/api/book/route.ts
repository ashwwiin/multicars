import { normalise, validate } from "@/lib/booking";

/**
 * Receives booking and quote requests.
 *
 * Delivery: set BOOKING_WEBHOOK_URL to any endpoint that accepts JSON
 * (Zapier, Make, a Slack/Discord webhook proxy, your own service) to get
 * each request in your inbox or chat. Without it, requests are only logged
 * to the server console, so set it before launch.
 *
 * The rate limit below is in-memory and per server instance. Swap it for a
 * shared store (Redis, Upstash) if you run several instances.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (limited(ip)) {
    return Response.json(
      { ok: false, message: "Too many requests. Please call us instead." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const input = normalise(body);

  // Honeypot filled: pretend success so bots learn nothing.
  if (input.company) return Response.json({ ok: true });

  const errors = validate(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const payload = {
    receivedAt: new Date().toISOString(),
    ...input,
    company: undefined,
  };

  const hook = process.env.BOOKING_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("Booking webhook failed", err);
      return Response.json(
        { ok: false, message: "We could not send your request. Please call us." },
        { status: 502 },
      );
    }
  } else {
    console.log("[booking request]", payload);
  }

  return Response.json({ ok: true });
}

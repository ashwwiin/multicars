# Multi Cars website

Next.js (App Router) + Tailwind CSS v4. Mobile-first, statically rendered, with a booking form that posts to a route handler.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Before launch: replace the placeholders

All business details live in **`src/lib/site.ts`**. Anything marked `REPLACE` is a placeholder:

- phone, WhatsApp number, email, address, Google Maps link and embed URL
- opening hours (drives the "Open now" badge and the footer)
- Google review link
- optional trust facts (`yearsInBusiness`, `carsServiced`, `warranty`): leave them out and they are hidden everywhere. Only add numbers you can prove.

**`src/lib/services.ts`** holds the service list, inclusions, times and "from" prices. These are **sample data**: replace them with the shop's real offering.

**`src/lib/content.ts`** holds reviews, gallery photos and team members. All three start empty on purpose, so nothing invented is shown. Add real reviews (with permission) and put photos in `public/gallery/`.

**`src/app/about/page.tsx`** has draft "how we work" copy. Confirm every promise in it (for example the repair guarantee) matches what the shop really offers.

**`src/app/privacy/page.tsx`** is a starter policy. Have it reviewed for the data-protection rules that apply to you.

## Getting booking requests

Requests are posted to `POST /api/book`. Set an environment variable so each one reaches you:

```
BOOKING_WEBHOOK_URL=https://...   # Zapier, Make, a chat webhook, or your own endpoint
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Without `BOOKING_WEBHOOK_URL`, requests are only written to the server log.
The route validates input, has a honeypot field and a simple in-memory rate limit (swap in Redis/Upstash if you run several instances).

## Design

- Display type: Archivo (condensed). Body: Figtree. Both self-hosted through Fontsource, so there are no runtime font requests.
- Palette tokens are in `src/app/globals.css` (`--color-ink`, `--color-hivis`, `--color-signal`, steel greys).
- One memorable element: the job-card request form in the hero. Hi-vis yellow is reserved for actions.

## Notes

- This Next.js version enables Cache Components. Avoid reading the clock (`new Date()`, `Date.now()`) in server components; the "Open now" badge is client-only for that reason.
- Add analytics (GA4 or similar) and track call, WhatsApp, directions and form events once you choose a provider.
- To use the taste-skill with this project, install it in your Claude Code project: `npx -y skills add bnd-1/taste-skill --skill design-taste-frontend --agent claude-code`.

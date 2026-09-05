# BasuGrow

Marketing site for BasuGrow — a performance marketing agency in Jhansi running
Meta ads and lead systems for local businesses across India.

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind CSS v4

---

## Running it

You need Node 20 or newer. Then:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

**The site runs with every environment variable empty.** Each one switches a
feature on; none of them break anything by their absence. See
[Environment variables](#environment-variables).

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build — run this before pushing |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |
| `node scripts/contrast.mjs` | Check every colour pair against WCAG |
| `node scripts/extract-logo.mjs <file>` | Regenerate the logo mask from a source file |

---

## Editing content

**Almost nothing requires touching a component.** All the copy lives in
`content/` as typed TypeScript objects. Change a file there and the site
updates everywhere that content appears — cards, pages, navigation, sitemap and
structured data all read from the same source.

| File | Controls |
| --- | --- |
| `content/site.ts` | Phone number, email, Instagram, cities served, nav links, footer links, hero trust row |
| `content/services.ts` | The six services — cards, full pages, FAQs, navigation, sitemap |
| `content/industries.ts` | The six industries — chips, full pages, benchmark ranges |
| `content/case-studies.ts` | Case studies, their metrics, and the sample flag |
| `content/testimonials.ts` | Testimonials. **Only renders ones marked `isSample: false`** |
| `content/pricing.ts` | Pricing tiers and the note under the table |
| `content/faqs.ts` | Home FAQ and pricing FAQ |
| `content/process.ts` | The four steps, and the four failure modes |
| `content/stats.ts` | Trust bar figures and client logos |
| `content/blog/*.mdx` | Blog posts |

### Adding a service or industry

Add an object to the array in `content/services.ts` or
`content/industries.ts`. That is the whole job — the page, the card, the footer
link, the sitemap entry and the JSON-LD all appear automatically. The `slug`
becomes the URL.

### Adding a blog post

Create `content/blog/your-post-slug.mdx`:

```mdx
---
title: "Your title"
description: "One sentence, used on the index and in search results."
date: "2026-09-15"
tag: "Meta ads"
---

Your writing here. Standard markdown.
```

Reading time is calculated automatically. The index, the sitemap and the
Article structured data all pick it up.

### Changing colours

Every colour is a token in the `@theme` block at the top of `app/globals.css`.
Change a hex there and it changes everywhere.

```
--color-night   dark section backgrounds
--color-bone    default page background
--color-sand    tinted surface, card fill
--color-ink     headings and body on light
--color-slate   muted and secondary text
--color-gold    the accent — CTAs and one highlighter per screen
--color-willow  brand green — logo, icons, rules. Never text on light.
```

**Run `node scripts/contrast.mjs` after any change.** Anything carrying body
text must reach 4.5:1. Green and gold both fail against bone, which is why
neither is ever used for text on a light surface.

---

## How it is put together

```
app/                    routes; every page is a server component
components/ui/          buttons, cards, inputs, icons
components/sections/    page sections
components/motion/      the only 'use client' islands
components/seo/         JSON-LD
content/                all copy, as typed objects
lib/                    fonts, utils, blog loader, validation, rate limiting
scripts/                one-off tooling (contrast check, logo extraction)
brand/                  source logo files
```

### A few decisions worth knowing

**Motion is deliberately restrained.** The hero has one choreographed entrance
on load, and it is the only animation that plays without the user doing
something. Exactly three sections reveal on scroll — Results, Pricing and the
final CTA. Fade-up on every section is the tell of a generated page.

**The hero's pointer effects share one listener.** `<PointerField/>` writes
five CSS custom properties on a rAF; the dot grid, the headline drift and the
phone tilt all read those in CSS. Adding another effect costs nothing, and no
React state changes while the pointer moves.

**Everything animates `transform` or `opacity` only.** Nothing triggers layout.

**Reduced motion is handled inside each primitive**, not at the call sites, so
it cannot be forgotten. With the preference set the pointer listener never
attaches, Lenis does not initialise, the marquee stops and counters render
their final value.

**The hero's gold marker is CSS, not JavaScript.** The word on top of it is
ink-coloured, so the marker is what makes it readable. A JS animation starting
at `scaleX(0)` would ship invisible text in the server-rendered HTML.

**The FAQ accordion is native `<details>`.** The browser gives us expanded
state, keyboard handling and screen-reader semantics for free, it works before
hydration, and the answers are in the DOM for crawlers.

**Testimonials render nothing until one is real.** See `CONTENT-TODO.md`.

---

## The contact form

`app/contact/actions.ts` is a server action that validates with Zod, checks a
honeypot, rate limits by IP (5 per 10 minutes), emails via Resend, optionally
appends to a Google Sheet, then redirects to `/thank-you`.

Every failure path returns a **specific** message naming what happened and
pointing at WhatsApp. "Something went wrong" loses the lead, which on this site
is the entire product.

With `RESEND_API_KEY` or `LEAD_INBOX_EMAIL` unset, the form still works — the
lead is written to the server console and the visitor is thanked normally. They
never see an error caused by our missing configuration. **Check your console
in development; set both before launch.**

Indian mobile numbers are accepted in the shapes people actually type
(`9876543210`, `+91 98765 43210`, `098765 43210`) and normalised to ten digits.

---

## Environment variables

Copy `.env.example` to `.env.local`. All optional; each degrades gracefully.

| Variable | Without it |
| --- | --- |
| `RESEND_API_KEY` | Leads are logged to the console, not emailed |
| `LEAD_INBOX_EMAIL` | As above |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs and the sitemap fall back to `basugrow.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Falls back to the number in `content/site.ts` |
| `NEXT_PUBLIC_CAL_LINK` | Booking buttons link to the contact form instead, and no third-party script loads |
| `NEXT_PUBLIC_META_PIXEL_ID` | No pixel |
| `META_CAPI_ACCESS_TOKEN` | No server-side conversions |
| `NEXT_PUBLIC_GA_ID` | No analytics |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Leads are emailed but not logged to a sheet |

---

## Deploying

Push to GitHub, import the repo at [vercel.com/new](https://vercel.com/new),
and add the environment variables above under **Settings → Environment
Variables**. Framework and build settings are detected automatically.

Set `NEXT_PUBLIC_SITE_URL` to the production domain, or every canonical URL and
sitemap entry will point at the wrong host.

After the first deploy, submit `https://yourdomain.com/sitemap.xml` in Google
Search Console.

---

## Before launch

Work through **[CONTENT-TODO.md](./CONTENT-TODO.md)**. It lists every
placeholder, what is needed to replace it, and which file to edit. The blocking
items are real case study numbers, the trust bar figures, and confirming
pricing.

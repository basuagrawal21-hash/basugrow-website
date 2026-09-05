# Content to supply before launch

Everything here is a placeholder the site renders honestly — it is labelled as
a sample on the page, or it does not render at all. Nothing on the site claims
to be real when it is not. Work down this list and the site becomes genuinely
yours.

Each item says exactly what is needed and which file to edit.

---

## Blocking — do not launch without these

### 1. Real case study numbers
**File:** `content/case-studies.ts`

Three case studies currently use illustrative round numbers and each renders a
visible **Sample** badge. For each one, supply:

- [ ] Client name **and written permission to name them** — or keep it
      anonymous ("a gym in Indore"), which is fine and still credible
- [ ] Actual ad spend, from Ads Manager
- [ ] Actual number of leads
- [ ] Actual cost per lead
- [ ] Actual date range
- [ ] What genuinely changed, in one sentence
- [ ] One sentence from the client about the effect on their business

Then set `isSample: false` on that study. **Do not flip the flag without the
numbers behind it** — the badge is what keeps the page honest.

### 2. Trust bar figures
**File:** `content/stats.ts`

The three numbers under the hero (leads delivered, spend managed, typical cost
per enquiry) are placeholders and each shows a "sample" marker.

- [ ] Total leads delivered across all client accounts, and the period covered
- [ ] Total ad spend managed, lifetime
- [ ] A defensible typical cost per enquiry, or the range across categories
- [ ] Set `isVerified: true` once all three are real

### 3. Pricing
**File:** `content/pricing.ts`

The three monthly fees are plausible market rates, **not your published prices**.
The page currently says they are indicative pending confirmation.

- [ ] Confirm or replace the Starter / Growth / Scale monthly fees
- [ ] Confirm the ad spend range each tier is built around
- [ ] Confirm what is included at each tier
- [ ] Remove the "indicative while we finalise our rate card" line in
      `components/sections/pricing-table.tsx` once the numbers are final

---

## Important — the site works without these, but is weaker

### 4. Testimonials
**File:** `content/testimonials.ts`

There are **no testimonials on the site**. The section shows an honest "no
reviews published yet" panel instead, and offers a reference on a call. This is
deliberate — invented praise is the fastest way to lose a sceptical owner, and
it is the one thing they will check.

For each real one:

- [ ] The exact words the client used (a WhatsApp screenshot is a fine source —
      transcribe it, do not write a tidier version)
- [ ] Their name, business name and city
- [ ] Written permission to publish all three
- [ ] Optionally a photo, 200×200 or larger, saved to `public/testimonials/`
- [ ] Set `isSample: false`

The section starts rendering automatically as soon as one is real.

### 5. Client logos
**File:** `content/stats.ts`

The trust bar currently scrolls the *categories* you work with, because there
are no logos.

- [ ] Get **written permission** from each client to display their logo
- [ ] Save SVG or transparent PNG files to `public/clients/`
- [ ] Add them to the `clientLogos` array

The marquee switches from categories to logos automatically once the array is
not empty.

### 6. Founder story
**File:** `app/about/page.tsx`

The "Why this exists" section is written from what is known and contains **no
invented biography**. To finish it:

- [ ] How and why BasuGrow started, in your own words
- [ ] What you did before this
- [ ] A founder photo, 800px+ square, at `public/team/founder.jpg`
- [ ] Any other team members

### 7. Logo source file
**Files:** `brand/logo-mark-source.png`, `public/logo-mark-mask.png`

The mark comes from the transparent PNG you supplied. It is converted to an
alpha mask by `scripts/extract-logo.mjs` and painted with `currentColor`, so it
always matches the palette.

- [ ] If you have the original **vector** (SVG or AI), add it — a vector stays
      sharp at any size. Re-run `node scripts/extract-logo.mjs <file>` after.

---

## Legal — have these reviewed

### 8. Privacy policy and terms
**Files:** `app/privacy/page.tsx`, `app/terms/page.tsx`

Both are written in plain language to describe what the site actually does.
**Neither has been reviewed by a lawyer.**

- [ ] Have both checked against India's DPDP Act 2023
- [ ] Confirm the data retention period (currently stated as two years)
- [ ] Add a registered business address if one exists
- [ ] Confirm the notice period and payment terms in the terms match what you
      actually agree with clients

---

## Configuration

### 9. Environment variables
**File:** `.env.local` (copy from `.env.example`)

The site builds and runs with all of these empty. Each one switches on a
feature; none of them break anything by their absence.

- [ ] `RESEND_API_KEY` + `LEAD_INBOX_EMAIL` — **the contact form emails you
      nothing until these are set.** Leads are logged to the server console
      instead. This is the highest priority item on this list.
- [ ] `NEXT_PUBLIC_SITE_URL` — set to the real domain in production, or
      canonical URLs and the sitemap will point at the wrong place
- [ ] `NEXT_PUBLIC_CAL_LINK` — your cal.com handle. Booking buttons fall back
      to the contact form until this is set
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` + `META_CAPI_ACCESS_TOKEN` — conversion
      tracking
- [ ] `NEXT_PUBLIC_GA_ID` — analytics
- [ ] `GOOGLE_SHEETS_WEBHOOK_URL` — optional lead log

---

## Standing rules

These are enforced in the code and the copy. Please keep them.

- **No guaranteed results anywhere.** Not in headlines, FAQs, service pages or
  fine print. Leads depend on offer, budget, market and follow-up speed, and
  the FAQ says so plainly.
- **No fake urgency.** No countdown timers, no "only 2 spots left", no offer
  deadlines that are not real.
- **No Meta partnership implied.** The footer states plainly that BasuGrow is
  independent and not affiliated with, certified by or endorsed by Meta,
  Facebook, Instagram or WhatsApp. Do not soften this unless it becomes true
  and documented.
- **No invented proof.** No logos, ratings or review counts without real ones.
- **No intrusive popups**, no entry or exit-intent modals, no autoplay media.

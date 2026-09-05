import { Section, Eyebrow, SectionTitle } from '@/components/ui/section';
import { publishedTestimonials } from '@/content/testimonials';
import { site } from '@/content/site';

/**
 * Renders only testimonials that are real and permissioned.
 *
 * While there are none, this shows an honest panel rather than sample quotes
 * dressed up as real ones. Invented praise is the fastest way to lose a
 * sceptical business owner, and it is the one thing they will check.
 */
export function Testimonials() {
  if (publishedTestimonials.length === 0) {
    return (
      <Section surface="bone" id="testimonials">
        <div className="border-ink/12 bg-sand/60 max-w-3xl rounded-[var(--radius-card)] border-[1.5px] p-8 md:p-10">
          <Eyebrow>Reviews</Eyebrow>
          <SectionTitle className="text-[length:var(--text-xl)]">
            No reviews published yet
          </SectionTitle>
          <p className="text-slate prose-body mt-4 text-[1rem]">
            BasuGrow is early, and we would rather show you nothing than write our own reviews.
            When clients are happy to be named, their words and their numbers go here.
          </p>
          <p className="text-slate prose-body mt-3 text-[1rem]">
            In the meantime, ask us for a reference on a call — we will put you in touch with
            someone we currently work with, in a business like yours.
          </p>
          <a
            href={`mailto:${site.contact.email}?subject=Can%20I%20speak%20to%20a%20client%3F`}
            className="text-ink hover:decoration-ink/60 mt-6 inline-block text-[0.9375rem] font-medium underline decoration-[1.5px] underline-offset-4"
          >
            Ask for a reference
          </a>
        </div>
      </Section>
    );
  }

  return (
    <Section surface="bone" id="testimonials">
      <div className="max-w-2xl">
        <Eyebrow>Reviews</Eyebrow>
        <SectionTitle>What clients say</SectionTitle>
      </div>
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {publishedTestimonials.map((t) => (
          <li key={`${t.name}-${t.business}`} className="card bg-sand/60 p-8">
            <blockquote className="text-ink text-[1.125rem]">&ldquo;{t.quote}&rdquo;</blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span
                aria-hidden
                className="bg-ink/[0.06] text-ink grid h-10 w-10 place-items-center rounded-full text-[0.875rem] font-semibold"
              >
                {t.name.slice(0, 1)}
              </span>
              <p className="text-slate text-[0.9375rem]">
                <span className="text-ink font-medium">{t.name}</span> · {t.business}, {t.city}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

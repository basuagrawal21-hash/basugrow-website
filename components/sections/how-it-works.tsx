import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { processSteps } from '@/content/process';

/**
 * Horizontal on desktop with a connecting rule, vertical timeline on mobile.
 * Numbered because this actually is a sequence.
 */
export function HowItWorks() {
  return (
    <Section surface="bone" id="how-it-works">
      <div className="max-w-2xl">
        <Eyebrow>How it works</Eyebrow>
        <SectionTitle>Four steps, and you only do the last one</SectionTitle>
        <Lede>
          From someone seeing the ad to you closing the sale, this is the whole path. Nothing about
          it is complicated, which is rather the point.
        </Lede>
      </div>

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        {/* Connecting rule, desktop only. Sits behind the numbers. */}
        <div
          aria-hidden
          className="bg-ink/12 absolute top-6 right-0 left-0 hidden h-px md:block"
        />

        {processSteps.map((step) => (
          <li key={step.n} className="relative flex gap-5 md:block">
            <div className="flex flex-col items-center md:block">
              <span className="bg-ink text-bone tnum relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full text-[1.0625rem] font-extrabold">
                {step.n}
              </span>
              {/* Vertical rule for the mobile timeline. */}
              <span
                aria-hidden
                className="bg-ink/12 mt-2 w-px flex-1 last:hidden md:hidden"
              />
            </div>
            <div className="pb-2 md:mt-6 md:pr-6">
              <h3 className="text-ink text-[1.1875rem]">{step.title}</h3>
              <p className="text-slate mt-2 text-[1rem]">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

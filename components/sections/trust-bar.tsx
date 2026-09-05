import { Section } from '@/components/ui/section';
import { Marquee } from '@/components/motion/marquee';
import { CountUp } from '@/components/motion/count-up';
import { clientLogos, clientCategories, trustStats } from '@/content/stats';

/**
 * Client proof plus three numbers.
 *
 * With no real client logos supplied, this shows the categories BasuGrow works
 * with rather than inventing logos, and every figure carries a "sample" marker
 * until trustStats.isVerified is true. A hollow proof bar is worse than an
 * honest one.
 */
export function TrustBar() {
  const hasLogos = clientLogos.length > 0;

  return (
    <Section surface="bone" className="!py-14 md:!py-16">
      <div className="marquee-fade -mx-5 md:-mx-8">
        <Marquee speed={42}>
          {(hasLogos ? clientLogos.map((l) => l.name) : clientCategories).map((label) => (
            <span
              key={label}
              className="text-slate/70 text-[0.9375rem] font-medium whitespace-nowrap"
            >
              {label}
            </span>
          ))}
        </Marquee>
      </div>

      <dl className="border-ink/10 mt-12 grid gap-8 border-t pt-10 sm:grid-cols-3">
        {trustStats.items.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <p className="text-ink text-[length:var(--text-xl)] leading-none font-extrabold">
                <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="text-ink mt-2.5 text-[0.9375rem] font-medium">{stat.label}</p>
              <p className="text-slate mt-0.5 text-[0.875rem]">
                {stat.note}
                {!trustStats.isVerified && (
                  <>
                    {' · '}
                    <span className="text-slate/80 italic">sample</span>
                  </>
                )}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {!trustStats.isVerified && (
        <p className="text-slate/80 mt-8 text-[0.8125rem]">
          These figures are illustrative while we finish putting the real reporting together. We
          would rather show you a placeholder than a number we cannot evidence.
        </p>
      )}
    </Section>
  );
}

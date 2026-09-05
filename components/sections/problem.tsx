import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { failureModes } from '@/content/process';

/**
 * Four blunt failure modes, each paired with what replaces it.
 * Two columns, no icons in circles — the copy is the content here.
 */
export function Problem() {
  return (
    <Section surface="bone" id="why-ads-fail">
      <div className="max-w-2xl">
        <Eyebrow>Why ads stop working</Eyebrow>
        <SectionTitle>Your ads aren&rsquo;t getting leads. Here&rsquo;s usually why.</SectionTitle>
        <Lede>
          Nearly every account we take over is losing money in one of these four ways. None of them
          are about the budget being too small.
        </Lede>
      </div>

      <ol className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
        {failureModes.map((mode, i) => (
          <li key={mode.wrong} className="border-ink/10 border-t pt-6">
            <p className="text-slate/60 tnum text-[0.875rem] font-semibold">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="text-ink mt-3 text-[length:var(--text-md)]">{mode.wrong}</h3>
            <p className="text-slate mt-3 max-w-[38rem] text-[1rem]">{mode.right}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { nav } from '@/content/site';

export default function NotFound() {
  return (
    <section className="bg-night text-bone flex min-h-[70vh] items-center py-24">
      <div className="container-page">
        <p className="text-bone/50 tnum text-[0.875rem] font-semibold tracking-[0.14em] uppercase">
          404
        </p>
        <h1 className="text-bone mt-4 max-w-2xl text-[length:var(--text-3xl)]">
          That page isn&rsquo;t here
        </h1>
        <p className="text-bone/70 mt-5 max-w-xl text-[length:var(--text-base)]">
          The address you followed doesn&rsquo;t match anything on this site. It may have been
          renamed, or the link may have been mistyped.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="gold" className="btn-sheen w-full sm:w-auto">
            Back to the home page
          </Button>
          <Button href="/contact" variant="outline-dark" className="w-full sm:w-auto">
            Tell us what you were looking for
          </Button>
        </div>

        <nav aria-label="Site sections" className="border-bone/15 mt-12 border-t pt-8">
          <p className="text-bone/50 text-[0.875rem]">Or try one of these:</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-bone/80 hover:text-bone text-[0.9375rem] underline decoration-[1.5px] underline-offset-4 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

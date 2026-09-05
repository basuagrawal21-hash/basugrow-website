import { Plus } from 'lucide-react';
import type { Faq } from '@/content/types';

/**
 * Native <details>/<summary>.
 *
 * Deliberately not a JS accordion: the browser gives us the expanded state,
 * keyboard handling and screen-reader semantics for free, it works before
 * hydration, and the answers are in the DOM for crawlers. A custom widget
 * would need aria-expanded wired by hand and would be worse in every respect.
 */
export function FaqList({ items, tone = 'dark' }: { items: Faq[]; tone?: 'dark' | 'light' }) {
  const border = tone === 'light' ? 'border-bone/15' : 'border-ink/12';
  const question = tone === 'light' ? 'text-bone' : 'text-ink';
  const answer = tone === 'light' ? 'text-bone/70' : 'text-slate';

  return (
    <div className={`border-t ${border}`}>
      {items.map((item) => (
        <details key={item.q} className={`group/faq border-b ${border}`}>
          <summary
            className={`flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.0625rem] font-medium ${question} marker:hidden [&::-webkit-details-marker]:hidden`}
          >
            {item.q}
            <Plus
              size={20}
              aria-hidden
              className={`mt-0.5 shrink-0 transition-transform duration-300 group-open/faq:rotate-45 ${
                tone === 'light' ? 'text-bone/50' : 'text-slate/60'
              }`}
            />
          </summary>
          <p className={`prose-body pb-6 text-[1rem] ${answer}`}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

import type { ReactNode } from 'react';

/** Shared typography for the privacy and terms pages. */
export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <div className="prose-body [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-[1.25rem] [&_li]:mt-1.5 [&_p]:mt-4 [&_p]:text-[1.0625rem] [&_p]:text-slate [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-[1.0625rem] [&_ul]:text-slate [&_a]:text-ink [&_a]:underline [&_a]:decoration-[1.5px] [&_a]:underline-offset-4">
      {children}
    </div>
  );
}

import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';

/** Prose styling for blog bodies, applied per element so no plugin is needed. */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="text-ink mt-12 mb-4 text-[length:var(--text-lg)]" {...props} />,
  h3: (props) => <h3 className="text-ink mt-9 mb-3 text-[1.25rem]" {...props} />,
  p: (props) => <p className="text-slate prose-body mt-4 text-[1.0625rem]" {...props} />,
  ul: (props) => <ul className="text-slate prose-body mt-4 space-y-2.5 text-[1.0625rem]" {...props} />,
  ol: (props) => (
    <ol className="text-slate prose-body mt-4 list-decimal space-y-2.5 pl-5 text-[1.0625rem]" {...props} />
  ),
  li: (props) => <li className="marker:text-slate/50" {...props} />,
  strong: (props) => <strong className="text-ink font-semibold" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-ink/20 text-ink mt-6 border-l-[3px] pl-5 text-[1.125rem] italic"
      {...props}
    />
  ),
  hr: () => <hr className="border-ink/12 my-10" />,
  a: ({ href = '', ...props }) =>
    href.startsWith('/') ? (
      <Link
        href={href}
        className="text-ink hover:decoration-ink/60 underline decoration-[1.5px] underline-offset-4"
        {...props}
      />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink hover:decoration-ink/60 underline decoration-[1.5px] underline-offset-4"
        {...props}
      />
    ),
};

import Link from 'next/link';
import { type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/motion/magnetic';

type Variant = 'gold' | 'outline-dark' | 'outline-light' | 'ink' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  /* Primary. Ink on gold measures 11.4:1. */
  gold: 'bg-gold text-ink hover:bg-[#FFD37A]',
  /* On night sections. */
  'outline-dark': 'border-[1.5px] border-bone/30 text-bone hover:border-bone/60 hover:bg-bone/10',
  /* On bone and sand sections. */
  'outline-light': 'border-[1.5px] border-ink/25 text-ink hover:border-ink hover:bg-ink/5',
  ink: 'bg-ink text-bone hover:bg-night',
  ghost: 'text-ink hover:bg-ink/5',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[1rem]',
  lg: 'h-14 px-7 text-[1.0625rem]',
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * `magnetic` is opt-in and reserved for primary CTAs. Wrapping every button
 * in a client island would defeat the point of server components.
 */
export function Button({
  variant = 'gold',
  size = 'lg',
  magnetic = false,
  className,
  children,
  href,
  ...rest
}: BaseProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className'>)
    | ({ href?: undefined } & Omit<ComponentProps<'button'>, 'className' | 'children'>)
  )) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const el = href ? (
    <Link
      href={href}
      className={classes}
      {...(rest as Omit<ComponentProps<typeof Link>, 'href' | 'className'>)}
    >
      {children}
    </Link>
  ) : (
    <button className={classes} {...(rest as Omit<ComponentProps<'button'>, 'className'>)}>
      {children}
    </button>
  );

  return magnetic ? <Magnetic className="rounded-full">{el}</Magnetic> : el;
}

/** External links (WhatsApp, Instagram, Cal) — plain anchor, no prefetch. */
export function ButtonLink({
  variant = 'outline-dark',
  size = 'lg',
  magnetic = false,
  className,
  children,
  ...rest
}: BaseProps & Omit<ComponentProps<'a'>, 'className' | 'children'>) {
  const el = (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  );
  return magnetic ? <Magnetic className="rounded-full">{el}</Magnetic> : el;
}

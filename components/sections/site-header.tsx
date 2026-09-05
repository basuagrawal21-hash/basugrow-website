'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageCircle } from 'lucide-react';
import { nav, site, whatsappLink } from '@/content/site';
import { Logo } from '@/components/ui/logo';
import { Button, ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScrolledPast } from '@/lib/use-scroll';

export function SiteHeader() {
  const scrolled = useScrolledPast(80);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close the drawer on navigation. Adjusting state during render is the
  // documented pattern for reacting to a changed value — an effect here would
  // render the drawer open for one frame on the new route.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  // Lock the page, trap focus, and restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea',
    );
    focusables?.[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-willow/12 bg-pine/85 py-2.5 backdrop-blur-xl'
          : 'border-b border-transparent py-4',
      )}
    >
      <div className="container-page flex items-center justify-between gap-6">
        <Logo tone="light" />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-paper/75 transition-colors hover:bg-willow/10 hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/contact" variant="gold" size="md" magnetic className="btn-sheen">
            Free ad audit
          </Button>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-willow/30 text-paper lg:hidden"
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {/* Full-screen mobile drawer. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 top-0 z-50 flex h-dvh flex-col bg-pine px-5 pt-5 pb-10 lg:hidden"
      >
        <div className="flex items-center justify-between">
          <Logo tone="light" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-willow/30 text-paper"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="mt-10 flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-willow/12 py-4 font-display text-[length:var(--text-lg)] font-extrabold tracking-[-0.03em] text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 pt-10">
          <Button href="/contact" variant="gold" className="w-full">
            Get a free ad audit
          </Button>
          <ButtonLink
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-dark"
            className="w-full"
          >
            <MessageCircle size={18} aria-hidden />
            WhatsApp {site.contact.phoneDisplay}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

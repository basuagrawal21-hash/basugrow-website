'use client';

import { useScrolledPast, useScrolledRatio } from '@/lib/use-scroll';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { site, whatsappLink } from '@/content/site';

/** Thin willow progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="bg-willow fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
    />
  );
}

/**
 * WhatsApp on mobile, back-to-top past 60%. Both bottom-right.
 *
 * The WhatsApp button stays hidden over the hero. It is a fixed element, so
 * it sits on top of whatever is beneath it — and over the hero that was the
 * trust row. It is also redundant there, because the hero has its own
 * WhatsApp button a few hundred pixels above. Revealing it only once the hero
 * has scrolled away fixes the collision and removes a duplicate CTA.
 */
export function FloatingActions() {
  const showTop = useScrolledRatio(0.6);
  const pastHero = useScrolledPast(520);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="border-ink/20 bg-bone text-ink hover:bg-sand pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] shadow-none transition-colors"
        >
          <ArrowUp size={18} aria-hidden />
        </button>
      )}

      {pastHero && (
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-moss text-bone hover:bg-night pointer-events-auto inline-flex h-14 items-center gap-2.5 rounded-full px-5 font-medium transition-colors md:hidden"
          aria-label={`Message ${site.name} on WhatsApp`}
        >
          <MessageCircle size={20} aria-hidden />
          WhatsApp us
        </a>
      )}
    </div>
  );
}

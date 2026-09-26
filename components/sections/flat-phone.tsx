'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCheck, Signal, Wifi, BatteryFull } from 'lucide-react';
import { sampleLeads, phoneScreen, leadTiming } from '@/content/leads';
import { useReducedMotionPref } from '@/lib/use-media';
import { cn } from '@/lib/utils';

/**
 * The hero phone, in plain DOM and CSS. This is what most visitors see — every
 * phone, anything under 900px, reduced motion, Save-Data — and it is also the
 * Suspense fallback the WebGL scene paints over. Four cards are in the server
 * HTML, so the first frame is already a complete inbox.
 *
 * Arrivals are CSS: each card sits in a slot via a custom property, a new card
 * mounts at slot 0 with a one-shot keyframe, and the rest transition down. The
 * fifth slot fades out and is dropped on the next arrival. No JS animation
 * library, one timer, and the timer only runs while the phone is on screen.
 */
type Card = { id: number; lead: number };

const MAX_CARDS = 5;

const seed = (): Card[] =>
  // Newest first. Seeded cards carry ids below `seeded`, which is how they
  // know not to play the arrival keyframe.
  Array.from({ length: leadTiming.seeded }, (_, i) => ({
    id: i,
    lead: leadTiming.seeded - 1 - i,
  }));

export function FlatPhone({ className, paused = false }: { className?: string; paused?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const [cards, setCards] = useState(seed);
  const [running, setRunning] = useState(false);
  const arrivals = useRef(0);

  // Run only while the phone is on screen and the tab is visible.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let inView = false;
    const update = () => setRunning(inView && document.visibilityState === 'visible');
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', update);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    // Paused while the WebGL scene is loading or showing, so the two stay in step.
    if (!running || reduced || paused) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = (ms: number) => {
      timer = setTimeout(() => {
        const n = arrivals.current++;
        setCards((prev) => [
          { id: leadTiming.seeded + n, lead: (leadTiming.seeded + n) % sampleLeads.length },
          ...prev.slice(0, MAX_CARDS - 1),
        ]);
        schedule(leadTiming.intervalMs);
      }, ms);
    };
    schedule(arrivals.current === 0 ? leadTiming.firstArrivalMs : leadTiming.intervalMs);
    return () => clearTimeout(timer);
  }, [running, reduced, paused]);

  const newestId = cards[0].id;

  return (
    <div ref={rootRef} className={cn('flat-phone mx-auto w-full max-w-[18.5rem]', className)}>
      <div className="phone-body relative rounded-[2.6rem] p-[9px]">
        <span aria-hidden className="phone-key top-[6.5rem] h-10" />
        <span aria-hidden className="phone-key top-[9.5rem] h-14" />

        <div className="phone-screen bg-night relative isolate overflow-hidden rounded-[2.1rem]">
          {newestId >= leadTiming.seeded && (
            <span key={newestId} aria-hidden className="screen-pulse" />
          )}

          <div
            aria-hidden
            className="text-lichen flex items-center justify-between px-6 pt-3.5 pb-2 text-[0.6875rem]"
          >
            <span className="tnum text-bone/80 font-extrabold">{phoneScreen.time}</span>
            <span className="flex items-center gap-1.5">
              <Signal size={11} />
              <Wifi size={11} />
              <BatteryFull size={14} />
            </span>
          </div>

          <div className="flex items-center gap-3 px-5 pt-1.5 pb-3.5">
            <span
              aria-hidden
              className="bg-willow/15 text-willow ring-willow/25 font-display grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.8125rem] font-extrabold ring-1"
            >
              {phoneScreen.avatar}
            </span>
            <div className="leading-tight">
              <p className="text-bone font-display text-[1.0625rem] font-extrabold tracking-[-0.02em]">
                {phoneScreen.title}
              </p>
              <p className="text-willow text-[0.75rem]">{phoneScreen.subtitle}</p>
            </div>
          </div>

          <div aria-hidden className="bg-bone/10 mx-5 h-px" />

          <ol aria-label="Sample incoming leads" className="lead-stack relative mx-3 mt-3">
            {cards.map((card, slot) => {
              const lead = sampleLeads[card.lead];
              const leaving = slot >= leadTiming.seeded;
              return (
                <li
                  key={card.id}
                  aria-hidden={leaving || undefined}
                  className="lead-slot"
                  style={{ ['--slot' as string]: slot }}
                  data-leaving={leaving || undefined}
                >
                  <div
                    className={cn(
                      'lead-card bg-pine border-willow/22 relative h-full overflow-hidden rounded-[0.9rem] border py-2.5 pr-3.5 pl-[1.1rem]',
                      card.id >= leadTiming.seeded && 'lead-arrive',
                    )}
                  >
                    <span aria-hidden className="bg-willow absolute inset-y-0 left-0 w-[4.5px]" />
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-bone font-display text-[1rem] leading-tight font-extrabold tracking-[-0.02em]">
                        {lead.name}
                      </p>
                      <span className="text-lichen shrink-0 text-[0.75rem]">
                        {phoneScreen.arrivedLabel}
                      </span>
                    </div>
                    <p className="text-willow mt-0.5 text-[0.875rem] leading-snug">
                      {lead.enquiry}
                    </p>
                    <p className="text-lichen mt-0.5 flex items-center gap-1.5 text-[0.8125rem] leading-snug">
                      <CheckCheck size={13} aria-hidden className="text-willow/70 shrink-0" />
                      {lead.place}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="border-bone/10 mx-5 mt-3.5 border-t pt-3 pb-5">
            <div className="flex items-baseline justify-between text-[0.75rem]">
              <span className="text-lichen">{phoneScreen.footerLabel}</span>
              <span className="text-bone/80 font-semibold">{phoneScreen.footerCount}</span>
            </div>
            <p className="text-lichen mt-1 text-[0.6875rem]">{phoneScreen.footerNote}</p>
          </div>
        </div>
      </div>

      <p className="text-lichen mt-3.5 text-center text-[0.8125rem]">{phoneScreen.caption}</p>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCheck, Signal, Wifi, BatteryFull } from 'lucide-react';
import { sampleLeads, phoneScreen } from '@/content/leads';

/**
 * The hero's right column: a phone frame where WhatsApp-style lead
 * notifications drop in one at a time, push the stack down and fade out.
 *
 * These names are illustrative and the frame is labelled as a sample. Do not
 * dress this up as a real client inbox.
 *
 * Implementation note: every lead is mounted once and never unmounts. A running
 * tick maps each card to a slot, and the card transitions to that slot's offset
 * and opacity. Nothing enters or leaves the tree, so there is no mount race and
 * no chance of an exiting card landing on top of an incoming one.
 *
 * The motion is plain CSS transitions (.lead-card in globals.css), and the
 * first three cards are in the server HTML at rest, so the phone is complete in
 * the first painted frame. The timer only runs while the phone is on screen.
 */
const INTERVAL = 2200;
const CARD_H = 84;
const GAP = 10;
const STEP = CARD_H + GAP;
/** Three cards are visible. Slot 3 is the fade-out; 4 and up are parked above. */
const VISIBLE = 3;
const SLOT_OPACITY = [1, 0.6, 0.28, 0];
const PARKED_Y = -26;

function slotStyle(slot: number) {
  if (slot <= VISIBLE) {
    return { y: slot * STEP, opacity: SLOT_OPACITY[slot] ?? 0, scale: 1 };
  }
  // Waiting above the frame, invisible, ready to drop into slot 0.
  return { y: PARKED_Y, opacity: 0, scale: 0.97 };
}

export function LeadTicker({ paused = false }: { paused?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const el = ref.current;
    // Paused while the WebGL phone is loading or showing, so the two stay in step.
    if (!el || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let id: ReturnType<typeof setInterval> | undefined;
    let inView = false;
    const sync = () => {
      const run = inView && document.visibilityState === 'visible';
      if (run && !id) id = setInterval(() => setTick((t) => t + 1), INTERVAL);
      if (!run && id) {
        clearInterval(id);
        id = undefined;
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      if (id) clearInterval(id);
    };
  }, [paused]);

  // Every lead has a permanent DOM node. Its slot walks 0 -> 1 -> 2 ... and
  // wraps back to 0 through the parked positions above the frame.
  const count = sampleLeads.length;
  const slotOf = (index: number) => (((tick - index) % count) + count) % count;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[320px]">
      <div className="phone-body border-bone/12 bg-night relative overflow-hidden rounded-[2.25rem] border-[1.5px] p-2.5">
        <div className="bg-pine overflow-hidden rounded-[1.75rem]">
          <div className="text-bone/45 flex items-center justify-between px-5 pt-3 pb-2 text-[0.6875rem]">
            <span className="tnum">{phoneScreen.time}</span>
            <div className="flex items-center gap-1.5">
              <Signal size={11} aria-hidden />
              <Wifi size={11} aria-hidden />
              <BatteryFull size={13} aria-hidden />
            </div>
          </div>

          <div className="border-bone/10 flex items-center gap-3 border-b px-5 pb-3.5">
            <span
              aria-hidden
              className="bg-willow/15 text-willow grid h-9 w-9 place-items-center rounded-full text-[0.8125rem] font-semibold"
            >
              {phoneScreen.avatar}
            </span>
            <div className="leading-tight">
              <p className="text-bone text-[0.875rem] font-semibold">{phoneScreen.title}</p>
              <p className="text-willow text-[0.75rem]">{phoneScreen.subtitle}</p>
            </div>
          </div>

          <div
            className="relative mx-3.5 my-3.5"
            style={{ height: VISIBLE * STEP - GAP }}
            // Screen readers get a label; the cards are decorative motion.
            aria-label="Sample incoming leads"
            role="img"
          >
            {sampleLeads.map((lead, index) => {
              const slot = slotOf(index);
              const { y, opacity, scale } = slotStyle(slot);
              // Wrapping from the bottom slot back up to the parked position
              // happens while invisible, so it should not be animated.
              const wrapping = slot > VISIBLE;

              return (
                <div
                  key={lead.name}
                  aria-hidden
                  className="lead-card border-bone/10 bg-bone/[0.04] absolute inset-x-0 top-0 rounded-2xl border-[1.5px] px-3.5 py-2.5"
                  data-wrapping={wrapping || undefined}
                  style={{
                    height: CARD_H,
                    opacity,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-bone text-[0.9375rem] font-semibold">{lead.name}</p>
                    <span className="tnum text-bone/40 shrink-0 text-[0.6875rem]">
                      {phoneScreen.arrivedLabel}
                    </span>
                  </div>
                  <p className="text-willow mt-0.5 text-[0.8125rem]">{lead.enquiry}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <CheckCheck size={12} className="text-willow/70 shrink-0" aria-hidden />
                    <p className="text-bone/45 truncate text-[0.75rem]">{lead.place}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lichen rather than the original bone/40: that measured 3.58:1 on
          night, under AA for a caption that has to be read. */}
      <p className="text-lichen mt-3 text-center text-[0.8125rem]">{phoneScreen.caption}</p>
    </div>
  );
}

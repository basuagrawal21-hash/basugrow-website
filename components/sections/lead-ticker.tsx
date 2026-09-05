'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCheck, Signal, Wifi, BatteryFull } from 'lucide-react';

/**
 * The hero's right column: a phone frame where WhatsApp-style lead
 * notifications drop in one at a time, push the stack down and fade out.
 *
 * These names are illustrative and the frame is labelled as a sample. Do not
 * dress this up as a real client inbox.
 *
 * Implementation note: every lead is mounted once and never unmounts. A running
 * tick maps each card to a slot, and the card animates to that slot's offset and
 * opacity. Nothing enters or leaves the tree, so there is no mount race and no
 * chance of an exiting card landing on top of an incoming one — both of which
 * happened with AnimatePresence + popLayout.
 */
type Lead = {
  name: string;
  enquiry: string;
  place: string;
};

// Cities rather than localities — campaigns run right across India, and the
// ticker should read that way at a glance.
const LEADS: Lead[] = [
  { name: 'Rahul', enquiry: 'Gym trial enquiry', place: 'Indore' },
  { name: 'Priya', enquiry: 'Free trial booked', place: 'Pune' },
  { name: 'Imran', enquiry: 'Site visit requested', place: 'Jaipur' },
  { name: 'Sneha', enquiry: 'Consultation enquiry', place: 'Hyderabad' },
  { name: 'Vikas', enquiry: 'Membership enquiry', place: 'Jhansi' },
  { name: 'Fatima', enquiry: 'Salon first visit', place: 'Delhi NCR' },
];

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

export function LeadTicker() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), INTERVAL);
    return () => clearInterval(id);
  }, [reduced]);

  // Every lead has a permanent DOM node. Its slot walks 0 -> 1 -> 2 ... and
  // wraps back to 0 through the parked positions above the frame.
  const slotOf = (index: number) => (((tick - index) % LEADS.length) + LEADS.length) % LEADS.length;

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="border-bone/12 bg-night relative overflow-hidden rounded-[2.25rem] border-[1.5px] p-2.5">
        <div className="overflow-hidden rounded-[1.75rem] bg-[#0F2A23]">
          <div className="text-bone/45 flex items-center justify-between px-5 pt-3 pb-2 text-[0.6875rem]">
            <span className="tnum">9:41</span>
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
              BG
            </span>
            <div className="leading-tight">
              <p className="text-bone text-[0.875rem] font-semibold">New leads</p>
              <p className="text-willow text-[0.75rem]">delivered instantly</p>
            </div>
          </div>

          <div
            className="relative mx-3.5 my-3.5"
            style={{ height: VISIBLE * STEP - GAP }}
            // Screen readers get the newest entry only; the rest is decorative motion.
            aria-label="Sample incoming leads"
            role="img"
          >
            {LEADS.map((lead, index) => {
              const slot = slotOf(index);
              const target = slotStyle(slot);
              // Wrapping from the bottom slot back up to the parked position
              // happens while invisible, so it should not be animated.
              const wrapping = slot > VISIBLE;

              return (
                <motion.div
                  key={lead.name}
                  aria-hidden
                  className="border-bone/10 bg-bone/[0.04] absolute inset-x-0 top-0 rounded-2xl border-[1.5px] px-3.5 py-2.5"
                  style={{ height: CARD_H }}
                  initial={false}
                  animate={target}
                  transition={
                    reduced || wrapping
                      ? { duration: 0 }
                      : { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
                  }
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-bone text-[0.9375rem] font-semibold">{lead.name}</p>
                    <span className="tnum text-bone/40 shrink-0 text-[0.6875rem]">now</span>
                  </div>
                  <p className="text-willow mt-0.5 text-[0.8125rem]">{lead.enquiry}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <CheckCheck size={12} className="text-willow/70 shrink-0" aria-hidden />
                    <p className="text-bone/45 truncate text-[0.75rem]">{lead.place}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-bone/40 mt-3 text-center text-[0.8125rem]">
        Sample — illustrative names and enquiries
      </p>
    </div>
  );
}

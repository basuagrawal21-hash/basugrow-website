'use client';

import { cn } from '@/lib/utils';

/**
 * A labelled number input paired with a range slider. Both write the same
 * value, so people can drag or type — typing matters here because business
 * owners know their exact numbers.
 */
export function SliderInput({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
  suffix,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (n: number) => string;
  suffix?: string;
}) {
  const id = `input-${label.replace(/\W+/g, '-').toLowerCase()}`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-ink text-[0.9375rem] font-medium">
          {label}
        </label>
        <span className="text-ink tnum text-[1.0625rem] font-extrabold">
          {format ? format(value) : value}
          {suffix}
        </span>
      </div>

      {hint && (
        <p id={hintId} className="text-slate mt-1 text-[0.875rem]">
          {hint}
        </p>
      )}

      <div className="mt-3 flex items-center gap-4">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-describedby={hint ? hintId : undefined}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            'accent-ink h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/15',
            'focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold',
          )}
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={`${label} (type a value)`}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          className="border-ink/15 bg-bone text-ink tnum focus-visible:outline-gold w-24 shrink-0 rounded-lg border-[1.5px] px-3 py-2 text-[0.9375rem] focus-visible:outline-3 focus-visible:outline-offset-2"
        />
      </div>
    </div>
  );
}

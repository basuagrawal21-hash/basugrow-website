'use client';

import { useMemo, useState } from 'react';
import { SliderInput } from '@/components/ui/slider-input';
import { inr, indianNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

/**
 * Budget + cost per lead + close rate + order value, in; leads, customers,
 * revenue and ROAS out. Entirely client-side, nothing gated, nothing sent.
 */
export function CplCalculator() {
  const [budget, setBudget] = useState(50000);
  const [cpl, setCpl] = useState(150);
  const [closeRate, setCloseRate] = useState(15);
  const [orderValue, setOrderValue] = useState(6000);

  const result = useMemo(() => {
    const leads = cpl > 0 ? budget / cpl : 0;
    const customers = leads * (closeRate / 100);
    const revenue = customers * orderValue;
    const roas = budget > 0 ? revenue / budget : 0;
    const cac = customers > 0 ? budget / customers : 0;
    return { leads, customers, revenue, roas, cac };
  }, [budget, cpl, closeRate, orderValue]);

  const profitable = result.roas >= 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
      <div className="border-ink/12 bg-bone space-y-8 rounded-[var(--radius-card)] border-[1.5px] p-7 md:p-8">
        <SliderInput
          label="Monthly ad budget"
          hint="What you pay Meta, not including any management fee."
          value={budget}
          onChange={setBudget}
          min={5000}
          max={500000}
          step={1000}
          format={(n) => inr(n)}
        />
        <SliderInput
          label="Cost per enquiry"
          hint="What one lead costs you. If you do not know, ₹150 is a fair starting guess for a local service."
          value={cpl}
          onChange={setCpl}
          min={20}
          max={2000}
          step={10}
          format={(n) => inr(n)}
        />
        <SliderInput
          label="Enquiries that become customers"
          hint="Out of every 100 people who enquire, how many buy? Be honest rather than hopeful."
          value={closeRate}
          onChange={setCloseRate}
          min={1}
          max={100}
          step={1}
          suffix="%"
        />
        <SliderInput
          label="Average value of a customer"
          hint="What one customer is worth to you — a membership, a treatment, a first order."
          value={orderValue}
          onChange={setOrderValue}
          min={200}
          max={500000}
          step={200}
          format={(n) => inr(n)}
        />
      </div>

      <div className="space-y-5">
        <div className="border-ink/12 bg-sand/70 rounded-[var(--radius-card)] border-[1.5px] p-7 md:p-8">
          <dl className="grid grid-cols-2 gap-6">
            <div>
              <dt className="text-slate text-[0.875rem]">Enquiries a month</dt>
              <dd className="text-ink tnum mt-1 text-[length:var(--text-lg)] leading-none font-extrabold">
                {indianNumber(Math.floor(result.leads))}
              </dd>
            </div>
            <div>
              <dt className="text-slate text-[0.875rem]">Customers a month</dt>
              <dd className="text-ink tnum mt-1 text-[length:var(--text-lg)] leading-none font-extrabold">
                {indianNumber(Math.floor(result.customers))}
              </dd>
            </div>
            <div>
              <dt className="text-slate text-[0.875rem]">Cost per customer</dt>
              <dd className="text-ink tnum mt-1 text-[1.375rem] leading-none font-extrabold">
                {result.customers >= 1 ? inr(result.cac) : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-slate text-[0.875rem]">Revenue from ads</dt>
              <dd className="text-ink tnum mt-1 text-[1.375rem] leading-none font-extrabold">
                {inr(result.revenue)}
              </dd>
            </div>
          </dl>

          <div className="border-ink/12 mt-7 border-t pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-ink text-[0.9375rem] font-medium">
                Return on ad spend
                <span className="text-slate block text-[0.875rem] font-normal">
                  Revenue divided by what you spent
                </span>
              </p>
              <p
                className={cn(
                  'tnum text-[length:var(--text-xl)] leading-none font-extrabold',
                  profitable ? 'text-ink' : 'text-[#B3261E]',
                )}
              >
                {result.roas.toFixed(1)}×
              </p>
            </div>

            {/* Simple bar: how far past break-even you are, capped at 5x. */}
            <div className="bg-ink/10 relative mt-5 h-2.5 overflow-hidden rounded-full">
              <div
                className={cn('h-full rounded-full', profitable ? 'bg-gold' : 'bg-[#B3261E]')}
                style={{ width: `${Math.min(100, (result.roas / 5) * 100)}%` }}
              />
              <div
                aria-hidden
                className="bg-ink/40 absolute top-0 h-full w-px"
                style={{ left: '20%' }}
              />
            </div>
            <p className="text-slate mt-2 text-[0.8125rem]">
              The line marks 1× — break-even on ad spend alone, before your own costs.
            </p>
          </div>
        </div>

        <div className="border-ink/12 rounded-[var(--radius-card)] border-[1.5px] p-7">
          <p className="text-slate text-[0.9375rem]">
            {profitable ? (
              <>
                At these numbers every ₹1 of ad spend returns{' '}
                <span className="text-ink font-medium">₹{result.roas.toFixed(1)}</span> in revenue.
                Remember this is revenue, not profit — subtract your cost of delivery and any
                management fee before deciding.
              </>
            ) : (
              <>
                At these numbers ads lose money. The fastest fixes are usually the close rate and
                the customer value, not the cost per enquiry — a better offer and faster follow-up
                move both.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

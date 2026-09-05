'use client';

import { useMemo, useState } from 'react';
import { SliderInput } from '@/components/ui/slider-input';
import { inr, indianNumber } from '@/lib/utils';

/**
 * Works backwards: start from the customers you want, end at the budget that
 * gets you there. The reverse of the CPL calculator, and the question owners
 * actually ask first.
 */
export function BudgetCalculator() {
  const [customers, setCustomers] = useState(20);
  const [closeRate, setCloseRate] = useState(15);
  const [cpl, setCpl] = useState(150);
  const [orderValue, setOrderValue] = useState(6000);

  const result = useMemo(() => {
    const leadsNeeded = closeRate > 0 ? customers / (closeRate / 100) : 0;
    const budget = leadsNeeded * cpl;
    const revenue = customers * orderValue;
    const roas = budget > 0 ? revenue / budget : 0;
    const dailyBudget = budget / 30;
    return { leadsNeeded, budget, revenue, roas, dailyBudget };
  }, [customers, closeRate, cpl, orderValue]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
      <div className="border-ink/12 bg-bone space-y-8 rounded-[var(--radius-card)] border-[1.5px] p-7 md:p-8">
        <SliderInput
          label="Customers you want a month"
          hint="New customers from ads, on top of whatever you already get."
          value={customers}
          onChange={setCustomers}
          min={1}
          max={500}
          step={1}
        />
        <SliderInput
          label="Enquiries that become customers"
          hint="Out of every 100 enquiries, how many buy?"
          value={closeRate}
          onChange={setCloseRate}
          min={1}
          max={100}
          step={1}
          suffix="%"
        />
        <SliderInput
          label="Cost per enquiry"
          hint="Use your own figure if you have one. Otherwise start at the middle of your industry's range."
          value={cpl}
          onChange={setCpl}
          min={20}
          max={2000}
          step={10}
          format={(n) => inr(n)}
        />
        <SliderInput
          label="Average value of a customer"
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
          <p className="text-slate text-[0.9375rem]">To get there you would need</p>
          <p className="text-ink tnum mt-2 text-[length:var(--text-2xl)] leading-none font-extrabold">
            {inr(Math.round(result.budget))}
          </p>
          <p className="text-slate mt-2 text-[0.9375rem]">
            a month in ad spend — about{' '}
            <span className="text-ink font-medium tnum">
              {inr(Math.round(result.dailyBudget))}
            </span>{' '}
            a day
          </p>

          <dl className="border-ink/12 mt-7 grid grid-cols-2 gap-6 border-t pt-6">
            <div>
              <dt className="text-slate text-[0.875rem]">Enquiries needed</dt>
              <dd className="text-ink tnum mt-1 text-[1.375rem] leading-none font-extrabold">
                {indianNumber(Math.ceil(result.leadsNeeded))}
              </dd>
            </div>
            <div>
              <dt className="text-slate text-[0.875rem]">Revenue at that volume</dt>
              <dd className="text-ink tnum mt-1 text-[1.375rem] leading-none font-extrabold">
                {inr(result.revenue)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="border-ink/12 rounded-[var(--radius-card)] border-[1.5px] p-7">
          <p className="text-slate text-[0.9375rem]">
            {result.budget < 20000 ? (
              <>
                That budget is below the point where a month gives enough data to optimise on. You
                can still run, but expect the first two months to be more about learning than
                results.
              </>
            ) : (
              <>
                Every ₹1 here returns about{' '}
                <span className="text-ink font-medium">₹{result.roas.toFixed(1)}</span> in revenue.
                Budgets rarely scale in a straight line, though — cost per enquiry usually rises as
                you push volume, so treat this as a starting point, not a promise.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

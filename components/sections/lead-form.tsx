'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { AlertCircle } from 'lucide-react';
import { submitLead } from '@/app/contact/actions';
import { industryOptions, budgetOptions, type LeadFormState } from '@/lib/lead-schema';
import { cn } from '@/lib/utils';

const initial: LeadFormState = { ok: false };

function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => React.ReactNode;
}) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ');

  return (
    <div>
      <label htmlFor={id} className="text-ink block text-[0.9375rem] font-medium">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-slate mt-1 text-[0.875rem]">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {children({ id, describedBy: describedBy || undefined, invalid: Boolean(error) })}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[0.875rem] text-[#B3261E]">
          <AlertCircle size={14} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  'w-full rounded-xl border-[1.5px] bg-bone px-4 py-3 text-[1rem] text-ink transition-colors placeholder:text-slate/60 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-gold';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-sheen bg-gold text-ink inline-flex h-14 w-full items-center justify-center rounded-full px-7 text-[1.0625rem] font-medium transition-colors hover:bg-[#FFD37A] disabled:opacity-70 sm:w-auto"
    >
      {pending ? 'Sending…' : 'Send and get my free audit'}
    </button>
  );
}

export function LeadForm() {
  const [state, formAction] = useActionState(submitLead, initial);
  const v = state.values ?? {};

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message && !state.ok && (
        <p
          role="alert"
          className="rounded-xl border-[1.5px] border-[#B3261E]/30 bg-[#B3261E]/[0.06] px-4 py-3 text-[0.9375rem] text-[#B3261E]"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" error={state.errors?.name}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="name"
              type="text"
              autoComplete="name"
              defaultValue={v.name}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={cn(inputBase, invalid ? 'border-[#B3261E]/50' : 'border-ink/15')}
            />
          )}
        </Field>

        <Field label="Business name" name="business" error={state.errors?.business}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              name="business"
              type="text"
              autoComplete="organization"
              defaultValue={v.business}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={cn(inputBase, invalid ? 'border-[#B3261E]/50' : 'border-ink/15')}
            />
          )}
        </Field>
      </div>

      <Field
        label="WhatsApp number"
        name="whatsapp"
        hint="This is where we send your audit, so make sure it is the one you use."
        error={state.errors?.whatsapp}
      >
        {({ id, describedBy, invalid }) => (
          <div className="flex">
            <span
              aria-hidden
              className="border-ink/15 bg-sand text-slate inline-flex items-center rounded-l-xl border-[1.5px] border-r-0 px-3.5 text-[1rem]"
            >
              +91
            </span>
            <input
              id={id}
              name="whatsapp"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              defaultValue={v.whatsapp}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={cn(
                inputBase,
                'rounded-l-none',
                invalid ? 'border-[#B3261E]/50' : 'border-ink/15',
              )}
            />
          </div>
        )}
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="What kind of business?" name="industry" error={state.errors?.industry}>
          {({ id, describedBy, invalid }) => (
            <select
              id={id}
              name="industry"
              defaultValue={v.industry ?? ''}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={cn(inputBase, invalid ? 'border-[#B3261E]/50' : 'border-ink/15')}
            >
              <option value="" disabled>
                Choose one
              </option>
              {industryOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          )}
        </Field>

        {/* The qualifier lives in the label, not a hint line. As a hint it sat
            between the label and the control and pushed this select a line
            lower than the one beside it. */}
        <Field
          label="Monthly ad budget (roughly is fine)"
          name="budget"
          error={state.errors?.budget}
        >
          {({ id, describedBy, invalid }) => (
            <select
              id={id}
              name="budget"
              defaultValue={v.budget ?? ''}
              aria-describedby={describedBy}
              aria-invalid={invalid}
              className={cn(inputBase, invalid ? 'border-[#B3261E]/50' : 'border-ink/15')}
            >
              <option value="" disabled>
                Choose one
              </option>
              {budgetOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Field
        label="Anything else?"
        name="message"
        hint="What you sell, what you have tried, what is not working. Optional."
        error={state.errors?.message}
      >
        {({ id, describedBy, invalid }) => (
          <textarea
            id={id}
            name="message"
            rows={4}
            defaultValue={v.message}
            aria-describedby={describedBy}
            aria-invalid={invalid}
            className={cn(inputBase, 'resize-y', invalid ? 'border-[#B3261E]/50' : 'border-ink/15')}
          />
        )}
      </Field>

      {/* Honeypot. Hidden from people, catnip for bots. Not display:none, which
          some bots skip — off-screen and removed from the tab order instead. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="field-website">Leave this empty</label>
        <input id="field-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Submit />
    </form>
  );
}

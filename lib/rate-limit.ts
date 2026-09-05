/**
 * In-memory, per-IP fixed window.
 *
 * Deliberately simple: this protects a contact form on a small site, not an
 * API. It resets on deploy and is per-instance, which is fine here — if the
 * site ever needs real limiting, swap this for Upstash without touching the
 * call site.
 */
type Entry = { count: number; resetAt: number };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const buckets = new Map<string, Entry>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterMinutes: 0 };
  }

  if (entry.count >= MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterMinutes: Math.max(1, Math.ceil((entry.resetAt - now) / 60000)),
    };
  }

  entry.count += 1;

  // Keep the map from growing without bound on a long-lived instance.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
  }

  return { allowed: true, retryAfterMinutes: 0 };
}

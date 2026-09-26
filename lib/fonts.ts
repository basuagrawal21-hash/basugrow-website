import { Bricolage_Grotesque, Geist } from 'next/font/google';

/**
 * Display face. Big, tight, sentence case. 800 only: a single weight is served
 * as a static instance, far smaller than the variable file two weights pull
 * in, and nothing on the site set in this face used 700.
 */
export const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
  weight: '800',
});

/** Body and UI. */
export const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

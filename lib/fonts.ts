import { Bricolage_Grotesque, Geist } from 'next/font/google';

/** Display face. Big, tight, sentence case. Weights 700-800 only. */
export const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '800'],
});

/** Body and UI. */
export const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

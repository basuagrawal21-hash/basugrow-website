import type { Metadata, Viewport } from 'next';
import { bricolage, geist } from '@/lib/fonts';
import { site } from '@/content/site';
import { SiteHeader } from '@/components/sections/site-header';
import { SiteFooter } from '@/components/sections/site-footer';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { FloatingActions, ScrollProgress } from '@/components/ui/floating-actions';
import { OrganizationLd, WebSiteLd } from '@/components/seo/json-ld';
import { Analytics } from '@/components/tracking/analytics';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#171613',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${geist.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-full bg-gold px-5 py-3 font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70]"
        >
          Skip to content
        </a>
        <OrganizationLd />
        <WebSiteLd />
        <SmoothScroll />
        <ScrollProgress />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
        <Analytics />
      </body>
    </html>
  );
}

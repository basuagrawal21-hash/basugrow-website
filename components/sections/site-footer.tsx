import Link from 'next/link';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { InstagramGlyph } from '@/components/ui/icons';
import { site, footerNav, whatsappLink } from '@/content/site';
import { services } from '@/content/services';
import { industries } from '@/content/industries';
import { Logo } from '@/components/ui/logo';

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-bone/45 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function Item({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-bone/65 hover:text-bone text-[0.9375rem] transition-colors">
        {children}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-night text-bone">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="prose-body text-bone/65 mt-5 text-[0.9375rem]">
              Meta ads and lead systems for local businesses across India. We build the offer, the
              campaign and the follow-up, then send every enquiry to your phone.
            </p>

            <div className="mt-6 space-y-2.5 text-[0.9375rem]">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/80 hover:text-willow flex items-center gap-2.5 transition-colors"
              >
                <MessageCircle size={16} className="text-willow" aria-hidden />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-bone/80 hover:text-willow flex items-center gap-2.5 transition-colors"
              >
                <Mail size={16} className="text-willow" aria-hidden />
                {site.contact.email}
              </a>
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone/80 hover:text-willow flex items-center gap-2.5 transition-colors"
              >
                <InstagramGlyph size={16} className="text-willow" />@{site.contact.instagram}
              </a>
              <p className="text-bone/60 flex items-center gap-2.5">
                <MapPin size={16} className="text-willow" aria-hidden />
                {site.base.city}, {site.base.state}
              </p>
            </div>
          </div>

          <Column title="Services">
            {services.map((s) => (
              <Item key={s.slug} href={`/services/${s.slug}`}>
                {s.name}
              </Item>
            ))}
          </Column>

          <Column title="Industries">
            {industries.map((i) => (
              <Item key={i.slug} href={`/industries/${i.slug}`}>
                {i.name}
              </Item>
            ))}
          </Column>

          <div className="space-y-10">
            <Column title="Company">
              {footerNav.company.map((l) => (
                <Item key={l.href} href={l.href}>
                  {l.label}
                </Item>
              ))}
            </Column>
            <Column title="Free tools">
              {footerNav.tools.map((l) => (
                <Item key={l.href} href={l.href}>
                  {l.label}
                </Item>
              ))}
            </Column>
          </div>
        </div>

        <div className="border-bone/12 mt-14 border-t pt-8">
          <h3 className="text-bone/45 font-sans text-xs font-semibold tracking-[0.14em] uppercase">
            Running campaigns in
          </h3>
          <p className="text-bone/55 mt-3 text-[0.9375rem]">{site.cities.join(' · ')}</p>
        </div>

        <div className="border-bone/12 text-bone/50 mt-10 flex flex-col gap-4 border-t pt-8 text-[0.875rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-bone transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="text-bone/35 mt-8 max-w-3xl text-[0.8125rem] leading-relaxed">
          BasuGrow is an independent agency. We run advertising on Meta&rsquo;s platforms and are
          not affiliated with, certified by, or endorsed by Meta, Facebook, Instagram or WhatsApp.
          Results from advertising depend on your offer, budget, market and follow-up, and are not
          guaranteed.
        </p>
      </div>
    </footer>
  );
}

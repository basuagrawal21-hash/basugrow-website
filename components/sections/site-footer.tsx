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
      <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-willow uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function Item({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.9375rem] text-paper/65 transition-colors hover:text-paper"
      >
        {children}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-pine text-paper">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="prose-body mt-5 text-[0.9375rem] text-paper/65">
              Meta ads and lead systems for local businesses across India. We build the offer, the
              campaign and the follow-up, then send every enquiry to your phone.
            </p>

            <div className="mt-6 space-y-2.5 text-[0.9375rem]">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-paper/80 transition-colors hover:text-willow"
              >
                <MessageCircle size={16} className="text-willow" aria-hidden />
                {site.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2.5 text-paper/80 transition-colors hover:text-willow"
              >
                <Mail size={16} className="text-willow" aria-hidden />
                {site.contact.email}
              </a>
              <a
                href={site.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-paper/80 transition-colors hover:text-willow"
              >
                <InstagramGlyph size={16} className="text-willow" />@{site.contact.instagram}
              </a>
              <p className="flex items-center gap-2.5 text-paper/60">
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

        <div className="mt-14 border-t border-willow/12 pt-8">
          <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-willow uppercase">
            Running campaigns in
          </h3>
          <p className="mt-3 text-[0.9375rem] text-paper/55">{site.cities.join(' · ')}</p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-willow/12 pt-8 text-[0.875rem] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-paper">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-[0.8125rem] leading-relaxed text-paper/35">
          BasuGrow is an independent agency. We run advertising on Meta&rsquo;s platforms and are not
          affiliated with, certified by, or endorsed by Meta, Facebook, Instagram or WhatsApp.
          Results from advertising depend on your offer, budget, market and follow-up, and are not
          guaranteed.
        </p>
      </div>
    </footer>
  );
}

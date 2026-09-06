import { site } from '@/content/site';
import { services } from '@/content/services';
import { industries } from '@/content/industries';
import { pricingTiers } from '@/content/pricing';
import { homeFaqs } from '@/content/faqs';
import { getAllPosts } from '@/lib/blog';

/**
 * llms.txt (see llmstxt.org) — a plain-text map of the site for AI assistants
 * and answer engines (ChatGPT, Perplexity, Gemini, Claude) that can't render
 * JS or crawl a full sitemap the way a search engine does. Generated from the
 * same content files as the rest of the site, so it can't drift out of date.
 */
export const dynamic = 'force-static';

export async function GET() {
  const url = (path: string) => `${site.url}${path}`;

  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(`> ${site.description}`);
  lines.push('');
  lines.push(
    `Based in ${site.base.city}, ${site.base.state}, India. Runs Meta (Facebook and Instagram) ad campaigns for local businesses nationally and delivers qualified enquiries straight to WhatsApp. Management fees are separate from ad spend, which clients pay Meta directly — BasuGrow never marks up or takes a cut of ad spend. Clients keep ownership of their ad account, pixel and audiences at all times.`,
  );
  lines.push('');

  lines.push('## Services');
  lines.push('');
  for (const s of services) {
    lines.push(`- [${s.name}](${url(`/services/${s.slug}`)}): ${s.summary}`);
  }
  lines.push('');

  lines.push('## Industries served');
  lines.push('');
  for (const i of industries) {
    lines.push(`- [${i.name}](${url(`/industries/${i.slug}`)}): typical cost per enquiry ${i.cplRange}.`);
  }
  lines.push('');

  lines.push('## Pricing');
  lines.push('');
  lines.push(`See ${url('/pricing')} for full plan details. Prices are monthly management fees, exclusive of GST and separate from ad spend:`);
  for (const t of pricingTiers) {
    const price = t.priceMonthly ? `₹${t.priceMonthly.toLocaleString('en-IN')}/month` : 'custom quote';
    lines.push(`- ${t.name} (${price}): ${t.tagline}`);
  }
  lines.push('');

  lines.push('## Frequently asked questions');
  lines.push('');
  for (const f of homeFaqs) {
    lines.push(`Q: ${f.q}`);
    lines.push(`A: ${f.a}`);
    lines.push('');
  }

  lines.push('## Other pages');
  lines.push('');
  lines.push(`- [About](${url('/about')}): who BasuGrow is and how it works.`);
  lines.push(`- [Work](${url('/work')}): campaign case studies with spend, enquiries and cost per enquiry.`);
  lines.push(`- [Contact](${url('/contact')}): free ad audit request form, replies within 2 working hours.`);
  lines.push(`- [Free tools](${url('/tools')}): cost-per-lead and ad-budget calculators, no email required.`);
  lines.push(`- [Blog](${url('/blog')}): writing on Meta ads for Indian local businesses.`);

  const posts = getAllPosts().slice(0, 10);
  if (posts.length) {
    lines.push('');
    lines.push('## Recent blog posts');
    lines.push('');
    for (const p of posts) {
      lines.push(`- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`);
    }
  }

  lines.push('');
  lines.push('## Contact');
  lines.push('');
  lines.push(`- Email: ${site.contact.email}`);
  lines.push(`- WhatsApp: ${site.contact.phoneDisplay}`);
  lines.push(`- Instagram: ${site.contact.instagramUrl}`);

  return new Response(lines.join('\n') + '\n', {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}

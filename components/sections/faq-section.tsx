import { Section, Eyebrow, SectionTitle, Lede } from '@/components/ui/section';
import { FaqList } from '@/components/ui/accordion';
import { homeFaqs } from '@/content/faqs';
import type { Faq } from '@/content/types';

export function FaqSection({
  items = homeFaqs,
  surface = 'bone',
  title = 'The questions everyone asks',
  lede = 'If yours is not here, message us on WhatsApp — you will get a straight answer, not a booking link.',
}: {
  items?: Faq[];
  surface?: 'bone' | 'sand';
  title?: string;
  lede?: string;
}) {
  return (
    <Section surface={surface} id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <SectionTitle>{title}</SectionTitle>
          <Lede>{lede}</Lede>
        </div>
        <FaqList items={items} />
      </div>
    </Section>
  );
}

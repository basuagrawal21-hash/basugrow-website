import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { FinalCta } from '@/components/sections/final-cta';
import { getAllPosts, formatPostDate } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/seo/json-ld';

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Plain writing about Meta ads for Indian local businesses — what leads should cost, why boosting fails, and why follow-up speed decides everything.',
  path: '/blog',
});

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <BreadcrumbLd items={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]} />
      <PageHero
        eyebrow="Blog"
        title="What we have learned running ads for local businesses"
        lede="No listicles and no predictions. Things we have seen go wrong often enough to be worth writing down."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <Section surface="bone">
        <ul className="border-ink/12 border-t">
          {posts.map((post) => (
            <li key={post.slug} className="border-ink/12 border-b">
              <Link href={`/blog/${post.slug}`} className="group/post block py-8">
                <div className="flex flex-wrap items-center gap-3 text-[0.875rem]">
                  <span className="border-ink/15 text-slate rounded-full border px-2.5 py-0.5">
                    {post.tag}
                  </span>
                  <span className="text-slate">{formatPostDate(post.date)}</span>
                  <span className="text-slate/60">{post.readingMinutes} min read</span>
                </div>
                <h2 className="text-ink mt-3 max-w-3xl text-[length:var(--text-md)]">
                  {post.title}
                </h2>
                <p className="text-slate prose-body mt-2.5 text-[1rem]">{post.description}</p>
                <span className="text-ink mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                  Read it
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform duration-300 group-hover/post:translate-x-0.5 group-hover/post:-translate-y-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}

import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { PageHero } from '@/components/sections/page-hero';
import { Section } from '@/components/ui/section';
import { FinalCta } from '@/components/sections/final-cta';
import { mdxComponents } from '@/components/ui/mdx';
import { getPost, getPostSlugs, formatPostDate } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { ArticleLd, BreadcrumbLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, content } = post;

  return (
    <>
      <ArticleLd
        title={meta.title}
        description={meta.description}
        path={`/blog/${slug}`}
        datePublished={meta.date}
        tag={meta.tag}
      />
      <BreadcrumbLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: meta.title, path: `/blog/${slug}` },
        ]}
      />

      <PageHero
        eyebrow={`${meta.tag} · ${meta.readingMinutes} min read`}
        title={meta.title}
        lede={meta.description}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: meta.tag },
        ]}
      >
        <p className="text-bone/45 text-[0.875rem]">
          Published {formatPostDate(meta.date)} by {site.name}
        </p>
      </PageHero>

      <Section surface="bone">
        <article className="mx-auto max-w-[44rem]">
          <MDXRemote source={content} components={mdxComponents} />
        </article>
      </Section>

      <FinalCta />
    </>
  );
}

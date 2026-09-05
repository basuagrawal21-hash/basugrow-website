import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { services } from '@/content/services';
import { industries } from '@/content/industries';
import { caseStudies } from '@/content/case-studies';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const staticPaths: [string, number][] = [
    ['/', 1],
    ['/services', 0.9],
    ['/industries', 0.8],
    ['/work', 0.8],
    ['/pricing', 0.9],
    ['/about', 0.6],
    ['/contact', 0.9],
    ['/tools', 0.7],
    ['/tools/cpl-calculator', 0.7],
    ['/tools/ad-budget-calculator', 0.7],
    ['/blog', 0.7],
    ['/privacy', 0.2],
    ['/terms', 0.2],
  ];

  return [
    ...staticPaths.map(([path, priority]) => ({
      url: url(path),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...services.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...industries.map((i) => ({
      url: url(`/industries/${i.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...caseStudies.map((c) => ({
      url: url(`/work/${c.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...getAllPosts().map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.date || now),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}

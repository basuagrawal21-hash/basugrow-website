import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Posts are MDX files in content/blog. Frontmatter drives metadata and the
 * index, so adding a post means adding one file and nothing else.
 */
export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  tag: string;
};

const DIR = path.join(process.cwd(), 'content/blog');

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function getPostSlugs() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPost(slug: string) {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    tag: String(data.tag ?? 'Meta ads'),
    readingMinutes: readingMinutes(content),
  };
  return { meta, content };
}

/** Newest first. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPost(slug)?.meta)
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatPostDate(iso: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

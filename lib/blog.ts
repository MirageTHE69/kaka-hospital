import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  categorySlug: string;
  tags: string[];
  tagSlugs: string[];
  author: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string; headings: { id: string; text: string; level: number }[] };

/** Page 1 = featured post + 3; matches the old site (4 posts on page 1, rest on /blog/page/2/). */
export const POSTS_PER_PAGE = 3;
const DIR = path.join(process.cwd(), "content", "blog");

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;
  const headings = [...content.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((m) => ({
    level: m[1].length,
    text: m[2].replace(/\*\*/g, "").trim(),
    id: slugify(m[2].replace(/\*\*/g, "")),
  }));
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title,
    date: data.date,
    category: data.category,
    categorySlug: data.categorySlug,
    tags: data.tags ?? [],
    tagSlugs: data.tagSlugs ?? [],
    author: data.author,
    image: data.image,
    imageAlt: data.imageAlt,
    excerpt: data.excerpt,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    body: content,
    headings,
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (!cache) {
    cache = fs
      .readdirSync(DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map(read)
      // newest first (full timestamps keep the WordPress order for same-day posts)
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  }
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export function getCategories() {
  const map = new Map<string, { slug: string; name: string; count: number }>();
  for (const p of getAllPosts()) {
    const c = map.get(p.categorySlug) ?? { slug: p.categorySlug, name: p.category, count: 0 };
    c.count++;
    map.set(p.categorySlug, c);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getTags() {
  const map = new Map<string, { slug: string; name: string; count: number }>();
  for (const p of getAllPosts()) {
    p.tagSlugs.forEach((slug, i) => {
      const t = map.get(slug) ?? { slug, name: p.tags[i], count: 0 };
      t.count++;
      map.set(slug, t);
    });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getRelatedPosts(post: PostMeta, limit = 3) {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (p.categorySlug === post.categorySlug ? 3 : 0) +
        (p.author === post.author ? 2 : 0) +
        p.tagSlugs.filter((t) => post.tagSlugs.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

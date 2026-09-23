import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { departments } from "@/content/departments";
import { doctors } from "@/content/doctors";
import { getAllPosts, getCategories, POSTS_PER_PAGE } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  const now = new Date();
  const posts = getAllPosts();
  const blogPages = Math.max(1, Math.ceil((posts.length - 1) / POSTS_PER_PAGE));

  return [
    { url: u("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...["/about-us/", "/meet-our-doctors/", "/our-history/", "/our-services/", "/contacts-us/", "/blog/"].map((p) => ({
      url: u(p),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...departments
      .filter((d) => !d.noindex)
      .map((d) => ({ url: u(`/services/${d.slug}/`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...doctors.map((d) => ({ url: u(`/doctor/${d.slug}/`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...Array.from({ length: blogPages - 1 }, (_, i) => ({ url: u(`/blog/page/${i + 2}/`), lastModified: now, priority: 0.4 })),
    ...getCategories().map((c) => ({ url: u(`/category/${c.slug}/`), lastModified: now, priority: 0.5 })),
    ...posts.map((p) => ({ url: u(`/${p.slug}/`), lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}

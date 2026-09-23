import { getAllPosts, POSTS_PER_PAGE } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Health articles from the doctors at KK Multispeciality Hospital, Vadodara — back pain, knee and shoulder pain, sports injuries, women's health, menopause and cervical cancer screening.",
  path: "/blog/",
});

export default function BlogPage() {
  const all = getAllPosts();
  const [featured, ...rest] = all;
  // Page 1 = featured post + the next POSTS_PER_PAGE posts; later pages continue from there.
  const totalPages = Math.max(1, Math.ceil((all.length - 1) / POSTS_PER_PAGE));
  return (
    <BlogListing
      heading="Blog"
      crumbs={[{ label: "Blog", href: "/blog/" }]}
      featured={featured}
      posts={rest.slice(0, POSTS_PER_PAGE)}
      totalPages={totalPages}
    />
  );
}

import { notFound } from "next/navigation";
import { getAllPosts, getTags } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";

export const dynamicParams = false;
export const generateStaticParams = () => getTags().map((t) => ({ slug: t.slug }));

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTags().find((x) => x.slug === params.slug);
  if (!t) return {};
  return pageMeta({
    title: `Articles tagged “${t.name}”`,
    description: `Articles tagged ${t.name} from the doctors at KK Multispeciality Hospital, Vadodara.`,
    path: `/tag/${t.slug}/`,
    // thin archive pages: keep crawlable for link equity, but don't index
    noindex: true,
  });
}

export default function TagPage({ params }: { params: { slug: string } }) {
  const t = getTags().find((x) => x.slug === params.slug);
  if (!t) notFound();
  return (
    <BlogListing
      heading={`Tagged: ${t.name}`}
      crumbs={[
        { label: "Blog", href: "/blog/" },
        { label: t.name, href: `/tag/${t.slug}/` },
      ]}
      posts={getAllPosts().filter((p) => p.tagSlugs.includes(t.slug))}
    />
  );
}

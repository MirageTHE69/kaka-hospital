import { notFound } from "next/navigation";
import { getAllPosts, getCategories } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";

export const dynamicParams = false;
export const generateStaticParams = () => getCategories().map((c) => ({ slug: c.slug }));

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getCategories().find((x) => x.slug === params.slug);
  if (!c) return {};
  return pageMeta({
    title: `${c.name} Articles`,
    description: `${c.name} articles and advice from the doctors at KK Multispeciality Hospital, Vadodara.`,
    path: `/category/${c.slug}/`,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const c = getCategories().find((x) => x.slug === params.slug);
  if (!c) notFound();
  return (
    <BlogListing
      heading={c.name}
      crumbs={[
        { label: "Blog", href: "/blog/" },
        { label: c.name, href: `/category/${c.slug}/` },
      ]}
      activeCategory={c.slug}
      posts={getAllPosts().filter((p) => p.categorySlug === c.slug)}
    />
  );
}

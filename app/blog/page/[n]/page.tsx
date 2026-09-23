import { notFound } from "next/navigation";
import { getAllPosts, POSTS_PER_PAGE } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { BlogListing } from "@/components/blog/BlogListing";

const totalPages = () => Math.max(1, Math.ceil((getAllPosts().length - 1) / POSTS_PER_PAGE));

export const dynamicParams = false;
// /blog/page/2/ existed on the old site; always generate it so the URL keeps working.
export const generateStaticParams = () =>
  Array.from({ length: Math.max(totalPages(), 2) - 1 }, (_, i) => ({ n: String(i + 2) }));

export function generateMetadata({ params }: { params: { n: string } }) {
  return pageMeta({
    title: `Blog – Page ${params.n}`,
    description: `Health articles from the doctors at KK Multispeciality Hospital, Vadodara (page ${params.n}).`,
    path: `/blog/page/${params.n}/`,
  });
}

export default function BlogPaged({ params }: { params: { n: string } }) {
  const page = Number(params.n);
  if (!Number.isInteger(page) || page < 2) notFound();
  const rest = getAllPosts().slice(1);
  const posts = rest.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const pages = Math.max(totalPages(), page);
  return (
    <BlogListing
      heading={`Blog – Page ${page}`}
      crumbs={[
        { label: "Blog", href: "/blog/" },
        { label: `Page ${page}`, href: `/blog/page/${page}/` },
      ]}
      posts={posts}
      page={page}
      totalPages={pages}
      intro={posts.length ? undefined : "You've reached the end — see the latest articles on the first page."}
    />
  );
}

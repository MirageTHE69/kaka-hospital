import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Clock, Info } from "lucide-react";
import { formatDate, getAllPosts, getPost, getRelatedPosts, slugify } from "@/lib/blog";
import { getDoctor } from "@/content/doctors";
import { departments } from "@/content/departments";
import { site, telHref } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { blogPostingSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LineArt } from "@/components/LineArt";
import { BookButton } from "@/components/booking/BookButtons";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { PostCard } from "@/components/ui";

/** Blog posts live at root-level slugs (e.g. /back-pain-treatment-in-vadodara/) to keep the old URLs. */
export const dynamicParams = false;
export const generateStaticParams = () => getAllPosts().map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return {};
  return {
    ...pageMeta({ title: p.title, description: p.excerpt, path: `/${p.slug}/`, image: p.image, type: "article" }),
  };
}

const text = (children: React.ReactNode): string =>
  typeof children === "string" ? children : Array.isArray(children) ? children.map(text).join("") : "";

const mdxComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => <h2 id={slugify(text(children))}>{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3 id={slugify(text(children))}>{children}</h3>,
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const author = getDoctor(post.author);
  const dept = author ? departments.find((d) => d.slug === author.department.slug) : undefined;
  const related = getRelatedPosts(post, 3);
  const toc = post.headings.filter((h) => h.level === 2);
  const showToc = toc.length >= 3;

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <article>
        <header className="container-site pt-8 md:pt-10">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog/" },
              { label: post.category, href: `/category/${post.categorySlug}/` },
              { label: post.title, href: `/${post.slug}/` },
            ]}
          />
          <div className="mx-auto mt-8 max-w-read">
            <Link href={`/category/${post.categorySlug}/`} className="text-[15px] font-semibold text-ward hover:underline">
              {post.category}
            </Link>
            <h1 className="heading-1 mt-3">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-slate-600">
              {author && (
                <Link href={`/doctor/${author.slug}/`} className="flex items-center gap-3 font-semibold text-radiograph hover:text-ward">
                  {author.photo ? (
                    <Image src={author.photo.src} alt="" width={40} height={40} sizes="40px" className="h-10 w-10 rounded-full object-cover object-top" />
                  ) : (
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-radiograph text-film">
                      <LineArt name={author.art} className="h-7 w-7" />
                    </span>
                  )}
                  {author.name}
                </Link>
              )}
              <time dateTime={post.date} className="tabular">
                {formatDate(post.date)}
              </time>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden /> {post.readingMinutes} min read
              </span>
            </div>
          </div>
          <div className="relative mx-auto mt-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-lightbox bg-film-50">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
          </div>
        </header>

        <div className="container-site py-12 md:py-16">
          <div className="mx-auto max-w-read">
            {showToc && (
              <nav aria-label="In this article" className="mb-10 rounded-card border border-slate-200 bg-white p-5 md:p-6">
                <p className="font-semibold text-radiograph">In this article</p>
                <ol className="mt-3 grid gap-2 text-[16px]">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-slate hover:text-ward hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="prose-article">
              <MDXRemote source={post.body} components={mdxComponents} />
            </div>

            <p className="mt-12 flex gap-3 rounded-card bg-film-50 p-4 text-[15px] leading-relaxed">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-radiograph" aria-hidden />
              This article is for general information only and is not a substitute for medical advice. Please consult a doctor
              for diagnosis and treatment.
            </p>

            <ShareButtons title={post.title} path={`/${post.slug}/`} />

            {author && (
              <aside aria-label="About the author" className="mt-12 flex flex-col gap-5 rounded-card border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
                {author.photo ? (
                  <Image
                    src={author.photo.src}
                    alt={author.name}
                    width={96}
                    height={120}
                    sizes="96px"
                    className="h-[120px] w-24 shrink-0 rounded-card object-cover object-top"
                  />
                ) : (
                  <span className="grid h-[120px] w-24 shrink-0 place-items-center rounded-card bg-radiograph text-film">
                    <LineArt name={author.art} className="h-16 w-16" />
                  </span>
                )}
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-ward">Written by</p>
                  <p className="heading-3 text-radiograph">
                    <Link href={`/doctor/${author.slug}/`} className="hover:text-ward">
                      {author.name}
                    </Link>
                  </p>
                  <p className="tabular text-[15px] text-slate-600">
                    {author.title} · {author.qualification}
                  </p>
                  <BookButton department={author.bookingDepartment} className="btn-primary btn-sm mt-4">
                    Book with {author.name}
                  </BookButton>
                </div>
              </aside>
            )}

            {dept && (
              <Link
                href={`/services/${dept.slug}/`}
                className="lightbox on-dark group mt-6 flex items-center gap-5 p-6"
              >
                <LineArt name={dept.art} className="glow h-16 w-16 shrink-0 text-film" />
                <span>
                  <span className="block text-[14px] font-semibold text-film/80">Related department</span>
                  <span className="heading-3 block text-white group-hover:underline group-hover:underline-offset-4">
                    {dept.h1}
                  </span>
                </span>
              </Link>
            )}

            <p className="mt-8 text-[15px] text-slate-600">
              Need urgent help? Call{" "}
              <a href={telHref} className="font-semibold text-signal-600 underline underline-offset-2">
                {site.phone.display}
              </a>{" "}
              (24×7 emergency).
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section border-t border-slate-200 bg-white">
          <div className="container-site">
            <h2 className="heading-2">Related articles</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

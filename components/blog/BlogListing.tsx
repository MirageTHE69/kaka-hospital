import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate, getCategories, type PostMeta } from "@/lib/blog";
import { getDoctor } from "@/content/doctors";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { PostCard } from "@/components/ui";

function Featured({ post }: { post: PostMeta }) {
  const author = getDoctor(post.author);
  return (
    <article className="lightbox on-dark group relative mt-8 grid min-h-[420px] overflow-hidden md:min-h-[480px]">
      <Image
        src={post.image}
        alt=""
        fill
        priority
        sizes="(min-width: 1200px) 1152px, 100vw"
        className="-z-10 object-cover opacity-60 mix-blend-luminosity transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-radiograph via-radiograph/70 to-radiograph/10" />
      <div className="relative self-end p-6 md:max-w-3xl md:p-12">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-film">
          <span className="rounded-full border border-film/40 px-3 py-0.5 font-semibold">{post.category}</span>
          <time dateTime={post.date} className="tabular">
            {formatDate(post.date)}
          </time>
          {author && <span>· {author.name}</span>}
        </p>
        <h2 className="heading-1 mt-4 text-white">
          <Link href={`/${post.slug}/`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-2xl text-film/90">{post.excerpt}</p>
      </div>
    </article>
  );
}

export function BlogListing({
  heading,
  intro,
  crumbs,
  posts,
  featured,
  activeCategory,
  page = 1,
  totalPages = 1,
  basePath = "/blog/",
}: {
  heading: string;
  intro?: string;
  crumbs: Crumb[];
  posts: PostMeta[];
  featured?: PostMeta;
  activeCategory?: string;
  page?: number;
  totalPages?: number;
  basePath?: string;
}) {
  const categories = getCategories();
  const pageHref = (n: number) => (n === 1 ? basePath : `${basePath}page/${n}/`);
  return (
    <>
      <section className="container-site pt-8 md:pt-10">
        <Breadcrumbs items={crumbs} />
        <h1 className="heading-1 mt-6">{heading}</h1>
        {intro && <p className="mt-3 max-w-prose text-[19px]">{intro}</p>}
        {featured && <Featured post={featured} />}

        <nav aria-label="Blog categories" className="no-scrollbar -mx-4 mt-8 overflow-x-auto px-4 md:mx-0 md:px-0">
          <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
            <li>
              <Link
                href="/blog/"
                aria-current={!activeCategory ? "page" : undefined}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[15px] font-semibold transition-colors ${
                  !activeCategory ? "border-radiograph bg-radiograph text-white" : "border-slate-300 bg-white text-radiograph hover:border-ward hover:text-ward"
                }`}
              >
                All
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}/`}
                  aria-current={activeCategory === c.slug ? "page" : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-[15px] font-semibold transition-colors ${
                    activeCategory === c.slug
                      ? "border-radiograph bg-radiograph text-white"
                      : "border-slate-300 bg-white text-radiograph hover:border-ward hover:text-ward"
                  }`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section className="section !pt-10">
        <div className="container-site">
          {posts.length ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} headingLevel="h2" />
              ))}
            </div>
          ) : (
            !featured && <p>No articles yet.</p>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link href={pageHref(page - 1)} className="btn-outline btn-sm" rel="prev">
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Newer
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={pageHref(n)}
                  aria-current={n === page ? "page" : undefined}
                  aria-label={`Page ${n}`}
                  className={`tabular grid h-11 w-11 place-items-center rounded-full font-semibold ${
                    n === page ? "bg-radiograph text-white" : "text-radiograph hover:bg-film-50"
                  }`}
                >
                  {n}
                </Link>
              ))}
              {page < totalPages && (
                <Link href={pageHref(page + 1)} className="btn-outline btn-sm" rel="next">
                  Older <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

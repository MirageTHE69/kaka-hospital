import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { home } from "@/content/home";
import { departments } from "@/content/departments";
import { doctors } from "@/content/doctors";
import { getAllPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { LineArt } from "@/components/LineArt";
import { Rich } from "@/components/Rich";
import { Placeholder } from "@/components/Placeholder";
import { ArrowLink, DefaultCtaBand, DoctorCard, LogoMarquee, PostCard, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "KK Hospital Vadodara | Orthopedic & Multispeciality Hospital",
  absoluteTitle: true,
  description:
    "KK Hospital Vadodara is a trusted orthopedic and multispeciality hospital offering joint replacement, fracture care, spine treatment, gynecology, internal medicine, diagnostics and emergency care.",
  path: "/",
});

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4);
  const stats = home.excellence.stats;

  return (
    <>
      <HomeHero />

      {/* Pathway strip — overlaps the bottom of the hero */}
      <section aria-label="How can we help" className="container-site relative z-10 -mt-20 md:-mt-24">
        <ul className="grid gap-4 md:grid-cols-3">
          {home.pathways.map((p) => (
            <li
              key={p.title}
              className={`card group relative flex flex-col p-6 shadow-xl shadow-radiograph/[0.07] md:p-7 ${
                p.emergency ? "border-2 border-signal" : ""
              }`}
            >
              <h2 className="heading-4 md:!text-[20px]">{p.title}</h2>
              <p className="mt-3 flex-1 text-[16px]">{p.text}</p>
              <Link
                href={p.link.href}
                className={`mt-5 inline-flex items-center gap-2 font-semibold after:absolute after:inset-0 after:rounded-card ${
                  p.emergency ? "text-signal-600" : "text-ward"
                }`}
              >
                {p.link.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* About */}
      <section className="section">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Image
              src={home.about.image.src}
              alt={home.about.image.alt}
              width={home.about.image.width}
              height={home.about.image.height}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3] w-full rounded-lightbox object-cover"
            />
            <div className="lightbox absolute -bottom-6 -right-2 hidden h-36 w-36 p-4 sm:grid sm:place-items-center md:-right-6">
              <LineArt name="knee" className="glow h-full w-full text-film" />
            </div>
          </div>
          <div>
            <p className="eyebrow">{home.about.label}</p>
            <h2 className="heading-2 md:!text-[32px]">{home.about.heading}</h2>
            <p className="mt-5 max-w-prose">
              <Rich text={home.about.body} />
            </p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {home.about.points.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 font-semibold text-radiograph">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ward-50 text-ward">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <ArrowLink href="/about-us/" className="mt-8">
              Read more about us
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* Excellence band */}
      <section className="on-dark bg-radiograph text-film">
        <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <h2 className="heading-2 max-w-2xl text-white">{home.excellence.heading}</h2>
            <p className="mt-5 max-w-prose text-film/85">{home.excellence.body}</p>
          </div>
          <dl className="grid gap-6 sm:grid-cols-2">
            {stats.map((s) =>
              s.value ? (
                <div key={s.label} className="flex flex-col border-l border-film/30 pl-5">
                  <dt className="order-2 mt-2 text-[16px] text-film/80">{s.label}</dt>
                  <dd className="tabular -order-1 font-display text-[52px] font-extrabold leading-none tracking-[-0.04em] text-white">{s.value}</dd>
                </div>
              ) : (
                <Placeholder key={s.label}>Number of “{s.label}” (old site counter showed “0+”).</Placeholder>
              ),
            )}
          </dl>
        </div>
      </section>

      {/* Departments preview */}
      <section className="section">
        <div className="container-site flex flex-wrap items-end justify-between gap-4">
          <SectionHeading label="Explore Medical Department" title="Complete Health Solutions – Because You Deserve the Best" />
          <ArrowLink href="/our-services/">View all departments</ArrowLink>
        </div>
        <div className="container-site mt-10">
          <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:-mx-6 md:px-6">
            {departments.map((d) => (
              <li key={d.slug} className="w-[260px] shrink-0 snap-start md:w-[280px]">
                <Link
                  href={`/services/${d.slug}/`}
                  className="group flex h-full flex-col rounded-card border border-slate-200 bg-white p-5 transition-colors hover:border-ward"
                >
                  <span
                    className={`lightbox grid aspect-[4/3] place-items-center p-6 !rounded-[14px] after:!inset-[6px] after:!rounded-[10px] ${
                      d.slug === "emergency-trauma-care" ? "text-signal" : "text-film"
                    }`}
                  >
                    <LineArt name={d.art} className={`h-full w-full ${d.slug === "emergency-trauma-care" ? "glow-signal" : "glow"}`} />
                  </span>
                  <span className="heading-4 mt-4 text-radiograph group-hover:text-ward">
                    {d.name}
                  </span>
                  {d.summary && <span className="mt-1.5 text-[15px] leading-relaxed">{d.summary}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section bg-film-50">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading label={home.why.label} title={home.why.heading} />
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {home.why.items.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-ward shadow-sm">
                  <Icon className="h-6 w-6" aria-hidden strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-sans text-[19px] font-semibold text-radiograph">{title}</h3>
                <p className="mt-1.5">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Doctors */}
      <section className="section">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading label="Meet Our Doctors" title="Leading Medical Professionals at Your Service" />
            <ArrowLink href="/meet-our-doctors/">All doctors</ArrowLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {doctors.map((d) => (
              <DoctorCard key={d.slug} doctor={d} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section border-t border-slate-200">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading label={home.blog.label} title={home.blog.heading} />
            <ArrowLink href="/blog/">All articles</ArrowLink>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <LogoMarquee />
      <DefaultCtaBand question={home.finalCta} />
    </>
  );
}

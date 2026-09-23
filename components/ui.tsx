import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site, telHref, partners } from "@/content/site";
import type { CtaAction } from "@/content/departments";
import type { Doctor } from "@/content/doctors";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";
import { getDoctor } from "@/content/doctors";
import { BookButton, OpenBookingButton } from "@/components/booking/BookButtons";
import { LineArt } from "@/components/LineArt";
import { Placeholder } from "@/components/Placeholder";

export function SectionHeading({
  label,
  title,
  intro,
  tone = "light",
  as: As = "h2",
  className = "",
}: {
  label?: string;
  title: string;
  intro?: string | null;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {label && <p className={tone === "dark" ? "eyebrow-dark" : "eyebrow"}>{label}</p>}
      <As className={`heading-2 ${tone === "dark" ? "text-white" : ""}`}>{title}</As>
      {intro && <p className={`mt-4 max-w-prose ${tone === "dark" ? "text-film/85" : ""}`}>{intro}</p>}
    </div>
  );
}

/** Renders a department/page CTA based on its action kind. */
export function ActionButton({
  action,
  department,
  className,
  emergency,
}: {
  action: CtaAction;
  department?: string;
  className?: string;
  emergency?: boolean;
}) {
  if (action.kind === "book")
    return (
      <BookButton department={department} className={className ?? "btn-primary"}>
        {action.label}
      </BookButton>
    );
  if (action.kind === "call")
    return (
      <a href={telHref} className={className ?? (emergency ? "btn-signal" : "btn-primary")}>
        <Phone className="h-5 w-5" aria-hidden />
        {action.label}
      </a>
    );
  return (
    <Link href={action.href} className={className ?? "btn-primary"}>
      {action.label}
    </Link>
  );
}

/** Clean two-column icon list — used for department services instead of a wall of cards. */
export function IconList({ items, tone = "light" }: { items: { title: string; text: string; icon: LucideIcon }[]; tone?: "light" | "signal" }) {
  return (
    <ul className="grid gap-x-12 gap-y-9 md:grid-cols-2">
      {items.map(({ title, text, icon: Icon }) => (
        <li key={title} className="flex gap-5">
          <span
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
              tone === "signal" ? "bg-signal-50 text-signal-600" : "bg-ward-50 text-ward"
            }`}
          >
            <Icon className="h-6 w-6" aria-hidden strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="font-sans text-[18px] font-semibold leading-snug text-radiograph md:text-[19px]">{title}</h3>
            <p className="mt-1.5 text-slate">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  question,
  children,
  tone = "radiograph",
}: {
  question: string;
  children: React.ReactNode;
  tone?: "radiograph" | "signal" | "film";
}) {
  const bg =
    tone === "signal" ? "bg-signal text-white on-dark" : tone === "film" ? "bg-film-50 text-radiograph" : "lightbox on-dark text-white";
  return (
    <section className="container-site py-10 md:py-14">
      <div className={`${bg} flex flex-col gap-6 rounded-lightbox px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12`}>
        <p className={`heading-2 max-w-2xl ${tone === "film" ? "text-radiograph" : "text-white"}`}>
          {question}
        </p>
        <div className="flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}

/** Default "Need professional medical & health care?" band. */
export function DefaultCtaBand({ question = "Need professional medical & health care?" }: { question?: string }) {
  return (
    <CtaBand question={question}>
      <a href={telHref} className="btn-light">
        <Phone className="h-5 w-5" aria-hidden /> Call {site.phone.display}
      </a>
      <OpenBookingButton className="btn-outline-light" />
    </CtaBand>
  );
}

export function DoctorPortrait({ doctor, className = "", sizes, priority }: { doctor: Doctor; className?: string; sizes: string; priority?: boolean }) {
  return (
    <div className={`lightbox ${className}`}>
      <LineArt name={doctor.art} className="glow absolute inset-0 m-auto h-[88%] w-[88%] text-film/50" />
      {doctor.photo ? (
        <Image
          src={doctor.photo.src}
          alt={`${doctor.name}, ${doctor.title}`}
          width={doctor.photo.width}
          height={doctor.photo.height}
          sizes={sizes}
          priority={priority}
          className="relative h-full w-full object-cover object-top"
        />
      ) : (
        <div className="relative grid h-full w-full place-items-end p-6">
          <span className="sr-only">Photo of {doctor.name} coming soon</span>
        </div>
      )}
    </div>
  );
}

export function DoctorCard({ doctor, bookLabel = "Book", viewLabel = "View Profile" }: { doctor: Doctor; bookLabel?: string; viewLabel?: string }) {
  return (
    <article className="card group flex flex-col overflow-hidden sm:flex-row">
      <DoctorPortrait doctor={doctor} sizes="(min-width: 640px) 240px, 100vw" className="aspect-[4/5] !rounded-none sm:w-[240px] sm:shrink-0 [&::after]:hidden" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[15px] font-semibold text-ward">{doctor.title}</p>
        <h3 className="heading-3 mt-1 md:!text-[25px]">{doctor.name}</h3>
        <p className="tabular mt-1 text-[15px] font-medium text-slate-600">{doctor.qualification}</p>
        <p className="mt-3 text-[16px]">{doctor.shortLine}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Link href={`/doctor/${doctor.slug}/`} className="btn-outline btn-sm">
            {viewLabel}
            <span className="sr-only"> — {doctor.name}</span>
          </Link>
          <BookButton department={doctor.bookingDepartment} className="btn-primary btn-sm">
            {bookLabel}
            <span className="sr-only"> with {doctor.name}</span>
          </BookButton>
        </div>
      </div>
    </article>
  );
}

export function PostCard({ post, headingLevel = "h3" }: { post: PostMeta; headingLevel?: "h2" | "h3" }) {
  const author = getDoctor(post.author);
  const H = headingLevel;
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-film-50">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-x-2 text-[14px] text-slate-600">
        <span className="font-semibold text-ward">{post.category}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.date} className="tabular">
          {formatDate(post.date)}
        </time>
      </p>
      <H className="heading-4 mt-2">
        <Link href={`/${post.slug}/`} className="after:absolute after:inset-0 group-hover:text-ward">
          {post.title}
        </Link>
      </H>
      <p className="mt-2 line-clamp-3 text-[16px]">{post.excerpt}</p>
      {author && <p className="mt-3 text-[14px] font-medium text-slate-600">By {author.name}</p>}
    </article>
  );
}

export function LogoMarquee() {
  const logos = [...partners.logos, ...partners.logos];
  return (
    <section className="border-y border-slate-200 bg-white py-10" aria-label={partners.heading ?? "Partner logos"}>
      <div className="container-site">
        {partners.heading ? (
          <h2 className="mb-6 text-center font-sans text-[16px] font-semibold text-slate-600">{partners.heading}</h2>
        ) : (
          <Placeholder className="mb-6">What are these logos (insurance / TPA / certifications)? Add a heading.</Placeholder>
        )}
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16 hover:[animation-play-state:paused]">
          {logos.map((l, i) => (
            <li key={i} aria-hidden={i >= partners.logos.length ? true : undefined} className="shrink-0">
              <Image src={l.src} alt={i >= partners.logos.length ? "" : l.alt} width={l.width} height={l.height} className="h-14 w-auto object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 font-semibold text-ward hover:text-ward-700 ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}

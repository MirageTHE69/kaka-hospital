import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { about } from "@/content/about";
import { doctors } from "@/content/doctors";
import { telHref } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DefaultCtaBand, DoctorCard, LogoMarquee, SectionHeading } from "@/components/ui";

export const metadata = pageMeta({
  title: "About Us",
  description:
    "KK Multispeciality Hospital (Kaka Hospital) on Waghodia Road, Vadodara combines modern medical technology, experienced doctors and 24×7 emergency care for families since 2000.",
  path: "/about-us/",
});

export default function AboutPage() {
  const img = about.hero.image;
  return (
    <>
      {/* HERO — building + statement */}
      <section className="container-site pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "About Us", href: "/about-us/" }]} />
        <h1 className="heading-1 mt-6">About Us</h1>
        <div className="relative mt-8">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            priority
            sizes="(min-width: 1200px) 1152px, 100vw"
            className="aspect-[4/3] w-full rounded-lightbox object-cover sm:aspect-[16/9] lg:aspect-[21/9]"
          />
          <div className="card relative -mt-16 mx-3 p-6 shadow-2xl shadow-radiograph/15 sm:mx-6 md:absolute md:-bottom-16 md:left-8 md:mx-0 md:mt-0 md:max-w-2xl md:p-10">
            <p className="display-lead text-radiograph">{about.hero.statement}</p>
          </div>
        </div>
      </section>

      {/* Intro + pillars */}
      <section className="section md:pt-36">
        <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <p className="max-w-prose text-[19px] leading-relaxed md:text-[20px]">{about.intro}</p>
          <ul className="grid gap-8">
            {about.pillars.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ward-50 text-ward">
                  <Icon className="h-6 w-6" aria-hidden strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-sans text-[20px] font-semibold text-radiograph">{title}</h2>
                  <p className="mt-1.5">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How can we help */}
      <section className="section bg-film-50">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="heading-2">{about.help.heading}</h2>
              <p className="mt-4">{about.help.text}</p>
            </div>
            <Link href={about.help.link.href} className="btn-primary">
              {about.help.link.label}
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {about.help.routes.map((r) => (
              <li key={r.title} className={`card flex flex-col p-6 md:p-7 ${r.emergency ? "border-2 border-signal" : ""}`}>
                <h3 className="heading-3">{r.title}</h3>
                <p className="mt-3 flex-1 text-[16px]">{r.text}</p>
                {r.link &&
                  (r.link.href === "tel" ? (
                    <a href={telHref} className="btn-signal btn-sm mt-5 w-fit">
                      <Phone className="h-4 w-4" aria-hidden /> {r.link.label}
                    </a>
                  ) : (
                    <Link href={r.link.href} className="mt-5 inline-flex items-center gap-2 font-semibold text-ward">
                      {r.link.label} <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Two feature rows */}
      <section className="section">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Image
            src={about.hero.receptionImage.src}
            alt={about.hero.receptionImage.alt}
            width={about.hero.receptionImage.width}
            height={about.hero.receptionImage.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="aspect-[4/3] w-full rounded-lightbox object-cover"
          />
          <ul className="grid gap-10">
            {about.features.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ward-50 text-ward">
                  <Icon className="h-6 w-6" aria-hidden strokeWidth={1.75} />
                </span>
                <h2 className="heading-3 mt-4">{title}</h2>
                <p className="mt-2 max-w-prose">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Doctors */}
      <section className="section border-t border-slate-200 bg-white">
        <div className="container-site">
          <SectionHeading label={about.doctors.label} title={about.doctors.heading} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {doctors.map((d) => (
              <DoctorCard key={d.slug} doctor={d} viewLabel={about.doctors.button} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="on-dark section bg-radiograph">
        <div className="container-site">
          <SectionHeading tone="dark" label={about.why.label} title={about.why.heading} />
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {about.why.items.map(({ icon: Icon, title, text }) => (
              <li key={title} className="border-t border-film/25 pt-6">
                <Icon className="h-8 w-8 text-film" aria-hidden strokeWidth={1.5} />
                <h3 className="mt-4 font-sans text-[19px] font-semibold text-white">{title}</h3>
                <p className="mt-2 text-film/85">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LogoMarquee />
      <DefaultCtaBand />
    </>
  );
}

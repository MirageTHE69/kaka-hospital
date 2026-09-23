import Image from "next/image";
import { Check } from "lucide-react";
import { history } from "@/content/history";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Placeholder } from "@/components/Placeholder";
import { Timeline } from "@/components/history/Timeline";
import { DefaultCtaBand } from "@/components/ui";

export const metadata = pageMeta({
  title: "Our History",
  description:
    "Since 2000, KK Multispeciality Hospital has grown from a family hospital into a multispeciality centre on Waghodia Road, Vadodara — new departments, modular OTs and 24×7 emergency care.",
  path: "/our-history/",
});

export default function HistoryPage() {
  return (
    <>
      {/* HERO — Since 2000 */}
      <section className="on-dark lightbox !rounded-none after:hidden">
        <div className="container-site relative pb-10 pt-8 md:pt-10">
          <Breadcrumbs tone="dark" items={[{ label: "About Us", href: "/about-us/" }, { label: "Our History", href: "/our-history/" }]} />
          <div className="relative mt-6 grid min-h-[340px] items-center md:min-h-[460px]">
            <p
              aria-hidden
              className="text-outline-film tabular pointer-events-none select-none font-display text-[36vw] font-extrabold leading-none tracking-[-0.04em] md:text-[340px] lg:text-[420px]"
            >
              2000
            </p>
            <figure className="absolute right-0 top-1/2 hidden w-[420px] -translate-y-1/2 rounded-lightbox border border-film/25 bg-radiograph/80 p-3 shadow-2xl backdrop-blur-sm lg:block">
              <Image
                src="/images/hospital-exterior.avif"
                alt="KK Multispeciality Hospital (Kaka Hospital) building on Waghodia Road, Vadodara"
                width={800}
                height={600}
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="aspect-[4/3] w-full rounded-[14px] object-cover"
              />
              <figcaption className="px-2 pb-1 pt-3 text-[14px] text-film/80">Kaka Hospital, Waghodia Road — serving Vadodara since 2000</figcaption>
            </figure>
            <div className="absolute inset-x-0 bottom-6 md:bottom-12 lg:right-[460px]">
              <h1 className="eyebrow-dark !mb-0">Our History</h1>
              <p className="heading-display mt-3 max-w-3xl text-white">
                {history.heroHeading}
              </p>
            </div>
          </div>

          <nav aria-label="Jump to year" className="mt-8 border-t border-film/20 pt-6">
            <ol className="relative flex justify-between">
              <span aria-hidden className="absolute left-2 right-2 top-[9px] h-px bg-film/30" />
              {history.milestones.map((m) => (
                <li key={m.year} className="relative">
                  <a href={`#year-${m.year}`} className="group flex flex-col items-center gap-2 text-film hover:text-white">
                    <span className="h-[18px] w-[18px] rounded-full border-2 border-film bg-radiograph transition-colors group-hover:bg-film" />
                    <span className="tabular text-[16px] font-semibold">{m.year}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <figure className="mt-8 rounded-lightbox border border-film/25 bg-radiograph/80 p-3 lg:hidden">
              <Image
                src="/images/hospital-exterior.avif"
                alt="KK Multispeciality Hospital (Kaka Hospital) building on Waghodia Road, Vadodara"
                width={800}
                height={600}
                priority
                sizes="(min-width: 1024px) 420px, 100vw"
                className="aspect-[4/3] w-full rounded-[14px] object-cover"
              />
              <figcaption className="px-2 pb-1 pt-3 text-[14px] text-film/80">Kaka Hospital, Waghodia Road — serving Vadodara since 2000</figcaption>
            </figure>
        </div>
      </section>

      {/* Intro */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="max-w-prose text-[19px] leading-relaxed md:text-[20px]">{history.intro}</p>
            <ul className="mt-8 grid gap-4">
              {history.introPoints.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ward-50 text-ward">
                    <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <blockquote className="self-center border-l-4 border-ward pl-6 md:pl-8">
            <p className="display-lead text-radiograph">“{history.quote}”</p>
          </blockquote>
        </div>
      </section>

      {/* Timeline */}
      <section className="section border-t border-slate-200 bg-white">
        <div className="container-site">
          <p className="eyebrow">{history.label}</p>
          <h2 className="heading-2">{history.heading}</h2>
          <Placeholder className="mt-6">Real archive photos for each milestone (current images are placeholders from the old site).</Placeholder>
          <Timeline />
        </div>
      </section>

      <DefaultCtaBand />
    </>
  );
}

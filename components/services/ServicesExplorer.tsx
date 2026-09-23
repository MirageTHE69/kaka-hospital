"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Building2, Clock, Phone, Search, Siren, X } from "lucide-react";
import { LineArt, type LineArtName } from "@/components/LineArt";

export type ExplorerItem = {
  slug: string;
  name: string;
  summary: string | null;
  art: LineArtName;
  image: { src: string; width: number; height: number; alt: string };
  serviceCount: number;
  /** Lower-cased searchable text: name, summary, service titles, keywords. */
  haystack: string;
};

type Photo = { src: string; alt: string; position?: string };

const QUICK = [
  { label: "Knee & joint pain", q: "knee" },
  { label: "Pregnancy", q: "pregnancy" },
  { label: "Back pain", q: "back pain" },
  { label: "Diabetes & BP", q: "diabetes" },
  { label: "X-Ray & lab", q: "x-ray" },
];

export function ServicesExplorer({
  items,
  breadcrumbs,
  phone,
  photos,
}: {
  items: ExplorerItem[];
  breadcrumbs: React.ReactNode;
  phone: { display: string; href: string };
  photos: [Photo, Photo, Photo];
}) {
  const [q, setQ] = useState("");
  const gridRef = useRef<HTMLElement>(null);

  const filtered = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return items.filter((i) => terms.every((t) => i.haystack.includes(t)));
  }, [q, items]);

  const goToResults = () => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* HERO */}
      <section className="on-dark lightbox !rounded-none after:hidden">
        <div aria-hidden className="pointer-events-none absolute -right-24 top-10 -z-10 hidden h-[520px] w-[520px] text-film/[0.07] lg:block">
          <LineArt name="knee" className="h-full w-full" />
        </div>

        <div className="container-site pb-16 pt-8 md:pb-20 md:pt-10">
          {breadcrumbs}

          <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h1 className="eyebrow-dark !mb-4">Our Services</h1>
              <p className="font-display text-[15px] font-semibold text-film/80">Explore Medical Department</p>
              <h2 className="heading-display mt-3 text-white">Complete Health Solutions – Because You Deserve the Best</h2>

              {/* Search */}
              <form
                role="search"
                className="mt-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  goToResults();
                }}
              >
                <label htmlFor="dept-search" className="sr-only">
                  Find a department or condition
                </label>
                <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-2xl shadow-black/20">
                  <Search className="hidden h-5 w-5 shrink-0 text-slate-400 sm:block" aria-hidden />
                  <input
                    id="dept-search"
                    type="search"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Find a department or condition"
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent py-2.5 text-[16px] text-radiograph placeholder:text-slate-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                  />
                  {q && (
                    <button
                      type="button"
                      onClick={() => setQ("")}
                      aria-label="Clear search"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>
                  )}
                  <button type="submit" className="btn-primary btn-sm shrink-0 !min-h-[44px] max-sm:!px-3" aria-label="Search">
                    <Search className="h-5 w-5 sm:hidden" aria-hidden />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[14px] text-film/70">Popular:</span>
                {QUICK.map((c) => (
                  <button
                    key={c.q}
                    type="button"
                    onClick={() => {
                      setQ(c.q);
                      goToResults();
                    }}
                    className="rounded-full border border-film/30 px-3.5 py-1.5 text-[14px] font-medium text-film transition-colors hover:border-film hover:bg-film/10 hover:text-white"
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-film/15 pt-6">
                {[
                  { icon: Building2, value: String(items.length), label: "Departments" },
                  { icon: Siren, value: "24×7", label: "Emergency care" },
                  { icon: Clock, value: "25+", label: "Years in Vadodara" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col">
                    <dt className="order-2 mt-1 text-[14px] text-film/75">{label}</dt>
                    <dd className="tabular order-1 flex items-center gap-2 font-display text-[26px] font-extrabold tracking-[-0.03em] text-white md:text-[32px]">
                      <Icon className="h-5 w-5 text-film/70" aria-hidden />
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Photo collage */}
            <div className="relative grid grid-cols-[1.15fr_1fr] gap-3 md:gap-4">
              <div className="relative row-span-2 min-h-[340px] overflow-hidden rounded-lightbox md:min-h-[460px]">
                <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 300px, 55vw"
                  className="object-cover"
                  style={{ objectPosition: photos[0].position ?? "center" }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-radiograph/70 to-transparent" />
              </div>
              {photos.slice(1).map((p) => (
                <div key={p.src} className="relative min-h-[160px] overflow-hidden rounded-lightbox md:min-h-[222px]">
                  <Image src={p.src} alt={p.alt} fill priority sizes="(min-width: 1024px) 260px, 45vw" className="object-cover" />
                </div>
              ))}
              <a
                href={phone.href}
                className="absolute -bottom-6 left-4 right-4 flex items-center gap-3 rounded-card bg-white p-4 text-radiograph shadow-2xl shadow-black/25 sm:left-6 sm:right-auto"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-signal-50 text-signal-600">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] font-semibold text-slate-600">24×7 Emergency & Trauma Care</span>
                  <span className="tabular block font-display text-[19px] font-bold tracking-[-0.02em]">{phone.display}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENT GRID */}
      <section id="departments" ref={gridRef} className="section">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Departments</p>
              <h2 className="heading-2">{q ? `Results for “${q}”` : "All departments"}</h2>
            </div>
            <p className="text-[15px] text-slate-600" role="status" aria-live="polite">
              {filtered.length} of {items.length} departments
              {q && (
                <>
                  {" · "}
                  <button type="button" onClick={() => setQ("")} className="link">
                    Show all
                  </button>
                </>
              )}
            </p>
          </div>

          {filtered.length ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((d) => {
                const emergency = d.slug === "emergency-trauma-care";
                return (
                  <li key={d.slug} className="group relative flex flex-col overflow-hidden rounded-lightbox border border-slate-200 bg-white transition-shadow hover:shadow-xl hover:shadow-radiograph/10">
                    <div className="relative aspect-[4/3] overflow-hidden bg-film-50">
                      <Image
                        src={d.image.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <span
                        className={`absolute bottom-3 left-3 grid h-12 w-12 place-items-center rounded-xl border border-film/25 bg-radiograph/85 p-2 backdrop-blur-sm ${
                          emergency ? "text-signal" : "text-film"
                        }`}
                      >
                        <LineArt name={d.art} className={`h-full w-full ${emergency ? "glow-signal" : "glow"}`} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="heading-4">
                        <Link href={`/services/${d.slug}/`} className="after:absolute after:inset-0 group-hover:text-ward">
                          {d.name}
                        </Link>
                      </h3>
                      {d.summary && <p className="mt-2 flex-1 text-[15px] leading-relaxed">{d.summary}</p>}
                      <span className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-[14px] font-semibold text-ward">
                        {d.serviceCount > 0 ? `${d.serviceCount} services` : "Learn more"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="mt-10 rounded-lightbox border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="heading-4">No matching department</p>
              <p className="mt-2">Please call us and our team will guide you to the right specialist.</p>
              <a href={phone.href} className="btn-primary mt-6">
                <Phone className="h-5 w-5" aria-hidden /> Call {phone.display}
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, ShieldCheck, Siren, MapPin } from "lucide-react";
import { home } from "@/content/home";
import { site, telHref } from "@/content/site";
import { getDoctor } from "@/content/doctors";

import { LineArt } from "@/components/LineArt";
import { OpenBookingButton } from "@/components/booking/BookButtons";

const INTERVAL = 3500; // ms each headline stays on screen
const doctor = getDoctor("dr-alpesh-parekh")!;

export function HomeHero() {
  const slides = home.hero.slides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true); // assume reduced until we know (no autoplay flash)
  const hovering = useRef(false);
  const focused = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, reduced, slides.length]);

  const sync = () => setPaused(hovering.current || focused.current);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Welcome"
      className="relative overflow-hidden"
      onMouseEnter={() => ((hovering.current = true), sync())}
      onMouseLeave={() => ((hovering.current = false), sync())}
      onFocus={() => ((focused.current = true), sync())}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          focused.current = false;
          sync();
        }
      }}
    >
      <div className="container-site grid items-center gap-10 pb-28 pt-10 md:pb-36 md:pt-14 lg:min-h-[min(calc(100vh-112px),820px)] lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-40">
        <div>
          <h1 className="grid">
            {slides.map((s, i) => (
              <span
                key={s.headline}
                aria-hidden={i !== index}
                className={`fade-slot heading-display col-start-1 row-start-1 block text-radiograph ${
                  i === index ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                {s.headline}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-[19px] leading-relaxed md:text-[21px]">{home.hero.sub}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <OpenBookingButton />
            <a href={telHref} className="btn-outline">
              <Phone className="h-5 w-5" aria-hidden />
              Call <span className="tabular">{site.phone.display}</span>
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-slate">
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-ward" aria-hidden />
              {site.iso} certified
            </li>
            <li className="flex items-center gap-2">
              <Siren className="h-4 w-4 text-ward" aria-hidden />
              24×7 Emergency
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ward" aria-hidden />
              Waghodia Road, Vadodara
            </li>
          </ul>

          <div className="mt-10 flex items-center gap-2" role="group" aria-label="Choose headline">
            {slides.map((s, i) => (
              <button
                key={s.headline}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show “${s.headline}”`}
                aria-pressed={i === index}
                className="group grid h-10 w-10 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-ward" : "w-3 bg-slate-300 group-hover:bg-slate-400"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-20 md:mb-24">
          <div className="lightbox aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[640px]">
            {/* One photo per slide, crossfading with the headline */}
            {slides.map((s, i) => (
              <Image
                key={s.image.src}
                src={s.image.src}
                alt={i === index ? s.image.alt : ""}
                aria-hidden={i !== index}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 520px, 100vw"
                className={`fade-slot -z-10 object-cover object-top ${i === index ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/4 bg-gradient-to-t from-radiograph/50 to-transparent" />

            {/* Line-art badge — changes with the headline; the knee draws itself on first load */}
            <div className="absolute left-5 top-5 h-28 w-28 rounded-[16px] border border-film/25 bg-radiograph/85 backdrop-blur-sm md:h-32 md:w-32">
              {slides.map((s, i) => (
                <div
                  key={s.art}
                  aria-hidden={i !== index}
                  className={`fade-slot absolute inset-0 grid place-items-center p-3 ${i === index ? "opacity-100" : "opacity-0"}`}
                >
                  <LineArt name={s.art} draw={i === 0} title={i === index ? true : undefined} className="glow h-full w-full text-film" />
                </div>
              ))}
            </div>
            <p className="absolute right-6 top-6 rounded-full bg-radiograph/80 px-3 py-1 text-[13px] font-medium tabular text-film backdrop-blur-sm" aria-hidden>
              Since {site.since}
            </p>
          </div>
          <Link
            href={`/doctor/${doctor.slug}/`}
            className="group absolute inset-x-4 -bottom-20 z-10 flex items-center justify-between gap-4 rounded-card bg-white p-4 shadow-xl shadow-radiograph/15 md:inset-x-8 md:-bottom-24 md:p-5"
          >
            <span>
              <span className="block text-[14px] font-semibold text-ward">{doctor.title}</span>
              <span className="heading-3 block text-radiograph group-hover:text-ward">
                {doctor.name}
              </span>
              <span className="tabular block text-[14px] text-slate-600">{doctor.qualification} · {site.yearsOfService} years of service</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-ward transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

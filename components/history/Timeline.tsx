"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { history } from "@/content/history";

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative mt-14 grid gap-16 md:gap-24">
      {/* track + fill */}
      <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-0.5 bg-slate-200 md:left-1/2 md:-translate-x-1/2" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduced ? 1 : scaleY }}
        className="absolute bottom-0 left-[19px] top-0 w-0.5 origin-top bg-ward md:left-1/2 md:-translate-x-1/2"
      />

      {history.milestones.map((m, i) => {
        const imageLeft = i % 2 === 1;
        return (
          <li key={m.year} id={`year-${m.year}`} className="relative grid gap-6 pl-14 md:grid-cols-2 md:gap-20 md:pl-0">
            <span
              aria-hidden
              className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border-2 border-ward bg-clinic md:left-1/2 md:-translate-x-1/2"
            >
              <span className="h-3 w-3 rounded-full bg-ward" />
            </span>

            <div className={imageLeft ? "md:order-2" : ""}>
              <p className="tabular font-display text-[40px] font-extrabold leading-none tracking-[-0.04em] text-ward md:text-[52px]">{m.year}</p>
              <h3 className="heading-3 mt-3">{m.title}</h3>
              <p className="mt-4">{m.lead}</p>
              <ul className="mt-4 grid gap-2">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-ward" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-medium text-radiograph">{m.close}</p>
            </div>

            <div className={`${imageLeft ? "md:order-1 md:justify-self-end" : ""}`}>
              <Image
                src={m.image.src}
                alt=""
                width={m.image.width}
                height={m.image.height}
                sizes="(min-width: 768px) 270px, 60vw"
                className="aspect-[27/35] w-full max-w-[270px] rounded-lightbox object-cover"
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

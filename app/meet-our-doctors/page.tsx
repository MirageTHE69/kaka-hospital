import Link from "next/link";
import { doctors } from "@/content/doctors";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DefaultCtaBand, DoctorCard, DoctorPortrait } from "@/components/ui";

export const metadata = pageMeta({
  title: "Meet Our Doctors",
  description:
    "Meet the senior consultants at KK Multispeciality Hospital, Vadodara: Dr. Alpesh Parekh, Orthopaedic Surgeon (M.S. Ortho), and Dr. Ranjana Parekh, Obstetrician & Gynaecologist (M.B.B.S., DGO).",
  path: "/meet-our-doctors/",
});

export default function DoctorsPage() {
  return (
    <>
      <section className="container-site pb-16 pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Our Doctors", href: "/meet-our-doctors/" }]} />
        <div className="mt-8 max-w-2xl">
          <h1 className="heading-1">Meet Our Doctors</h1>
          <p className="mt-4 text-[20px] leading-relaxed">Leading Medical Professionals at Your Service</p>
        </div>

        {/* Two lightboxes */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-6">
          {doctors.map((d, i) => (
            <Link key={d.slug} href={`/doctor/${d.slug}/`} className="group relative block">
              <DoctorPortrait
                doctor={d}
                priority={i === 0}
                sizes="(min-width: 1200px) 580px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/5] md:aspect-[3/4]"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-card bg-radiograph/85 p-5 text-white backdrop-blur-sm md:inset-x-5 md:bottom-5">
                <p className="text-[15px] font-semibold text-film">{d.title}</p>
                <p className="heading-3 text-white group-hover:underline group-hover:underline-offset-4 md:!text-[26px]">
                  {d.name}
                </p>
                <p className="tabular text-[15px] text-film/80">{d.qualification}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section border-t border-slate-200 bg-white">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          {doctors.map((d) => (
            <DoctorCard key={d.slug} doctor={d} />
          ))}
        </div>
      </section>

      <DefaultCtaBand />
    </>
  );
}

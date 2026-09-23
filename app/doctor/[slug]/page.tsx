import { notFound } from "next/navigation";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Target } from "lucide-react";
import { doctors, getDoctor } from "@/content/doctors";
import { getDepartment } from "@/content/departments";
import { site, telHref } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { physicianSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Rich } from "@/components/Rich";
import { Placeholder } from "@/components/Placeholder";
import { LineArt } from "@/components/LineArt";
import { BookButton } from "@/components/booking/BookButtons";
import { BookingForm } from "@/components/booking/BookingForm";
import { ArrowLink, DoctorPortrait, IconList, PostCard, SectionHeading } from "@/components/ui";

export const dynamicParams = false;
export const generateStaticParams = () => doctors.map((d) => ({ slug: d.slug }));

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = getDoctor(params.slug);
  if (!d) return {};
  return pageMeta({
    title: `${d.name} – ${d.title}`,
    description: `${d.name}, ${d.qualification}, ${d.title} at KK Multispeciality Hospital, Vadodara. ${d.shortLine}`,
    path: `/doctor/${d.slug}/`,
    image: d.photo?.src,
  });
}

export default function DoctorPage({ params }: { params: { slug: string } }) {
  const d = getDoctor(params.slug);
  if (!d) notFound();
  const dept = getDepartment(d.department.slug);
  const posts = getAllPosts()
    .filter((p) => p.author === d.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={physicianSchema(d)} />

      <section className="container-site pb-14 pt-8 md:pt-10">
        <Breadcrumbs
          items={[
            { label: "Our Doctors", href: "/meet-our-doctors/" },
            { label: d.name, href: `/doctor/${d.slug}/` },
          ]}
        />
        <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_1.1fr] md:items-center lg:gap-16">
          <DoctorPortrait doctor={d} priority sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[4/5]" />
          <div>
            <p className="text-[16px] font-semibold text-ward">{d.title}</p>
            <h1 className="heading-1 mt-1">{d.name}</h1>
            <p className="mt-5 max-w-xl text-[19px] leading-relaxed">{d.shortLine}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-[15px] font-semibold text-radiograph">
              <GraduationCap className="h-5 w-5 text-ward" aria-hidden />
              <span className="tabular">{d.qualification}</span>
            </p>
            <dl className="mt-6 grid gap-3 text-[16px]">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-ward" aria-hidden />
                <div>
                  <dt className="inline font-semibold text-radiograph">Location: </dt>
                  <dd className="inline">{d.location}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Target className="mt-1 h-5 w-5 shrink-0 text-ward" aria-hidden />
                <div>
                  <dt className="inline font-semibold text-radiograph">Key Focus: </dt>
                  <dd className="inline">{d.keyFocus}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton department={d.bookingDepartment}>Book Appointment</BookButton>
              <a href={telHref} className="btn-outline">
                <Phone className="h-5 w-5" aria-hidden /> Call <span className="tabular">{site.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-slate-200 bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h2 className="heading-2">About me</h2>
            <div className="mt-6 max-w-prose space-y-5">
              {d.about.map((p) => (
                <p key={p.slice(0, 32)}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
            {d.pendingNote && <Placeholder className="mt-6">{d.pendingNote}</Placeholder>}
          </div>
          <aside className="lightbox self-start p-8">
            <LineArt name={dept?.art ?? d.art} className="glow mx-auto h-40 w-40 text-film" />
            <p className="mt-6 text-[15px] font-semibold text-film/80">Department</p>
            <p className="heading-3 text-white">{d.department.name}</p>
            <Link href={`/services/${d.department.slug}/`} className="btn-outline-light btn-sm mt-5">
              Visit department
            </Link>
          </aside>
        </div>
      </section>

      {dept && dept.services.length > 0 && (
        <section className="section">
          <div className="container-site">
            <SectionHeading label="Areas of expertise" title={dept.servicesHeading} intro={dept.servicesIntro} />
            <div className="mt-12">
              <IconList items={dept.services} />
            </div>
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section className="section border-t border-slate-200">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading label="Articles" title={`Health advice from ${d.name}`} />
              <ArrowLink href="/blog/">All articles</ArrowLink>
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="book" className="section border-t border-slate-200 bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow">Book an Appointment</p>
            <h2 className="heading-2">Consult {d.name}</h2>
            <p className="mt-4 max-w-md">Our team will call you to confirm your appointment.</p>
          </div>
          <BookingForm defaultDepartment={d.bookingDepartment} idPrefix={`doc-${d.slug}`} />
        </div>
      </section>
    </>
  );
}

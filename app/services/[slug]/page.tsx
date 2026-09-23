import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check, MapPin, Phone } from "lucide-react";
import { departments, getDepartment, type Department } from "@/content/departments";
import { getDoctor } from "@/content/doctors";
import { site, telHref } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";
import { servicePageSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LineArt } from "@/components/LineArt";
import { Rich } from "@/components/Rich";
import { Placeholder } from "@/components/Placeholder";
import { BookingForm } from "@/components/booking/BookingForm";
import { ActionButton, CtaBand, IconList, PostCard, SectionHeading } from "@/components/ui";

export const dynamicParams = false;
export const generateStaticParams = () => departments.map((d) => ({ slug: d.slug }));

const descriptions: Record<string, string> = {
  orthopedics:
    "Orthopedic & joint care in Vadodara with Dr. Alpesh Parekh, M.S. (Ortho): joint replacement, spine surgery, fracture & trauma care, sports injuries and arthritis at KK Hospital.",
  pharmacy:
    "In-house pharmacy at KK Multispeciality Hospital, Vadodara: prescription dispensing, emergency and post-surgery medicines, dosage guidance and quality-checked drugs.",
  "diagnostics-lab-services":
    "On-site diagnostics at KK Multispeciality Hospital, Vadodara: X-Ray, ECG, sonography, 2D Echo and pathology blood collection for quick, accurate treatment decisions.",
  "emergency-trauma-care":
    "24×7 emergency and trauma care on Waghodia Road, Vadodara. Accidents, fractures, chest pain, stroke symptoms and breathing difficulty. Call +91 92271 00517.",
  "gynecology-obstetrics":
    "Gynecology & obstetrics in Vadodara with Dr. Ranjana Parekh, M.B.B.S., DGO: pregnancy care, delivery planning, menopause, Pap smear screening and laparoscopic surgery.",
  "internal-medicine":
    "Internal medicine at KK Hospital, Vadodara: diabetes, blood pressure, infections, thyroid and lifestyle diseases, with preventive check-ups and chronic disease follow-up.",
  physiotherapy:
    "Physiotherapy & rehabilitation in Vadodara: post-surgery and fracture rehab, neck, back and joint pain programs, sports injury recovery and pre & postnatal physiotherapy.",
  "dermatology-cosmetology": "Dermatology & cosmetology at KK Multispeciality Hospital, Vadodara.",
};

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = getDepartment(params.slug);
  if (!d) return {};
  return pageMeta({
    title: d.h1,
    description: descriptions[d.slug] ?? d.intro ?? d.name,
    path: `/services/${d.slug}/`,
    image: d.image?.src.endsWith(".jpg") ? d.image.src : undefined,
    noindex: d.noindex,
  });
}

function Hero({ d }: { d: Department }) {
  const emergency = d.slug === "emergency-trauma-care";
  const doctor = d.card?.doctor ? getDoctor(d.card.doctor) : undefined;
  return (
    <section className="relative">
      <div className="container-site grid gap-10 pb-12 pt-8 md:pt-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:pb-16">
        <div>
          <Breadcrumbs items={[{ label: "Our Services", href: "/our-services/" }, { label: d.name, href: `/services/${d.slug}/` }]} />
          <p className={`mt-8 text-[15px] font-semibold ${emergency ? "text-signal-600" : "text-ward"}`}>
            {emergency ? "24×7 Emergency" : "Department"}
          </p>
          <h1 className="heading-1 mt-2">{d.h1}</h1>
          {d.intro ? (
            <p className="mt-5 max-w-xl text-[19px] leading-relaxed">{d.intro}</p>
          ) : (
            <Placeholder className="mt-5">Intro line for {d.name}.</Placeholder>
          )}

          {emergency && (
            <a
              href={telHref}
              className="mt-7 flex w-fit items-center gap-4 rounded-card border-2 border-signal bg-signal-50 px-5 py-4 text-signal-600 hover:bg-signal hover:text-white"
            >
              <Phone className="h-9 w-9 shrink-0" aria-hidden />
              <span>
                <span className="block text-[14px] font-semibold">Tap to call emergency</span>
                <span className="tabular block whitespace-nowrap font-display text-[24px] font-extrabold leading-none tracking-[-0.03em] sm:text-[32px] md:text-[40px]">{site.phone.display}</span>
              </span>
            </a>
          )}

          {d.bullets.length > 0 && (
            <ul className="mt-7 grid gap-3">
              {d.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full ${emergency ? "bg-signal-50 text-signal-600" : "bg-ward-50 text-ward"}`}>
                    <Check className="h-4 w-4" aria-hidden strokeWidth={2.5} />
                  </span>
                  <span>
                    <Rich text={b} />
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {emergency ? (
              <>
                <ActionButton action={d.cta} emergency className="btn-signal hidden md:inline-flex" />
                <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <MapPin className="h-5 w-5" aria-hidden /> Get Directions
                </a>
              </>
            ) : (
              <>
                <ActionButton action={d.cta} department={d.bookingValue} />
                {d.cta.kind !== "call" && (
                  <a href={telHref} className="btn-outline">
                    <Phone className="h-5 w-5" aria-hidden /> Call <span className="tabular">{site.phone.display}</span>
                  </a>
                )}
              </>
            )}
          </div>
        </div>

        {/* Lightbox with department line-art + consultant / info card */}
        <div className="relative">
          <div className="lightbox aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={d.heroImage.src}
              alt={d.heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
              className="-z-10 object-cover"
              style={{ objectPosition: d.heroImage.position ?? "center" }}
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-radiograph/70 via-radiograph/10 to-transparent" />
            {emergency ? (
              <div className="absolute inset-x-0 top-0 bg-radiograph/85 px-6 pb-3 pt-5 backdrop-blur-sm">
                <LineArt name="ecg" title={true} className="ecg-sweep glow-signal h-20 w-full text-signal" strokeWidth={2} />
              </div>
            ) : (
              <div className="absolute left-5 top-5 grid h-24 w-24 place-items-center rounded-[14px] border border-film/25 bg-radiograph/85 p-3 backdrop-blur-sm md:h-28 md:w-28">
                <LineArt name={d.art} title={true} className="glow h-full w-full text-film" />
              </div>
            )}
          </div>
          {d.card && (
            <div className="card relative -mt-24 ml-4 mr-4 p-5 shadow-2xl shadow-radiograph/15 sm:ml-auto sm:mr-6 sm:max-w-md md:p-6 lg:-mt-40">
              <div className="flex items-start gap-4">
                {doctor?.photo && (
                  <Image
                    src={doctor.photo.src}
                    alt=""
                    width={72}
                    height={90}
                    sizes="72px"
                    className="h-[72px] w-[60px] shrink-0 rounded-lg object-cover object-top"
                  />
                )}
                <div>
                  <p className="heading-4 text-radiograph md:!text-[21px]">
                    {doctor ? <Link href={`/doctor/${doctor.slug}/`} className="hover:text-ward">{d.card.title}</Link> : d.card.title}
                  </p>
                  {doctor && <p className="tabular text-[14px] font-medium text-slate-600">{doctor.qualification}</p>}
                </div>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed">{d.card.text}</p>
              <dl className="mt-4 grid gap-2 border-t border-slate-200 pt-4 text-[15px]">
                {d.card.meta.map((m) => (
                  <div key={m.label}>
                    <dt className="inline font-semibold text-radiograph">{m.label}: </dt>
                    <dd className="inline">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* Highlight chips */}
      <div className="container-site pb-4">
        {d.chips.length > 0 ? (
          <ul className="grid gap-3 md:grid-cols-3">
            {d.chips.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-4 rounded-card bg-film-50 px-5 py-4">
                <Icon className={`h-7 w-7 shrink-0 ${emergency ? "text-signal-600" : "text-ward"}`} aria-hidden strokeWidth={1.75} />
                <p className="text-[15px] leading-snug">
                  <span className="block text-[17px] font-semibold text-radiograph">{title}</span>
                  {text}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <Placeholder>3 highlight chips for {d.name}.</Placeholder>
        )}
      </div>
    </section>
  );
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const d = getDepartment(params.slug);
  if (!d) notFound();
  const emergency = d.slug === "emergency-trauma-care";
  const posts = getAllPosts().filter((p) => d.blogCategories.includes(p.categorySlug)).slice(0, 3);

  return (
    <>
      <JsonLd data={servicePageSchema(d)} />
      <Hero d={d} />

      {d.pending?.map((note) => (
        <div key={note} className="container-site mt-4">
          <Placeholder>{note}</Placeholder>
        </div>
      ))}

      {/* Services */}
      <section className="section">
        <div className="container-site">
          <SectionHeading title={d.servicesHeading} intro={d.servicesIntro} />
          {d.supportingLine && <p className="mt-4 max-w-prose">{d.supportingLine}</p>}
          <div className="mt-12">
            {d.services.length ? (
              <IconList items={d.services} tone={emergency ? "signal" : "light"} />
            ) : (
              <Placeholder>List of services for {d.name}.</Placeholder>
            )}
          </div>
        </div>
      </section>

      {/* Why choose */}
      {d.why ? (
        <section className={emergency ? "section bg-signal-50" : "section bg-film-50"}>
          <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="heading-2">{d.why.heading}</h2>
              <p className="mt-5 max-w-prose">{d.why.text}</p>
            </div>
            {d.image ? (
              <Image
                src={d.image.src}
                alt={d.image.alt}
                width={d.image.width}
                height={d.image.height}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/3] w-full rounded-lightbox object-cover"
              />
            ) : (
              <div className={`lightbox grid aspect-[4/3] place-items-center p-10 ${emergency ? "text-signal" : "text-film"}`}>
                <LineArt name={d.art} className={emergency ? "glow-signal h-full w-full" : "glow h-full w-full"} />
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="container-site">
          <Placeholder>“Why choose KK Hospital” text for {d.name}.</Placeholder>
        </div>
      )}

      {/* CTA band */}
      {d.ctaBand && (
        <CtaBand question={d.ctaBand.question} tone={emergency ? "signal" : "radiograph"}>
          {emergency ? (
            <>
              <a href={telHref} className="btn-light !text-signal-600">
                <Phone className="h-5 w-5" aria-hidden /> {d.ctaBand.action.label}
              </a>
              <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                <MapPin className="h-5 w-5" aria-hidden /> Get Directions
              </a>
            </>
          ) : (
            <ActionButton action={d.ctaBand.action} department={d.bookingValue} className="btn-light" />
          )}
        </CtaBand>
      )}

      {/* Related posts */}
      {posts.length > 0 && (
        <section className="section">
          <div className="container-site">
            <SectionHeading label="From our doctors" title="Related articles" />
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking form (not on the emergency page) */}
      {!emergency && (
        <section id="book" className="section border-t border-slate-200 bg-white">
          <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <p className="eyebrow">Book an Appointment</p>
              <h2 className="heading-2">{d.cta.label}</h2>
              <p className="mt-4 max-w-md">
                Share your details and preferred time. Our team will call you to confirm your appointment.
              </p>
              <p className="mt-6 text-[16px]">
                Prefer to talk?{" "}
                <a href={telHref} className="link tabular">
                  {site.phone.display}
                </a>
              </p>
            </div>
            <BookingForm defaultDepartment={d.bookingValue} idPrefix={`dept-${d.slug}`} />
          </div>
        </section>
      )}
    </>
  );
}

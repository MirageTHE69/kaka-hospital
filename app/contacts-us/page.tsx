import Image from "next/image";
import { Clock, Mail, MapPin, Navigation, Phone, Siren } from "lucide-react";
import { landlineHref, site, telHref } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Placeholder } from "@/components/Placeholder";
import { BookingForm } from "@/components/booking/BookingForm";

export const metadata = pageMeta({
  title: "Contact Us",
  description:
    "Contact KK Multispeciality Hospital, Zaver Nagar, Waghodia Road, Vadodara – 390025. Call +91 92271 00517 or 0265-2515658, get directions, or request an appointment online.",
  path: "/contacts-us/",
});

export default function ContactPage() {
  return (
    <>
      <section className="container-site pb-16 pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Contact Us", href: "/contacts-us/" }]} />
        <div className="mt-6 max-w-3xl">
          <h1 className="eyebrow !mb-0">Contact Us</h1>
          <h2 className="heading-1 mt-2">Connect With Our Care Team in Vadodara</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* Map in a lightbox frame */}
          <div className="lightbox flex flex-col p-3">
            <iframe
              src={site.maps.embed}
              title="Google Map: KK Multispeciality Hospital, Waghodia Road, Vadodara"
              className="min-h-[320px] w-full flex-1 rounded-[12px] border-0 md:min-h-[440px]"
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-4">
              <p className="text-[15px] text-film/85">Zaver Nagar, Waghodia Road</p>
              <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="btn-light btn-sm">
                <Navigation className="h-4 w-4" aria-hidden /> Get Directions
              </a>
            </div>
          </div>

          {/* Contact card */}
          <div className="card overflow-hidden">
            <Image
              src="/images/hospital-exterior.avif"
              alt="KK Multispeciality Hospital building, Zaver Nagar, Waghodia Road"
              width={800}
              height={600}
              priority
              sizes="(min-width: 1024px) 500px, 100vw"
              className="aspect-[16/7] w-full object-cover"
            />
            <div className="p-6 md:p-8">
            <dl className="grid gap-6">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-ward" aria-hidden />
                <div>
                  <dt className="font-semibold text-radiograph">Address</dt>
                  <dd className="mt-1">
                    <address className="not-italic">{site.addressLine}</address>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 h-6 w-6 shrink-0 text-ward" aria-hidden />
                <div>
                  <dt className="font-semibold text-radiograph">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="link break-all">
                      {site.email}
                    </a>
                    {site.secondaryEmail ? (
                      <>
                        <br />
                        <a href={`mailto:${site.secondaryEmail}`} className="link break-all">
                          {site.secondaryEmail}
                        </a>
                      </>
                    ) : (
                      <Placeholder className="mt-2">Second email address shown in the old footer.</Placeholder>
                    )}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-ward" aria-hidden />
                <div>
                  <dt className="font-semibold text-radiograph">Phone</dt>
                  <dd className="tabular mt-1 text-[19px]">
                    <a href={telHref} className="font-semibold text-radiograph hover:text-ward">
                      {site.phone.display}
                    </a>{" "}
                    /{" "}
                    <a href={landlineHref} className="hover:text-ward">
                      {site.landline.display}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 h-6 w-6 shrink-0 text-ward" aria-hidden />
                <div>
                  <dt className="font-semibold text-radiograph">Working hours (OPD)</dt>
                  <dd className="tabular mt-1 grid gap-0.5">
                    <span>Morning {site.hours.morning}</span>
                    <span>Evening {site.hours.evening}</span>
                  </dd>
                </div>
              </div>
            </dl>
            <Placeholder className="mt-6">Confirm OPD hours and Sunday timings (old header said “Mon–Friday, 08am – 09pm”).</Placeholder>
            <a href={telHref} className="mt-6 flex items-center gap-3 rounded-card bg-signal-50 px-4 py-3 font-semibold text-signal-600">
              <Siren className="h-5 w-5 shrink-0" aria-hidden />
              Emergency: {site.hours.emergency} · <span className="tabular">{site.phone.display}</span>
            </a>
            </div>
          </div>
        </div>
      </section>

      <section id="appointment" className="section border-t border-slate-200 bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <p className="eyebrow">Book an Appointment / Ask a Question</p>
            <h2 className="heading-2">Send Us Message</h2>
          </div>
          <BookingForm idPrefix="contact" />
        </div>
      </section>
    </>
  );
}

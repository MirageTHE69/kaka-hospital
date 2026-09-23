import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Clock } from "lucide-react";
import { footer, landlineHref, site, telHref } from "@/content/site";
import { OpenBookingButton } from "@/components/booking/BookButtons";
import { LineArt } from "@/components/LineArt";

const socials = [
  { label: "Facebook", href: site.social.facebook, Icon: Facebook },
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "YouTube", href: site.social.youtube, Icon: Youtube },
];

export function Footer() {
  const [lead, ...rest] = footer.about.split(/(?<=since 2000),/);
  return (
    <footer className="on-dark bg-radiograph pb-24 text-film md:pb-0">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex rounded-card bg-white px-4 py-2.5" aria-label={`${site.name} — home`}>
            <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-11 w-auto" />
          </Link>
          <p className="mt-6 text-[16px] leading-relaxed text-film/85">
            <strong className="font-semibold text-white">{lead}</strong>
            {rest.length ? "," + rest.join(",") : ""}
          </p>
          <p className="mt-6 text-[15px] font-semibold text-white">Social Media</p>
          <ul className="mt-3 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-film/30 text-film transition-colors hover:border-film hover:bg-film hover:text-radiograph"
                  aria-label={`${site.shortName} on ${label}`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-display text-[16px] font-bold tracking-[-0.01em] text-white">Services</h2>
          <ul className="mt-4 space-y-2.5 text-[16px]">
            {footer.services.map((s) => (
              <li key={s.label}>
                <Link href={s.href} className="text-film/85 transition-colors hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-display text-[16px] font-bold tracking-[-0.01em] text-white">Quick Link</h2>
          <ul className="mt-4 space-y-2.5 text-[16px]">
            {footer.quickLinks.map((s) => (
              <li key={s.label}>
                <Link href={s.href} className="text-film/85 transition-colors hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <h2 className="font-display text-[16px] font-bold tracking-[-0.01em] text-white">Contact Us</h2>
          <address className="mt-4 space-y-3 text-[16px] not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-film/70" aria-hidden />
              <span className="text-film/85">
                KK Multispeciality Hospital
                <br />
                Zaver Nagar, Waghodia Road, Vadodara – 390025
              </span>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-film/70" aria-hidden />
              <a href={`mailto:${site.email}`} className="break-all text-film/85 hover:text-white">
                {site.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-film/70" aria-hidden />
              <span className="tabular">
                <a href={telHref} className="font-semibold text-white hover:underline">
                  {site.phone.display}
                </a>{" "}
                /{" "}
                <a href={landlineHref} className="text-film/85 hover:text-white">
                  {site.landline.display}
                </a>
              </span>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-film/70" aria-hidden />
              <span className="tabular text-film/85">
                OPD {site.hours.morning} · {site.hours.evening}
                <br />
                Emergency {site.hours.emergency}
              </span>
            </p>
          </address>
          <OpenBookingButton className="btn-light mt-6">Book Appointment</OpenBookingButton>
          <a
            href={site.maps.directions}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex items-center gap-4 rounded-card border border-film/25 p-3 transition-colors hover:border-film/60 hover:bg-film/5"
          >
            {/* Lightweight map card — the live Google Map lives on the Contact page only (keeps every page fast). */}
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-radiograph-800 text-film">
              <LineArt name="hospital" className="glow h-12 w-12" />
            </span>
            <span className="leading-snug">
              <span className="block text-[15px] font-semibold text-white group-hover:underline group-hover:underline-offset-4">
                Get directions
              </span>
              <span className="block text-[14px] text-film/75">Open in Google Maps</span>
            </span>
          </a>
        </div>
      </div>
      <div className="border-t border-film/15">
        <div className="container-site flex flex-col gap-2 py-6 text-[14px] text-film/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} KK Multispeciality Hospital Vadodara. All Rights Reserved.
          </p>
          <p>
            Designed &amp; developed by{" "}
            <a
              href={site.designer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-film underline decoration-film/40 underline-offset-4 hover:text-white hover:decoration-white"
            >
              {site.designer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

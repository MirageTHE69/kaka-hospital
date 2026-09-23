import Link from "next/link";
import { Phone } from "lucide-react";
import { site, telHref } from "@/content/site";
import { LineArt } from "@/components/LineArt";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="eyebrow tabular !mb-0">404</p>
        <h1 className="heading-1 mt-2">This page seems to have a fracture.</h1>
        <p className="mt-5 max-w-prose text-[19px]">
          The page you are looking for may have moved. Search our site, or use one of the links below.
        </p>
        <form action="https://www.google.com/search" method="get" target="_blank" className="mt-8 flex max-w-lg gap-2" role="search">
          <input type="hidden" name="as_sitesearch" value={new URL(site.url).hostname} />
          <label htmlFor="nf-q" className="sr-only">
            Search the site
          </label>
          <input id="nf-q" name="q" type="search" placeholder="Search KK Hospital" className="input" />
          <button type="submit" className="btn-primary shrink-0">
            Search
          </button>
        </form>
        <ul className="mt-8 flex flex-wrap gap-3">
          <li>
            <Link href="/our-services/" className="btn-outline btn-sm">
              Our Services
            </Link>
          </li>
          <li>
            <Link href="/meet-our-doctors/" className="btn-outline btn-sm">
              Meet Our Doctors
            </Link>
          </li>
          <li>
            <a href={telHref} className="btn-signal btn-sm">
              <Phone className="h-4 w-4" aria-hidden /> Emergency {site.phone.display}
            </a>
          </li>
        </ul>
      </div>
      <div className="lightbox grid aspect-square place-items-center p-12">
        <LineArt name="brokenBone" draw title={true} className="glow h-full w-full text-film" />
      </div>
    </section>
  );
}

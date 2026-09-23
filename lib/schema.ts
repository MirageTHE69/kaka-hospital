import { site } from "@/content/site";
import { departments, type Department } from "@/content/departments";
import type { Doctor } from "@/content/doctors";
import type { PostMeta } from "@/lib/blog";
import { getDoctor } from "@/content/doctors";

const abs = (p: string) => new URL(p, site.url).toString();
export const HOSPITAL_ID = abs("/#hospital");

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  postalCode: site.address.postalCode,
  addressRegion: site.address.region,
  addressCountry: site.address.country,
};

/** Maps our departments to schema.org MedicalSpecialty enumeration values. */
const specialtyMap: Record<string, string> = {
  orthopedics: "Orthopedic",
  "gynecology-obstetrics": "Obstetric",
  "internal-medicine": "PrimaryCare",
  "emergency-trauma-care": "Emergency",
  "diagnostics-lab-services": "Radiography",
  pharmacy: "PharmacySpecialty",
  physiotherapy: "Physiotherapy",
  "dermatology-cosmetology": "Dermatology",
};

export function hospitalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": HOSPITAL_ID,
    name: site.name,
    alternateName: [site.alternateName, site.shortName],
    url: site.url,
    logo: abs(site.logo.src),
    image: abs("/images/og-default.jpg"),
    telephone: site.phone.tel,
    email: site.email,
    address,
    ...(site.geo ? { geo: { "@type": "GeoCoordinates", ...site.geo } } : {}),
    hasMap: site.maps.directions,
    foundingDate: String(site.since),
    openingHoursSpecification: site.openingHoursSpec.map((o) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: o.days,
      opens: o.opens,
      closes: o.closes,
    })),
    availableService: { "@type": "MedicalProcedure", name: "24×7 Emergency & Trauma Care" },
    isAcceptingNewPatients: true,
    medicalSpecialty: [...new Set(departments.map((d) => specialtyMap[d.slug]).filter(Boolean))],
    sameAs: Object.values(site.social),
  };
}

export function physicianSchema(d: Doctor) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": abs(`/doctor/${d.slug}/#physician`),
    name: d.name,
    url: abs(`/doctor/${d.slug}/`),
    ...(d.photo ? { image: abs(d.photo.src) } : {}),
    description: d.shortLine,
    medicalSpecialty: specialtyMap[d.department.slug],
    hasCredential: d.qualification,
    telephone: site.phone.tel,
    address,
    hospitalAffiliation: { "@id": HOSPITAL_ID },
    worksFor: { "@id": HOSPITAL_ID },
  };
}

export function servicePageSchema(dep: Department) {
  const doctor = dep.card?.doctor ? getDoctor(dep.card.doctor) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    url: abs(`/services/${dep.slug}/`),
    name: `${dep.h1} | ${site.name}`,
    ...(dep.intro ? { description: dep.intro } : {}),
    about: {
      "@type": "MedicalSpecialty",
      name: dep.name,
    },
    specialty: specialtyMap[dep.slug],
    ...(doctor ? { reviewedBy: { "@id": abs(`/doctor/${doctor.slug}/#physician`), "@type": "Physician", name: doctor.name } } : {}),
    isPartOf: { "@id": HOSPITAL_ID },
    mainEntity: {
      "@type": "MedicalClinic",
      name: `${dep.name} — ${site.name}`,
      parentOrganization: { "@id": HOSPITAL_ID },
      medicalSpecialty: specialtyMap[dep.slug],
      ...(dep.services.length
        ? { availableService: dep.services.map((s) => ({ "@type": "MedicalProcedure", name: s.title, description: s.text })) }
        : {}),
    },
  };
}

export function blogPostingSchema(p: PostMeta) {
  const author = getDoctor(p.author);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    image: abs(p.image),
    datePublished: p.date,
    dateModified: p.date,
    mainEntityOfPage: abs(`/${p.slug}/`),
    articleSection: p.category,
    keywords: p.tags.join(", "),
    author: author
      ? { "@type": "Physician", name: author.name, url: abs(`/doctor/${author.slug}/`) }
      : { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: abs(site.logo.src) } },
  };
}

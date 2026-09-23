/**
 * Site-wide facts (NAP, hours, links). Every page reads from here so the
 * Name / Address / Phone stay identical everywhere.
 *
 * Values set to `null` are unconfirmed by the client: they are omitted in
 * production and shown as a dashed "client to confirm" note in development.
 */

const DEFAULT_URL = "https://kakahospital.com";

/**
 * Canonical site origin. Tolerates an empty or scheme-less NEXT_PUBLIC_SITE_URL
 * (e.g. set blank in the Vercel dashboard), which would otherwise break every
 * `new URL(path, site.url)` call at build time.
 */
function resolveSiteUrl(raw: string | undefined) {
  const v = raw?.trim();
  if (!v) return DEFAULT_URL;
  try {
    return new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`).origin;
  } catch {
    return DEFAULT_URL;
  }
}

export const site = {
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  name: "KK Multispeciality Hospital",
  shortName: "KK Hospital",
  alternateName: "Kaka Hospital",
  tagline: "Strong Bones. Strong Life.",
  since: 2000,
  yearsOfService: "25+",

  address: {
    street: "Zaver Nagar, Waghodia Road",
    locality: "Vadodara",
    postalCode: "390025",
    region: "Gujarat",
    country: "IN",
  },
  addressLine: "KK Multispeciality Hospital, Zaver Nagar, Waghodia Road, Vadodara – 390025, Gujarat",
  /** CLIENT TO CONFIRM: exact coordinates from the Google Business Profile. Omitted from schema while null. */
  geo: null as null | { latitude: number; longitude: number },

  phone: { display: "+91 92271 00517", tel: "+919227100517" },
  landline: { display: "0265-2515658", tel: "+912652515658" },
  email: "kkhospital18@gmail.com",
  /** CLIENT TO CONFIRM: second email address shown in the old footer. */
  secondaryEmail: null as string | null,

  /** CLIENT TO CONFIRM: WhatsApp number (assumed to be the main mobile). */
  whatsapp: "https://wa.me/919227100517",

  /**
   * OPD hours as published on the current Contact page.
   * FIX: the old header said "Mon–Friday, 08am – 09pm". Confirm the correct
   * hours and Sunday timings with the client, then update only this object.
   */
  hours: {
    morning: "10:00 AM – 1:00 PM",
    evening: "5:00 PM – 8:00 PM",
    emergency: "24×7",
  },
  /** schema.org openingHours strings, derived from `hours` above (Mon–Sat assumed until confirmed). */
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "13:00" },
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "17:00", closes: "20:00" },
  ],

  /** FIX: ISO 9001:2008 is a withdrawn standard version — confirm the current certificate (likely 9001:2015). */
  iso: "ISO 9001:2008",

  logo: { src: "/images/logo.png", width: 135, height: 59 },

  social: {
    facebook: "https://www.facebook.com/kakahospital10",
    /** CONFIRM: doctor pages on the old site linked to https://www.instagram.com/kk_hospitalwaghodia/ */
    instagram: "https://www.instagram.com/kakahospital/",
    youtube: "https://www.youtube.com/@kkhospital2018",
  },

  maps: {
    query: "KK Multispeciality Hospital Waghodia Road Vadodara",
    embed: "https://www.google.com/maps?q=KK+Multispeciality+Hospital+Waghodia+Road+Vadodara&output=embed",
    directions: "https://www.google.com/maps/dir/?api=1&destination=KK+Multispeciality+Hospital+Waghodia+Road+Vadodara",
  },

  designer: { name: "SNAD MEDIA", url: "https://snadmedia.com/" },
};

export const telHref = `tel:${site.phone.tel}`;
export const landlineHref = `tel:${site.landline.tel}`;

export const nav = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Our History", href: "/our-history/" },
    ],
  },
  { label: "Our Doctors", href: "/meet-our-doctors/" },
  { label: "Our Services", href: "/our-services/", mega: true },
  { label: "Blogs", href: "/blog/" },
  { label: "Contacts", href: "/contacts-us/" },
] as const;

/**
 * Logos from the old home-page carousel.
 * CLIENT TO CONFIRM what these are (insurance / TPA / empanelment / certifications).
 * `heading` stays null until confirmed, so no heading is rendered in production.
 */
export const partners = {
  heading: null as string | null,
  logos: [
    { src: "/images/partners/partner-1.png", width: 225, height: 225, alt: "Partner logo" },
    { src: "/images/partners/partner-2.png", width: 225, height: 225, alt: "Partner logo" },
    { src: "/images/partners/partner-3.jpg", width: 410, height: 123, alt: "Sterling Hospitals" },
    { src: "/images/partners/partner-4.png", width: 206, height: 245, alt: "Partner logo" },
    { src: "/images/partners/partner-5.jpg", width: 327, height: 154, alt: "Partner logo" },
  ],
};

export const footer = {
  about:
    "KK Multispeciality Hospital is Vadodara's trusted family hospital since 2000, offering Orthopedics, Gynecology, Internal Medicine, Dermatology, Physiotherapy, and 24×7 Emergency Services. With ISO 9001:2008 certification, modern diagnostics, and experienced consultants, we provide ethical, personalised, and advanced medical care for every patient.",
  services: [
    { label: "Orthopedic Care", href: "/services/orthopedics/" },
    { label: "Gynecology & Obstetrics", href: "/services/gynecology-obstetrics/" },
    { label: "Internal Medicine", href: "/services/internal-medicine/" },
    { label: "Dermatology & Cosmetology", href: "/services/dermatology-cosmetology/" },
    { label: "Physiotherapy", href: "/services/physiotherapy/" },
    { label: "24×7 Emergency & Trauma Care", href: "/services/emergency-trauma-care/" },
    { label: "X-Ray", href: "/services/diagnostics-lab-services/" },
    { label: "In-house Pharmacy", href: "/services/pharmacy/" },
  ],
  quickLinks: [
    { label: "About Us", href: "/about-us/" },
    { label: "Our Doctors", href: "/meet-our-doctors/" },
    { label: "Departments", href: "/our-services/" },
    { label: "Services", href: "/our-services/#departments" },
    // "Patient Guide" link removed until the client provides content (see brief §5.7).
    { label: "Contact Us", href: "/contacts-us/" },
  ],
};

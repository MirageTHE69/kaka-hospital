import type { Department } from "./types";

/**
 * FIX: the live page contained "Mental Health & Wellness" template text that
 * does not belong to KK Hospital. Nothing was migrated. The page renders the
 * template structure only and stays `noindex` until real content is approved.
 */
export const dermatology: Department = {
  slug: "dermatology-cosmetology",
  name: "Dermatology & Cosmetology",
  h1: "Dermatology & Cosmetology",
  summary: null,
  image: { src: "/images/stock/dermatology-tools.jpg", width: 1600, height: 2400, alt: "Dermatology and skin care treatment" },
  heroImage: { src: "/images/stock/dermatology-exam.jpg", width: 1600, height: 2400, alt: "Dermatologist examining skin with a magnifying glass" },
  art: "skin",
  intro: null,
  bullets: [],
  cta: { kind: "book", label: "Book Dermatology Appointment" },
  card: null,
  chips: [],
  servicesHeading: "Dermatology & Cosmetology Services",
  servicesIntro: null,
  services: [],
  why: null,
  ctaBand: null,
  bookingValue: "Dermatology & Cosmetology",
  keywords: ["skin", "hair", "acne", "cosmetic", "allergy", "rash", "pigmentation"],
  blogCategories: [],
  noindex: true,
  pending: [
    "Dermatology & Cosmetology: intro, consultant name & qualification, 3 highlight chips, 6 services and 'why choose us' text.",
    "One-line summary for the department card.",
  ],
};

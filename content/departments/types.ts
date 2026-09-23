import type { LucideIcon } from "lucide-react";
import type { LineArtName } from "@/components/LineArt";

export type IconItem = { title: string; text: string; icon: LucideIcon };

export type CtaAction =
  | { kind: "book"; label: string } // tel: on mobile, booking modal on desktop
  | { kind: "call"; label: string } // always tel:
  | { kind: "link"; label: string; href: string };

export type Department = {
  slug: string;
  /** Name used in cards, menus and breadcrumbs. */
  name: string;
  h1: string;
  /** One-line summary for cards / directory. null = CLIENT TO CONFIRM. */
  summary: string | null;
  /** Secondary photo: department cards and the "why choose us" section. */
  image: { src: string; width: number; height: number; alt: string } | null;
  /** Main hero photo shown inside the lightbox panel. */
  heroImage: { src: string; width: number; height: number; alt: string; position?: string };
  art: LineArtName;
  intro: string | null;
  /** Hero check bullets. `**bold**` supported. */
  bullets: string[];
  cta: CtaAction;
  /** Card overlaid on the hero lightbox. */
  card: {
    title: string;
    text: string;
    meta: { label: string; value: string }[];
    doctor?: string;
  } | null;
  chips: IconItem[];
  servicesHeading: string;
  servicesIntro: string | null;
  services: IconItem[];
  why: { heading: string; text: string } | null;
  ctaBand: { question: string; action: CtaAction } | null;
  /** Value pre-selected in the booking form's department select. */
  bookingValue: string;
  /** Extra search terms for the services directory filter. */
  keywords: string[];
  /** Blog category slugs for "related posts". */
  blogCategories: string[];
  /** Extra paragraph under the services heading (used on Diagnostics). */
  supportingLine?: string;
  noindex?: boolean;
  /** Notes for the client; shown only in development. */
  pending?: string[];
};

import { ScanLine, HeartPulse, TestTube } from "lucide-react";
import type { Department } from "./types";

/**
 * FIX: the live page was a copy of Orthopedics. This version uses only facts
 * stated elsewhere on the current site and needs client approval.
 */
export const diagnostics: Department = {
  slug: "diagnostics-lab-services",
  name: "Diagnostics & Lab Services",
  h1: "Diagnostics & Lab Services",
  summary: "On-site X-Ray, ECG and pathology blood collection for quick diagnosis.",
  image: { src: "/images/diagnostics-lab.jpg", width: 600, height: 525, alt: "Diagnostics and lab services at KK Multispeciality Hospital" },
  heroImage: { src: "/images/diagnostics-lab.jpg", width: 600, height: 525, alt: "Lab technicians running diagnostic tests" },
  art: "xray",
  intro: "On-site diagnostics at KK Multispeciality Hospital, Vadodara for quick, accurate treatment decisions.",
  bullets: ["X-Ray", "ECG", "Sonography", "2D Echo", "Pathology blood collection centre"],
  cta: { kind: "call", label: "Call Diagnostics Desk" },
  card: null,
  chips: [
    { icon: ScanLine, title: "X-Ray", text: "On-site imaging for bones, joints and chest" },
    { icon: HeartPulse, title: "ECG & 2D Echo", text: "Heart checks for quick decisions" },
    { icon: TestTube, title: "Pathology", text: "Blood collection centre on site" },
  ],
  servicesHeading: "Diagnostics & Lab Services",
  servicesIntro: null,
  supportingLine:
    "KK Hospital integrates modern medical equipment and digital diagnostic systems to ensure faster and more precise treatment decisions — improving outcomes and saving valuable time in critical situations.",
  services: [],
  why: null,
  ctaBand: null,
  bookingValue: "Diagnostics & Lab",
  keywords: ["x-ray", "xray", "ecg", "sonography", "ultrasound", "2d echo", "blood test", "lab", "pathology", "report", "scan"],
  blogCategories: [],
  pending: [
    "Full test list, timings and report turnaround for Diagnostics & Lab.",
    "Chip lines on this page are new wording built from existing facts — approve or replace.",
  ],
};

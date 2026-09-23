import { ClipboardList, Clock, ShieldCheck, FileCheck2, Layers, Siren, MessageCircleQuestion, Thermometer, Bandage } from "lucide-react";
import type { Department } from "./types";

export const pharmacy: Department = {
  slug: "pharmacy",
  name: "Pharmacy",
  h1: "Pharmacy",
  summary: "In-house pharmacy providing safe, accurate and timely medicines.",
  image: { src: "/images/stock/pharmacy-shelves.jpg", width: 1600, height: 1067, alt: "Pharmacist arranging medicines on pharmacy shelves" },
  heroImage: { src: "/images/stock/pharmacist.jpg", width: 1600, height: 1067, alt: "Pharmacist checking medicines at the hospital pharmacy counter" },
  art: "capsule",
  intro:
    "In-house pharmacy providing safe, accurate and timely medicines for patients and families at KK Multispeciality Hospital, Vadodara.",
  bullets: [
    "Hospital–integrated, trusted pharmacy",
    "Quick access to emergency and post-surgery medicines",
    "Guidance on dosage, timing and precautions",
  ],
  cta: { kind: "call", label: "Call Pharmacy Desk" },
  card: {
    title: "Need Medicines After Your Visit?",
    text: "Share your prescription at the pharmacy counter and our team will help you with correct brands, strength and dosage instructions.",
    meta: [
      { label: "Location", value: "Ground Floor, KK Hospital" },
      { label: "Timings", value: "OPD Hours & Emergency Support" },
    ],
  },
  chips: [
    { icon: ClipboardList, title: "1000+", text: "Prescriptions Filled Monthly" },
    { icon: Clock, title: "24×7", text: "Support for Emergency Cases" },
    { icon: ShieldCheck, title: "Quality", text: "Branded & Checked Medicines" },
  ],
  servicesHeading: "Pharmacy Services",
  servicesIntro: "Everything you need to continue treatment smoothly once your doctor has advised medicines.",
  services: [
    { icon: FileCheck2, title: "Prescription Dispensing", text: "Medicines dispensed exactly as prescribed by KK Hospital consultants and authorised doctors." },
    // CONFIRM: "paediatrics" is listed here but the hospital has no paediatrics department.
    { icon: Layers, title: "Multi-Speciality Support", text: "Essential drugs for orthopaedics, gynaecology, internal medicine, paediatrics and more." },
    { icon: Siren, title: "Emergency Medicines", text: "Rapid access to life-saving medicines for accident, trauma and critical care patients." },
    { icon: MessageCircleQuestion, title: "Dosage Guidance", text: "Basic counselling on how and when to take medicines, food interactions and precautions." },
    { icon: Thermometer, title: "Safe Storage", text: "Medicines stored as per recommended temperature and safety protocols with expiry checks." },
    { icon: Bandage, title: "Post-Surgery Support", text: "Availability of antibiotics, pain relief and recovery medicines as advised by your surgeon." },
  ],
  why: {
    heading: "Why Choose KK Hospital Pharmacy?",
    text: "Our in-house pharmacy ensures that you receive the right medicine, in the right dose, at the right time. With transparent billing, quality-checked drugs and close coordination with your treating doctor, we make your treatment journey safer and more convenient.",
  },
  ctaBand: {
    question: "Have a query about your prescription or availability of a specific medicine?",
    action: { kind: "call", label: "Talk to Pharmacy Team" },
  },
  bookingValue: "Pharmacy",
  keywords: ["medicine", "medicines", "prescription", "drugs", "chemist", "medical store"],
  blogCategories: [],
  pending: ["Pharmacy page mentions paediatrics, but there is no paediatrics department — confirm."],
};

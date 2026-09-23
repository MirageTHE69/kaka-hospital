import { HeartPulse, Droplet, ShieldPlus, ClipboardCheck, Gauge, Thermometer, FlaskConical, Salad, RefreshCw } from "lucide-react";
import type { Department } from "./types";

export const internalMedicine: Department = {
  slug: "internal-medicine",
  name: "Internal Medicine",
  h1: "Internal Medicine",
  summary:
    "Comprehensive medical care for adults – from diabetes and hypertension to infections and lifestyle-related conditions.",
  image: { src: "/images/stock/physician-ward.jpg", width: 1600, height: 1067, alt: "Nurse monitoring a patient’s blood pressure in the ward" },
  heroImage: { src: "/images/stock/physician-bp.jpg", width: 1600, height: 1067, alt: "Physician checking a patient’s blood pressure" },
  art: "heart",
  intro:
    "Comprehensive medical care for adults – from diabetes and hypertension to infections and lifestyle-related conditions – at KK Multispeciality Hospital, Vadodara.",
  bullets: [
    "Diagnosis and management of acute and chronic medical conditions.",
    "Focus on diabetes, blood pressure, infections and hormonal imbalances.",
    "Preventive and lifestyle medicine to reduce long-term health risks.",
  ],
  cta: { kind: "book", label: "Book Physician Consultation" },
  card: {
    title: "Your First Point of Contact",
    text: "Our internal medicine team evaluates your symptoms, plans investigations, starts treatment and coordinates with specialists whenever needed – so your care stays organised and clear.",
    meta: [
      { label: "Key Focus", value: "Diabetes, Hypertension, Infections & Lifestyle Diseases" },
      { label: "Approach", value: "Evidence-based, personalised medical care" },
    ],
  },
  chips: [
    { icon: HeartPulse, title: "Heart Risk", text: "Monitoring for BP, cholesterol & cardiac risk factors" },
    { icon: Droplet, title: "Diabetes Control", text: "Structured follow-up for sugar, kidneys & overall health" },
    { icon: ShieldPlus, title: "Prevention", text: "Lifestyle counselling & regular health checkups" },
  ],
  servicesHeading: "Internal Medicine Services",
  servicesIntro: "Holistic care for adults with multiple health concerns, under one roof.",
  services: [
    { icon: ClipboardCheck, title: "Comprehensive Medical Check-ups", text: "Detailed history, physical examination and investigations to understand your overall health status and identify early warning signs." },
    { icon: Gauge, title: "Diabetes & Hypertension Care", text: "Individualised treatment and monitoring plans to keep blood sugar and blood pressure within safe ranges and protect heart, kidney and eye health." },
    { icon: Thermometer, title: "Infections & Fever Management", text: "Evaluation and treatment for viral and bacterial infections, seasonal fevers and post-infection weakness, with appropriate tests when required." },
    { icon: FlaskConical, title: "Hormonal & Metabolic Imbalances", text: "Support for thyroid issues, metabolic syndrome, cholesterol problems and weight-related concerns with a medical + lifestyle approach." },
    { icon: Salad, title: "Lifestyle & Preventive Medicine", text: "Guidance on diet, exercise, sleep, stress and habits to reduce future risk of diabetes, heart disease, stroke and other chronic illnesses." },
    { icon: RefreshCw, title: "Chronic Disease Follow-up & Coordination", text: "Regular reviews, medication adjustments and coordination with cardiology, nephrology, orthopedics and other specialties whenever needed." },
  ],
  why: {
    heading: "Why Choose KK Hospital for Medical Care?",
    text: "Rather than treating only one symptom at a time, our internal medicine team looks at your complete health picture – lab reports, lifestyle, family history and existing conditions – to create a safe, practical plan you can actually follow.",
  },
  ctaBand: { question: "Worried about diabetes, BP or recurring health issues?", action: { kind: "book", label: "Talk to Our Physician Team" } },
  bookingValue: "Internal Medicine",
  keywords: ["physician", "diabetes", "sugar", "blood pressure", "bp", "hypertension", "fever", "infection", "thyroid", "cholesterol", "check-up", "general medicine"],
  blogCategories: [],
  pending: ["Name and qualification of the consultant physician for Internal Medicine."],
};

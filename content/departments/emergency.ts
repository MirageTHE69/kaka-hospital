import { Siren, Timer, ScanLine, Stethoscope, Ambulance, Bone, HeartPulse, Bandage, Pill } from "lucide-react";
import type { Department } from "./types";
import { site } from "../site";

export const emergency: Department = {
  slug: "emergency-trauma-care",
  name: "Emergency & Trauma Care",
  h1: "Emergency & Trauma Care",
  summary: "24×7 emergency services and trauma care.",
  image: { src: "/images/stock/emergency-room.jpg", width: 1600, height: 1064, alt: "Emergency room with trauma beds and monitoring equipment" },
  heroImage: { src: "/images/stock/emergency-stretcher.jpg", width: 1600, height: 1068, alt: "Emergency team moving a patient on a stretcher" },
  art: "ecg",
  intro:
    "24×7 emergency services and trauma care at KK Multispeciality Hospital, Vadodara – for accidents, sudden illnesses, and life-threatening conditions.",
  bullets: [
    "Round-the-clock emergency team, doctors and nursing staff.",
    "Accident, fracture and trauma care with orthopedic and surgical support.",
    "Immediate attention for chest pain, stroke, breathing difficulty and severe pain.",
    "On-site X-Ray, ECG and pathology blood collection centre for quick diagnosis.",
  ],
  cta: { kind: "call", label: `Call Emergency: ${site.phone.display}` },
  card: {
    title: "24×7 Emergency Response",
    text: "In an emergency, every minute matters. Our team focuses on rapid assessment, stabilisation and clear communication with family members – day and night.",
    meta: [
      { label: "When to Come", value: "Road accidents, falls, severe pain, high fever, chest pain, stroke symptoms, breathing difficulty, unconsciousness." },
      { label: "Support Services", value: "Emergency Room, Orthopedic Modular OT, ICU support, Diagnostics & Pharmacy." },
    ],
  },
  chips: [
    { icon: Siren, title: "24×7 Emergency", text: "Immediate triage & stabilisation for critical cases" },
    { icon: Timer, title: "Time-Sensitive Care", text: "Focused on saving life and preventing complications" },
    { icon: ScanLine, title: "On-site Diagnostics", text: "X-Ray, ECG & blood collection for quick decisions" },
  ],
  servicesHeading: "Emergency & Trauma Services",
  servicesIntro: "From minor injuries to major trauma and medical emergencies, our team is trained to act fast and safely.",
  services: [
    { icon: Stethoscope, title: "24×7 Emergency Assessment", text: "Initial evaluation, vital checks and triage to understand the severity of the emergency and start treatment without delay." },
    { icon: Ambulance, title: "Accident & Trauma Stabilisation", text: "Immediate care for road traffic accidents, falls and injuries – including wound care, splinting and pain control." },
    { icon: Bone, title: "Fracture & Orthopedic Emergencies", text: "On-the-spot fracture assessment and coordination with the orthopedics team for further management and surgery if needed." },
    { icon: HeartPulse, title: "Chest Pain & Stroke Pathway", text: "Rapid evaluation of chest pain, suspected heart attack, stroke-like symptoms and breathlessness to reduce long-term damage." },
    { icon: Bandage, title: "Minor Procedures & Wound Care", text: "Suturing, dressings, removal of foreign bodies and care for cuts, lacerations and minor burns under sterile conditions." },
    { icon: Pill, title: "Diagnostics & Pharmacy Support", text: "Emergency X-Ray, ECG and pathology blood collection, along with in-house pharmacy for quick access to prescribed medicines." },
  ],
  why: {
    heading: "In an Emergency, Don't Wait.",
    text: "If you or a loved one has had an accident, sudden severe pain, chest discomfort, breathing difficulty or is not responding normally – seek help immediately. Reaching the hospital on time can save life, brain and heart function.",
  },
  ctaBand: { question: "Call now for emergency support or directions:", action: { kind: "call", label: "Call KK Hospital Emergency" } },
  bookingValue: "Emergency & Trauma Care",
  keywords: ["accident", "trauma", "casualty", "ambulance", "chest pain", "stroke", "burn", "injury", "wound", "urgent", "fall"],
  blogCategories: [],
  pending: ["Real photos of the emergency department (stock photos used for now)."],
};

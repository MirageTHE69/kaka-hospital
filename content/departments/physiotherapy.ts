import { Footprints, PersonStanding, Baby, Bone, Activity, Trophy, HeartHandshake, Scale, Home } from "lucide-react";
import type { Department } from "./types";

export const physiotherapy: Department = {
  slug: "physiotherapy",
  name: "Physiotherapy",
  h1: "Physiotherapy & Rehabilitation",
  summary:
    "Movement-focused care to reduce pain, restore strength and help you return to daily activities safely.",
  image: { src: "/images/stock/physiotherapy-knee.jpg", width: 1200, height: 1800, alt: "Physiotherapy and rehabilitation at KK Multispeciality Hospital" },
  heroImage: { src: "/images/stock/physiotherapy-knee.jpg", width: 1200, height: 1800, alt: "Physiotherapist treating a patient’s knee" },
  art: "walking",
  intro:
    "Movement-focused care to reduce pain, restore strength and help you return to daily activities safely – at KK Multispeciality Hospital, Vadodara.",
  bullets: [
    "Rehabilitation after fractures, joint replacement and orthopedic surgeries.",
    "Neck, back and joint pain management with posture and ergonomic advice.",
    "Sports injury rehab and before–after pregnancy physiotherapy for women.",
  ],
  cta: { kind: "book", label: "Book Physiotherapy Session" },
  card: {
    title: "Move Better, Live Better",
    text: "Our physiotherapy team works closely with your doctors to design safe, customised exercise plans, manual therapy and home programs that match your age, pain level and goals.",
    meta: [
      { label: "Key Focus", value: "Pain relief, mobility, strength & posture" },
      { label: "Ideal For", value: "Post-surgery, chronic pain & sports injuries" },
    ],
  },
  chips: [
    { icon: Footprints, title: "Mobility", text: "Helping you walk, climb and move confidently again" },
    { icon: PersonStanding, title: "Posture Care", text: "Neck & back pain relief with ergonomic guidance" },
    { icon: Baby, title: "Mother Support", text: "Pre & postnatal physiotherapy for safe recovery" },
  ],
  servicesHeading: "Physiotherapy Services",
  servicesIntro: "Sessions planned to match your medical condition, pain level and day-to-day routine.",
  services: [
    { icon: Bone, title: "Post-Fracture & Post-Surgery Rehab", text: "Gradual strengthening and range-of-motion exercises after casts, fractures, ligament repairs and joint replacement surgeries." },
    { icon: Activity, title: "Neck, Back & Joint Pain Programs", text: "Targeted exercises, stretching, manual therapy and posture correction to manage long-standing neck, back, knee and shoulder pain." },
    { icon: Trophy, title: "Sports Injury Rehabilitation", text: "Recovery plans for sprains, ligament injuries, overuse problems and muscle strains to help you return to sport safely and confidently." },
    { icon: HeartHandshake, title: "Pre & Postnatal Physiotherapy", text: "Exercises to support a healthy pregnancy, reduce back pain and aid post-delivery recovery and core strengthening for mothers." },
    { icon: Scale, title: "Balance & Flexibility Training", text: "Programs to improve flexibility, coordination and balance, especially useful for seniors to reduce the risk of falls and stiffness." },
    { icon: Home, title: "Home Exercise & Ergonomic Guidance", text: "Simple, clearly explained home exercise plans and workplace/posture tips so that improvement continues even after your session ends." },
  ],
  why: {
    heading: "Why Choose KK Hospital Physiotherapy?",
    text: "Recovery is not only about healing a bone or joint – it is about getting back to your work, home and hobbies without fear. At KK Multispeciality Hospital, physiotherapy is closely integrated with orthopedics, internal medicine and women's health for smoother, safer progress.",
  },
  ctaBand: { question: "Struggling with movement, stiffness or pain?", action: { kind: "book", label: "Schedule a Rehab Session" } },
  bookingValue: "Physiotherapy",
  keywords: ["rehab", "rehabilitation", "exercise", "posture", "neck pain", "back pain", "stiffness", "mobility", "sprain", "physio"],
  blogCategories: ["sports-injuries", "back-pain"],
  pending: ["Real photos of the physiotherapy unit (stock photos used for now)."],
};

import { Bone, Siren, Footprints, Ambulance, Zap, Trophy, Gauge, HandHeart } from "lucide-react";
import type { Department } from "./types";

export const orthopedics: Department = {
  slug: "orthopedics",
  name: "Orthopedics",
  h1: "Orthopedics & Joint Care",
  summary: "Comprehensive bone, joint and spine care with advanced orthopaedic modular OT.",
  image: { src: "/images/orthopedics.jpg", width: 600, height: 525, alt: "Orthopedic care at KK Multispeciality Hospital, Vadodara" },
  heroImage: { src: "/images/dr-alpesh-parekh.png", width: 1080, height: 1350, alt: "Dr. Alpesh Parekh, Orthopaedic Surgeon at KK Multispeciality Hospital", position: "top" },
  art: "knee",
  intro:
    "Comprehensive bone, joint and spine care with advanced orthopaedic modular OT at KK Multispeciality Hospital, Vadodara.",
  bullets: [
    "Consultant: **Dr. Alpesh Parekh – M.S. (Ortho)**",
    "Joint replacement, spine surgery, fracture and trauma management.",
    "Sports injuries, arthritis and chronic pain solutions.",
  ],
  cta: { kind: "book", label: "Book Orthopedic Appointment" },
  card: {
    title: "Meet Dr. Alpesh Parekh",
    text: "Consultant Orthopaedic Surgeon specialising in joint replacement, trauma surgery and sports injuries. Focused on safe recovery and early mobilisation for every age group.",
    meta: [
      { label: "Location", value: "Orthopedic OPD & Modular OT, KK Hospital" },
      { label: "Key Focus", value: "Knee, Hip, Shoulder & Spine Care" },
    ],
    doctor: "dr-alpesh-parekh",
  },
  chips: [
    { icon: Bone, title: "Joint Care", text: "Replacement, alignment & arthritis management" },
    { icon: Siren, title: "24×7 Trauma", text: "Accident & emergency orthopedic support" },
    { icon: Footprints, title: "Back to Activity", text: "Rehab plans for faster, safer return to movement" },
  ],
  servicesHeading: "Orthopedic Services",
  servicesIntro: "From simple fractures to complex joint replacement, we offer complete orthopedic solutions under one roof.",
  services: [
    { icon: Bone, title: "Joint Replacement Surgeries", text: "Shoulder, hip and knee replacement using modern techniques and strict infection control protocols." },
    { icon: Ambulance, title: "Fracture & Trauma Care", text: "Emergency and planned management of fractures, dislocations and accident-related injuries." },
    { icon: Zap, title: "Spine Surgery", text: "Evaluation and surgical management of spine problems causing pain, numbness and mobility issues." },
    { icon: Trophy, title: "Sports Injury Management", text: "Treatment plans for ligament tears, cartilage injuries and overuse problems in active individuals." },
    { icon: Gauge, title: "Arthritis & Pain Clinics", text: "Long-term care for osteoarthritis, rheumatoid arthritis and chronic joint pain conditions." },
    { icon: HandHeart, title: "Rehabilitation Coordination", text: "Close coordination with physiotherapy for safe mobilisation, strengthening and long-term recovery." },
  ],
  why: {
    heading: "Why Choose KK Hospital for Orthopedic Care?",
    text: "With a dedicated orthopaedic surgeon, modular OT and experienced support team, we focus on helping you stand, walk and move freely again. Every treatment plan is customised to your age, lifestyle and medical condition.",
  },
  ctaBand: { question: "Facing persistent joint, back or shoulder pain?", action: { kind: "book", label: "Consult Dr. Alpesh Parekh" } },
  bookingValue: "Orthopedics",
  keywords: ["bone", "joint", "knee", "hip", "shoulder", "spine", "back pain", "fracture", "arthritis", "sports injury", "ligament", "replacement"],
  blogCategories: ["back-pain", "knee-pain", "shoulder-pain", "sports-injuries"],
};

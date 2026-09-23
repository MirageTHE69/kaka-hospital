import { HeartHandshake, Microscope, UserRound, Building2, Siren, Users } from "lucide-react";
import type { LineArtName } from "@/components/LineArt";

export const home = {
  hero: {
    /** Each slide has its own photo, line-art badge and headline; they crossfade together. */
    slides: [
      {
        headline: "Strong Bones. Strong Life.",
        art: "knee" as LineArtName,
        caption: "Knee joint",
        image: { src: "/images/dr-alpesh-parekh.png", width: 1080, height: 1350, alt: "Dr. Alpesh Parekh, Orthopaedic Surgeon at KK Multispeciality Hospital" },
      },
      {
        headline: "Back Pain Not Going?",
        art: "spine" as LineArtName,
        caption: "Lumbar spine",
        image: { src: "/images/dr-alpesh-parekh-thumbs-up.png", width: 470, height: 597, alt: "Dr. Alpesh Parekh giving a thumbs up" },
      },
      {
        headline: "We Care for Vadodara",
        art: "hospital" as LineArtName,
        caption: "Waghodia Road, Vadodara",
        image: { src: "/images/dr-alpesh-parekh-thinking.png", width: 542, height: 623, alt: "Dr. Alpesh Parekh listening thoughtfully" },
      },
    ],
    sub: "KK Multispeciality Hospital is Vadodara's trusted family hospital since 2000",
    trust: ["certified", "24×7 Emergency", "Waghodia Road, Vadodara"],
  },

  pathways: [
    {
      title: "Looking for Orthopedic & Joint Care?",
      text: "Expert evaluation and treatment for knee, hip, spine, shoulder, fractures, and sports injuries with modern facilities and evidence-based care.",
      link: { label: "Explore Orthopedic Services", href: "/services/orthopedics/" },
      emergency: false,
    },
    {
      title: "Consult Vadodara's Trusted Orthopedic Surgeon",
      text: "Dr. Alpesh Parekh (MS Ortho) specializes in joint replacement, trauma surgery, spine disorders, and sports injury management with a patient-centric approach.",
      link: { label: "Meet Dr. Alpesh Parekh", href: "/doctor/dr-alpesh-parekh/" },
      emergency: false,
    },
    {
      title: "Accident, Fracture or Trauma Emergency?",
      text: "Immediate assessment, stabilization, and advanced orthopedic trauma care including plaster, fixation, and emergency surgical intervention.",
      link: { label: "Get Emergency Support", href: "/services/emergency-trauma-care/" },
      emergency: true,
    },
  ],

  about: {
    image: { src: "/images/hospital-exterior.avif", width: 800, height: 600, alt: "KK Multispeciality Hospital building on Waghodia Road, Vadodara" },
    label: "About Kaka",
    heading:
      "We Focus on Ethical, Patient-Centric Orthopedic Care With Advanced Treatment, Proven Results, and Compassionate Recovery Support",
    body:
      "We are committed to providing comprehensive and high-quality **orthopaedic care** tailored to every patient. Whether you require preventive consultation, pain management, injury evaluation, advanced surgical treatment, or emergency trauma care, our focus remains on accurate diagnosis, ethical treatment, and long-term recovery.",
    points: [
      { icon: HeartHandshake, label: "Patient-Centric Orthopedic Care" },
      { icon: Microscope, label: "Modern Surgical & Diagnostic Facilities" },
    ],
  },

  excellence: {
    heading: "Excellence in Orthopedic Care Compassion in Every Recovery",
    body: "We specialize in comprehensive orthopedic care, diagnosing and treating bone, joint, spine, sports-injury, and trauma-related conditions. Our expert orthopedic team provides personalised treatment plans focused on pain relief, mobility restoration, and long-term recovery.",
    stats: [
      { value: "25+", label: "Years of Orthopedic & Medical Excellence" },
      // CLIENT TO CONFIRM: the old counter showed "0+". value: null hides the stat in production.
      { value: null as string | null, label: "Successful Patient Treatments & Recoveries" },
    ],
  },

  why: {
    label: "Why Choose Us",
    heading: "Trusted Care With a Human Touch",
    items: [
      { icon: UserRound, title: "Experienced Senior Doctors", text: "Dr. Alpesh Parekh & Dr. Ranjana Parekh with 25+ years of service." },
      { icon: Building2, title: "Advanced Medical Facilities", text: "Orthopaedic Modular OT, Sonography, X-Ray, 2D Echo, etc." },
      { icon: Siren, title: "24×7 Emergency Support", text: "Emergency + Ambulance + Trauma Care services." },
      { icon: Users, title: "Patient-First Approach", text: "Personalised, ethical, family-focused care." },
    ],
  },

  blog: {
    label: "Blog & News",
    heading: "Stay Informed The Latest in Medical Care & Wellness",
  },

  finalCta: "Need professional medical & health care?",
};

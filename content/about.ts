import { Cpu, Stethoscope, Siren, CalendarCheck, HeartHandshake, BadgeIndianRupee, ShieldCheck } from "lucide-react";

export const about = {
  hero: {
    image: { src: "/images/hospital-exterior.avif", width: 800, height: 600, alt: "KK Multispeciality Hospital building, Waghodia Road, Vadodara" },
    receptionImage: { src: "/images/hospital-reception.avif", width: 2000, height: 1500, alt: "Reception and help desk at KK Multispeciality Hospital" },
    statement:
      "At KK Multispeciality Hospital, we combine modern medical care with a compassionate approach, ensuring every patient receives timely, accurate, and comfortable treatment.",
  },
  intro:
    "From routine check-ups to specialised treatments and emergency care, our hospital offers comprehensive medical services for individuals and families across Vadodara. With modern facilities, experienced doctors and round-the-clock support, we are committed to improving health and enhancing quality of life.",
  pillars: [
    {
      icon: Cpu,
      title: "Modern Technology",
      text: "KK Hospital integrates modern medical equipment and digital diagnostic systems to ensure faster and more precise treatment decisions — improving outcomes and saving valuable time in critical situations.",
    },
    {
      icon: Stethoscope,
      title: "Expert Doctors",
      text: "Our team of certified and highly experienced specialists provides trusted, ethical and personalised medical care tailored to each patient's condition and long-term well-being.",
    },
  ],
  help: {
    heading: "Looking for Hospital Services?",
    text: "Find trusted, multispeciality care for you and your family at KK Multispeciality Hospital, Vadodara.",
    link: { label: "Find Services", href: "/our-services/" },
    routes: [
      {
        title: "Find the Right Specialist",
        text: "Consult experienced orthopaedic, gynaecology, medicine, skin and physiotherapy specialists under one roof.",
        link: { label: "Find Doctors", href: "/meet-our-doctors/" },
        emergency: false,
      },
      {
        title: "Need Emergency Help?",
        text: "For accidents, injuries or sudden illness, our 24×7 Emergency & Trauma Care team is ready to respond.",
        link: { label: "Find Ambulance", href: "tel" },
        emergency: true,
      },
      {
        title: "Comprehensive Medical Care",
        text: "From routine check-ups to advanced treatments — our multispeciality team is here to support every stage of your health journey.",
        link: null,
        emergency: false,
      },
    ],
  },
  features: [
    {
      icon: Siren,
      title: "24×7 Emergency & Critical Care",
      text: "Our rapid-response emergency unit and trauma specialists ensure life-saving care is available anytime, day or night.",
    },
    {
      icon: CalendarCheck,
      title: "Personalized Patient Experience",
      text: "We provide easy appointments, compassionate support, and continuous follow-ups for a smooth and comfortable healing experience.",
    },
  ],
  doctors: {
    label: "Meet Our Doctors",
    heading: "Leading Medical Professionals at Your Service",
    button: "Let's Talk",
  },
  why: {
    label: "Why Choose Us",
    heading: "Leading The Way In Healthcare Trusted Expertise With Compassionate Care",
    items: [
      { icon: HeartHandshake, title: "Personalized Patient Care", text: "We prioritize comfort, communication, and a patient-first approach throughout your treatment journey." },
      { icon: BadgeIndianRupee, title: "Affordable & Transparent Pricing", text: "No hidden charges — we maintain clear, fair pricing and explain every cost upfront." },
      { icon: ShieldCheck, title: "Safety & Hygiene Standards", text: "We strictly follow advanced infection-control measures and modern medical protocols to ensure complete patient safety." },
    ],
  },
};

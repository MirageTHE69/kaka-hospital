import { Baby, ShieldCheck, Flower2, CalendarHeart, Sparkles, Microscope, Scissors, Users, Sun } from "lucide-react";
import type { Department } from "./types";

export const gynecology: Department = {
  slug: "gynecology-obstetrics",
  name: "Gynecology & Obstetrics",
  h1: "Gynecology & Obstetrics",
  summary: "Complete women's health care – from adolescence to menopause and pregnancy.",
  image: { src: "/images/stock/gynecology-ultrasound.jpg", width: 1600, height: 1067, alt: "Pregnancy ultrasound scan in progress" },
  heroImage: { src: "/images/stock/gynecology-consult.jpg", width: 1600, height: 2400, alt: "Gynaecologist consulting an expectant mother", position: "center" },
  art: "motherBaby",
  intro:
    "Complete women's health care – from adolescence to menopause and pregnancy – at KK Multispeciality Hospital, Vadodara.",
  bullets: [
    "Consultant: **Dr. Ranjana Parekh – M.B.B.S., DGO**",
    "Antenatal care, safe delivery planning and high-risk pregnancy support.",
    "Menopause, adolescent gynecology and preventive cervical cancer screening.",
  ],
  cta: { kind: "book", label: "Book Gynecology Appointment" },
  card: {
    title: "Meet Dr. Ranjana Parekh",
    text: "Consultant Obstetrician & Gynaecologist with expertise in antenatal care, laparoscopic uterine surgeries, menopause management and adolescent health counselling.",
    meta: [
      { label: "Location", value: "Women's Health & Maternity Wing, KK Hospital" },
      { label: "Key Focus", value: "Pregnancy, Menopause & Preventive Screening" },
    ],
    doctor: "dr-ranjana-parekh",
  },
  chips: [
    { icon: Baby, title: "Antenatal Care", text: "Regular check-ups, scans and counselling for safe pregnancy" },
    { icon: ShieldCheck, title: "Preventive Screening", text: "Pap smear, cervical cancer screening & HPV vaccination" },
    { icon: Flower2, title: "Mid-Life Well Woman", text: "Menopause & hormonal health support after 35 years" },
  ],
  servicesHeading: "Gynecology & Obstetrics Services",
  servicesIntro:
    "Personalised, confidential care for every stage of a woman's life – focusing on comfort, safety and long-term wellbeing.",
  services: [
    { icon: CalendarHeart, title: "Antenatal Care & Delivery Planning", text: "Regular pregnancy check-ups, investigations and birth-plan counselling to support healthy mothers and healthy babies." },
    { icon: Sparkles, title: "Adolescent Gynecology", text: "Gentle evaluation and guidance for menstrual issues, PCOS, anaemia and other concerns in teenage and young adult girls." },
    { icon: Microscope, title: "Pap Smear & Cervical Cancer Screening", text: "Early detection through Pap smear, HPV testing and vaccination to reduce the risk of cervical cancer in women." },
    { icon: Scissors, title: "Laparoscopic Uterus Surgeries", text: "Minimally invasive procedures for fibroids, abnormal bleeding and other uterine conditions, aiming for faster recovery." },
    { icon: Users, title: "Family Planning & Contraception", text: "Counselling and procedures for spacing, permanent contraception and planning future pregnancies as per family needs." },
    { icon: Sun, title: "Menopause Counselling & Hormonal Care", text: "Support for hot flashes, mood changes, sleep disturbance, bone health and overall wellbeing during mid-life transition." },
  ],
  why: {
    heading: "Why Choose KK Hospital for Women's Health?",
    text: "From first period to motherhood and menopause, KK Multispeciality Hospital offers a safe, reassuring space for every woman. With experienced gynecology consultants, modern facilities and a caring nursing team, we focus on long-term health, not just short-term treatment.",
  },
  ctaBand: { question: "Need guidance for pregnancy, periods or menopause?", action: { kind: "book", label: "Consult Dr. Ranjana Parekh" } },
  bookingValue: "Gynecology & Obstetrics",
  keywords: ["women", "pregnancy", "delivery", "maternity", "periods", "pcos", "menopause", "pap smear", "cervical", "fibroid", "contraception", "gynaecology"],
  blogCategories: ["womens-health", "menopause-problems", "cervical-cancer"],
};

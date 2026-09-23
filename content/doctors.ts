import type { LineArtName } from "@/components/LineArt";

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  qualification: string;
  /** null = photo not yet supplied by the client; a line-art portrait placeholder is shown. */
  photo: { src: string; width: number; height: number } | null;
  shortLine: string;
  /** Paragraphs; **bold** markers are rendered as <strong>. */
  about: string[];
  location: string;
  keyFocus: string;
  department: { slug: string; name: string };
  bookingDepartment: string;
  art: LineArtName;
  /** Education / bio still missing from the client. */
  pendingNote?: string;
};

export const doctors: Doctor[] = [
  {
    slug: "dr-alpesh-parekh",
    name: "Dr. Alpesh Parekh",
    title: "Orthopaedic Surgeon",
    qualification: "M.S. (Ortho)",
    photo: { src: "/images/dr-alpesh-parekh.png", width: 1080, height: 1350 },
    shortLine:
      "Expert in joint replacement, spine surgery, trauma care, and sports injuries with a patient-focused approach.",
    about: [
      "With a strong clinical background and advanced surgical expertise, **Dr. Alpesh Parekh** is dedicated to restoring movement, function, and pain-free living for patients of all ages. He specializes in **joint replacement (knee, hip & shoulder), spine surgery, trauma care, and sports injury management**.",
      "His patient-first approach ensures personalized treatment, clear guidance, and the latest medical innovations for the best possible outcomes.",
      "Whether it's age-related joint problems, sports injuries, fractures, or long-standing back pain — Dr. Alpesh Parekh combines precision care with compassion to help every patient return to an active and confident life.",
    ],
    location: "Orthopedic OPD & Modular OT, KK Hospital",
    keyFocus: "Knee, Hip, Shoulder & Spine Care",
    department: { slug: "orthopedics", name: "Orthopedics & Joint Care" },
    bookingDepartment: "Orthopedics",
    art: "knee",
  },
  {
    slug: "dr-ranjana-parekh",
    name: "Dr. Ranjana Parekh",
    title: "Obstetrician & Gynaecologist",
    qualification: "M.B.B.S., DGO",
    photo: null,
    shortLine:
      "Specializing in pregnancy care, menopause management, cervical cancer screening, and laparoscopic gynec surgeries.",
    about: [
      "Consultant Obstetrician & Gynaecologist with expertise in antenatal care, laparoscopic uterine surgeries, menopause management and adolescent health counselling.",
    ],
    location: "Women's Health & Maternity Wing, KK Hospital",
    keyFocus: "Pregnancy, Menopause & Preventive Screening",
    department: { slug: "gynecology-obstetrics", name: "Gynecology & Obstetrics" },
    bookingDepartment: "Gynecology & Obstetrics",
    art: "motherBaby",
    pendingNote: "Real bio, education history and portrait photo for Dr. Ranjana Parekh.",
  },
];

export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);

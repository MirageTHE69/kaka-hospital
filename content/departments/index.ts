import { orthopedics } from "./orthopedics";
import { pharmacy } from "./pharmacy";
import { diagnostics } from "./diagnostics";
import { emergency } from "./emergency";
import { gynecology } from "./gynecology";
import { internalMedicine } from "./internal-medicine";
import { dermatology } from "./dermatology";
import { physiotherapy } from "./physiotherapy";

export type { Department, IconItem, CtaAction } from "./types";

/** Order matches the services index table in the brief. */
export const departments = [
  orthopedics,
  pharmacy,
  diagnostics,
  emergency,
  gynecology,
  internalMedicine,
  dermatology,
  physiotherapy,
];

export const getDepartment = (slug: string) => departments.find((d) => d.slug === slug);

/** Options for the booking form's "Preferred Department" select (exact list from the brief). */
export const bookingDepartments = [
  "Orthopedics",
  "Gynecology & Obstetrics",
  "Internal Medicine",
  "Dermatology & Cosmetology",
  "Physiotherapy",
  "Mid-Life Well Woman Clinic",
  "Emergency & Trauma Care",
  "Diagnostics & Lab",
  "Pharmacy",
];

export const bookingTimes = [
  "Anytime",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "4:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

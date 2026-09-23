"use client";

import { Phone } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { telHref } from "@/content/site";

const DESKTOP = "(min-width: 768px)";

/**
 * "Book …" CTA: a real tel: link (works without JS and on mobile);
 * on desktop the click opens the booking modal instead.
 */
export function BookButton({
  children,
  department,
  className = "btn-primary",
}: {
  children: React.ReactNode;
  department?: string;
  className?: string;
}) {
  const { open } = useBooking();
  return (
    <a
      href={telHref}
      className={className}
      onClick={(e) => {
        if (window.matchMedia(DESKTOP).matches) {
          e.preventDefault();
          open(department);
        }
      }}
    >
      {children}
    </a>
  );
}

/** "Make Appointment" — always opens the booking modal. */
export function OpenBookingButton({
  children = "Make Appointment",
  department,
  className = "btn-primary",
}: {
  children?: React.ReactNode;
  department?: string;
  className?: string;
}) {
  const { open } = useBooking();
  return (
    <button type="button" className={className} onClick={() => open(department)} aria-haspopup="dialog">
      {children}
    </button>
  );
}

export function CallButton({ children, className = "btn-outline" }: { children: React.ReactNode; className?: string }) {
  return (
    <a href={telHref} className={className}>
      <Phone className="h-5 w-5" aria-hidden />
      {children}
    </a>
  );
}

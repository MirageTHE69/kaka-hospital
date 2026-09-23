"use client";

import { usePathname } from "next/navigation";
import { CalendarPlus, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, telHref } from "@/content/site";
import { useBooking } from "@/components/booking/BookingProvider";

/** Sticky bottom actions on mobile. The emergency page gets a single red call bar instead. */
export function MobileActionBar() {
  const pathname = usePathname() ?? "/";
  const { open } = useBooking();

  if (pathname.startsWith("/services/emergency-trauma-care")) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-signal-600 bg-signal p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <a href={telHref} className="flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-white text-[18px] font-bold text-signal-600">
          <Phone className="h-6 w-6" aria-hidden />
          Call Emergency · <span className="tabular">{site.phone.display}</span>
        </a>
      </div>
    );
  }

  const item = "flex min-h-[60px] flex-1 flex-col items-center justify-center gap-1 text-[13px] font-semibold";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,42,63,0.08)] backdrop-blur md:hidden"
    >
      <a href={telHref} className={`${item} text-radiograph`}>
        <Phone className="h-6 w-6 text-ward" aria-hidden />
        Call
      </a>
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={`${item} text-radiograph`}>
        <MessageCircle className="h-6 w-6 text-ward" aria-hidden />
        WhatsApp
      </a>
      <button type="button" onClick={() => open()} className={`${item} bg-ward text-white`} aria-haspopup="dialog">
        <CalendarPlus className="h-6 w-6" aria-hidden />
        Book
      </button>
      <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className={`${item} text-radiograph`}>
        <MapPin className="h-6 w-6 text-ward" aria-hidden />
        Directions
      </a>
    </nav>
  );
}

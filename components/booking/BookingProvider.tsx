"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { BookingForm } from "./BookingForm";

type Ctx = { open: (department?: string) => void };
const BookingContext = createContext<Ctx>({ open: () => {} });
export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [department, setDepartment] = useState<string | undefined>();
  const [formKey, setFormKey] = useState(0);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((dept?: string) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setDepartment(dept);
    setFormKey((k) => k + 1); // fresh form each time
    ref.current?.showModal();
  }, []);

  const close = () => ref.current?.close();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
      returnFocus.current?.focus?.();
    };
    const onOpen = () => (document.documentElement.style.overflow = "hidden");
    d.addEventListener("close", onClose);
    // `toggle` isn't universal; observe the open attribute instead
    const mo = new MutationObserver(() => d.open && onOpen());
    mo.observe(d, { attributes: true, attributeFilter: ["open"] });
    return () => {
      d.removeEventListener("close", onClose);
      mo.disconnect();
    };
  }, []);

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="booking-title"
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-radiograph/60 md:m-auto md:h-auto md:max-h-[92vh] md:max-w-2xl md:rounded-lightbox"
        onClick={(e) => {
          if (e.target === ref.current) close(); // click on backdrop
        }}
      >
        <div className="flex h-full flex-col overflow-y-auto bg-white md:max-h-[92vh] md:rounded-lightbox">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 md:px-8">
            <div>
              <h2 id="booking-title" className="heading-3 md:!text-[26px]">
                Make an appointment
              </h2>
              <p className="mt-1 text-[15px] text-slate-600">Our team will call you to confirm the date and time.</p>
            </div>
            <button
              type="button"
              onClick={close}
              className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-full text-radiograph hover:bg-film-50"
              aria-label="Close appointment form"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-5 py-6 md:px-8">
            <BookingForm key={formKey} defaultDepartment={department} idPrefix="modal" />
          </div>
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}

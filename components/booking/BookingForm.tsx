"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { bookingDepartments, bookingTimes } from "@/content/departments";
import { site, telHref } from "@/content/site";
import { isEmail, normaliseMobile } from "@/lib/validate";

type Errors = Partial<Record<"name" | "mobile" | "email" | "message" | "consent" | "form", string>>;

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export function BookingForm({ defaultDepartment, idPrefix = "form" }: { defaultDepartment?: string; idPrefix?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const id = (n: string) => `${idPrefix}-${n}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your full name.";
    if (!normaliseMobile(data.mobile ?? "")) next.mobile = "Please enter a valid 10-digit mobile number.";
    if (data.email && !isEmail(data.email)) next.email = "Please enter a valid email address.";
    if (!data.message?.trim()) next.message = "Please tell us briefly how we can help.";
    if (!data.consent) next.consent = "Please agree so our team can contact you.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = form.querySelector<HTMLElement>(`[aria-invalid="true"], #${id(Object.keys(next)[0])}`);
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/appointment/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("idle");
      setErrors({ form: `Sorry, we couldn't send your request. Please call us on ${site.phone.display}.` });
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-card bg-ward-50 p-6">
        <CheckCircle2 className="h-10 w-10 text-ward" aria-hidden />
        <p className="heading-3 text-radiograph">
          Thank you. Our team will call you to confirm your appointment.
        </p>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className="mt-1.5 text-[14px] font-medium text-red-800">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? id(`${k}-error`) : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <label htmlFor={id("name")} className="label">
          Full Name <span className="text-slate-500" aria-hidden>*</span>
        </label>
        <input id={id("name")} name="name" type="text" autoComplete="name" required className="input" {...aria("name")} />
        {err("name")}
      </div>

      <div>
        <label htmlFor={id("mobile")} className="label">
          Mobile Number <span className="text-slate-500" aria-hidden>*</span>
        </label>
        <input
          id={id("mobile")}
          name="mobile"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="10-digit mobile"
          required
          className="input tabular"
          {...aria("mobile")}
        />
        {err("mobile")}
      </div>

      <div>
        <label htmlFor={id("email")} className="label">
          Email ID
        </label>
        <input id={id("email")} name="email" type="email" autoComplete="email" className="input" {...aria("email")} />
        {err("email")}
      </div>

      <div className="md:col-span-2">
        <label htmlFor={id("department")} className="label">
          Preferred Department
        </label>
        <select id={id("department")} name="department" defaultValue={defaultDepartment ?? ""} className="input">
          <option value="">Select a department</option>
          {bookingDepartments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={id("date")} className="label">
          Preferred Date
        </label>
        <input id={id("date")} name="date" type="date" min={todayISO()} className="input tabular" />
      </div>

      <div>
        <label htmlFor={id("time")} className="label">
          Preferred Time
        </label>
        <select id={id("time")} name="time" defaultValue="Anytime" className="input tabular">
          {bookingTimes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor={id("message")} className="label">
          Your Message <span className="text-slate-500" aria-hidden>*</span>
        </label>
        <textarea id={id("message")} name="message" rows={4} required className="input resize-y" {...aria("message")} />
        {err("message")}
      </div>

      <div className="md:col-span-2">
        <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            value="yes"
            required
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-400 accent-ward"
            {...aria("consent")}
          />
          <span>
            I agree that KK Multispeciality Hospital can contact me on the above details for appointment / medical enquiry.{" "}
            <span className="text-slate-500" aria-hidden>*</span>
          </span>
        </label>
        {err("consent")}
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Leave empty
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="md:col-span-2">
        {errors.form && (
          <p role="alert" className="mb-4 rounded-input bg-red-50 px-4 py-3 text-[15px] font-medium text-red-800">
            {errors.form}
          </p>
        )}
        <button type="submit" className="btn-primary w-full md:w-auto" disabled={status === "sending"}>
          {status === "sending" && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
          {status === "sending" ? "Sending…" : "Request appointment"}
        </button>
        <p className="mt-3 text-[15px] text-slate-600">
          For emergencies, do not use this form — call{" "}
          <a href={telHref} className="font-semibold text-signal-600 underline underline-offset-2">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X, Siren, ArrowRight } from "lucide-react";
import { nav, site, telHref } from "@/content/site";
import { LineArt, type LineArtName } from "@/components/LineArt";
import { OpenBookingButton } from "@/components/booking/BookButtons";

export type MenuDept = { slug: string; name: string; art: LineArtName; summary: string | null };

const DISMISS_KEY = "kk-emergency-bar-dismissed";
const menuId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function EmergencyBar({ isEmergencyPage }: { isEmergencyPage: boolean }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (isEmergencyPage) return setHidden(false);
    try {
      setHidden(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      /* storage unavailable: keep bar visible */
    }
  }, [isEmergencyPage]);
  if (hidden) return null;
  return (
    <div className="on-dark bg-signal text-white">
      <div className="container-site flex min-h-[40px] items-center justify-between gap-3 py-1.5">
        <a href={telHref} className="flex flex-1 items-center gap-2 text-[14px] font-semibold leading-tight md:justify-center md:text-[15px]">
          <Siren className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            24×7 Emergency &amp; Trauma Care <span className="hidden sm:inline">—</span>{" "}
            <span className="whitespace-nowrap underline decoration-white/50 underline-offset-2">Call {site.phone.display}</span>
          </span>
        </a>
        {!isEmergencyPage && (
          <button
            type="button"
            className="-mr-2 grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-white/15"
            aria-label="Dismiss emergency banner"
            onClick={() => {
              setHidden(true);
              try {
                sessionStorage.setItem(DISMISS_KEY, "1");
              } catch {}
            }}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

export function SiteHeader({ departments }: { departments: MenuDept[] }) {
  const pathname = usePathname() ?? "/";
  const isEmergencyPage = pathname.startsWith("/services/emergency-trauma-care");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const lastY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  // Hide the header stack on scroll down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY.current;
      setHiddenByScroll(down && y > 160);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Esc / outside click closes desktop dropdowns
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const servicesActive = pathname.startsWith("/our-services") || pathname.startsWith("/services/");

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-radiograph px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <header
        className={`sticky top-0 z-40 transition-transform duration-300 ${hiddenByScroll && !openMenu ? "-translate-y-full" : "translate-y-0"}`}
      >
        <EmergencyBar isEmergencyPage={isEmergencyPage} />
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
          <div className="container-site flex h-[72px] items-center justify-between gap-6">
            <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} — home`}>
              <Image src={site.logo.src} alt="" width={site.logo.width} height={site.logo.height} priority className="h-11 w-auto" />
              <span className="sr-only">{site.name}</span>
            </Link>

            <nav ref={navRef} aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => {
                  const hasMenu = "children" in item || "mega" in item;
                  const active =
                    "mega" in item
                      ? servicesActive
                      : item.href === "/meet-our-doctors/"
                        ? isActive(item.href) || pathname.startsWith("/doctor/")
                        : "children" in item
                          ? item.children.some((c) => pathname.startsWith(c.href))
                          : isActive(item.href);
                  const linkCls = `flex items-center gap-1 rounded-full px-3 py-2 text-[16px] font-semibold transition-colors ${
                    active ? "text-ward" : "text-radiograph hover:text-ward"
                  }`;
                  if (!hasMenu) {
                    return (
                      <li key={item.label}>
                        <Link href={item.href} className={linkCls} aria-current={active ? "page" : undefined}>
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const open = openMenu === item.label;
                  return (
                    <li
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setOpenMenu(item.label)}
                      onMouseLeave={() => setOpenMenu(null)}
                    >
                      <div className="flex items-center">
                        {/* The label is a real link: clicking it opens the page. */}
                        <Link href={item.href} className={`${linkCls} !pr-1`} aria-current={active ? "page" : undefined}>
                          {item.label}
                        </Link>
                        {/* Chevron toggles the menu for keyboard / touch users; hover also opens it. */}
                        <button
                          type="button"
                          className={`grid h-8 w-7 place-items-center rounded-full ${active ? "text-ward" : "text-radiograph hover:text-ward"}`}
                          aria-expanded={open}
                          aria-controls={`menu-${menuId(item.label)}`}
                          aria-label={`${open ? "Hide" : "Show"} ${item.label} menu`}
                          onClick={() => setOpenMenu(open ? null : item.label)}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
                        </button>
                      </div>
                      {"children" in item && (
                        <div id={`menu-${menuId(item.label)}`} hidden={!open} className="absolute left-0 top-full pt-2">
                          <ul className="min-w-[230px] rounded-card border border-slate-200 bg-white p-2 shadow-xl shadow-radiograph/10">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  className={`block rounded-lg px-4 py-2.5 text-[16px] font-medium hover:bg-film-50 ${
                                    pathname === c.href ? "text-ward" : "text-radiograph"
                                  }`}
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {"mega" in item && (
                        <div id={`menu-${menuId(item.label)}`} hidden={!open} className="fixed inset-x-0 top-auto pt-2">
                          <div className="container-site">
                            <div className="grid grid-cols-[1fr_280px] gap-2 overflow-hidden rounded-lightbox border border-slate-200 bg-white p-3 shadow-2xl shadow-radiograph/15">
                              <ul className="grid grid-cols-2 gap-1">
                                {departments.map((d) => (
                                  <li key={d.slug}>
                                    <Link
                                      href={`/services/${d.slug}/`}
                                      className={`group flex items-center gap-4 rounded-card p-3 hover:bg-film-50 ${
                                        pathname.startsWith(`/services/${d.slug}`) ? "bg-film-50" : ""
                                      }`}
                                    >
                                      <span
                                        className={`grid h-14 w-14 shrink-0 place-items-center rounded-card bg-radiograph ${
                                          d.slug === "emergency-trauma-care" ? "text-signal" : "text-film"
                                        }`}
                                      >
                                        <LineArt name={d.art} className="h-10 w-10" strokeWidth={1.5} />
                                      </span>
                                      <span>
                                        <span className="block text-[16px] font-semibold text-radiograph group-hover:text-ward">{d.name}</span>
                                        {d.summary && <span className="line-clamp-1 block text-[14px] text-slate-600">{d.summary}</span>}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <div className="lightbox flex flex-col justify-between p-6">
                                <LineArt name="knee" className="glow mx-auto h-36 w-36 text-film" />
                                <div>
                                  <p className="heading-3 text-white">{site.tagline}</p>
                                  <Link href="/our-services/" className="mt-3 inline-flex items-center gap-2 font-semibold text-film hover:text-white">
                                    All departments <ArrowRight className="h-4 w-4" aria-hidden />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a href={telHref} className="hidden items-center gap-2 px-2 text-[16px] font-semibold text-radiograph hover:text-ward xl:flex">
                <Phone className="h-5 w-5 text-ward" aria-hidden />
                {site.phone.display}
              </a>
              <OpenBookingButton className="btn-primary btn-sm hidden md:inline-flex" />
              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-full text-radiograph hover:bg-film-50 lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-7 w-7" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!mobileOpen}
        className="fixed inset-0 z-50 overflow-y-auto bg-white lg:hidden"
      >
        <div className="container-site flex h-[72px] items-center justify-between border-b border-slate-200">
          <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
            <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} className="h-11 w-auto" />
          </Link>
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full text-radiograph hover:bg-film-50"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-7 w-7" aria-hidden />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-site pb-40 pt-4">
          <ul className="divide-y divide-slate-200">
            {nav.map((item) => (
              <li key={item.label} className="py-1">
                {"children" in item ? (
                  <details className="group" open={item.children.some((c) => pathname === c.href)}>
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-display text-[22px] font-bold tracking-[-0.02em] text-radiograph">
                      {item.label}
                      <ChevronDown className="h-6 w-6 transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="pb-3 pl-1">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block py-2.5 text-[18px] font-medium text-slate">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : "mega" in item ? (
                  <details className="group" open={servicesActive}>
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-display text-[22px] font-bold tracking-[-0.02em] text-radiograph">
                      {item.label}
                      <ChevronDown className="h-6 w-6 transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="grid gap-1 pb-3">
                      <li>
                        <Link href="/our-services/" className="block py-2.5 text-[18px] font-semibold text-ward">
                          All departments
                        </Link>
                      </li>
                      {departments.map((d) => (
                        <li key={d.slug}>
                          <Link href={`/services/${d.slug}/`} className="flex items-center gap-3 py-2 text-[18px] font-medium text-slate">
                            <span
                              className={`grid h-10 w-10 place-items-center rounded-lg bg-radiograph ${
                                d.slug === "emergency-trauma-care" ? "text-signal" : "text-film"
                              }`}
                            >
                              <LineArt name={d.art} className="h-7 w-7" />
                            </span>
                            {d.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} className="block py-3 font-display text-[22px] font-bold tracking-[-0.02em] text-radiograph">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <OpenBookingButton className="btn-primary w-full" />
            <a href={telHref} className="btn-outline w-full">
              <Phone className="h-5 w-5" aria-hidden /> Call {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href: string; children?: NavChild[] };

const SERVICES: NavChild[] = [
  { label: "Joint Injections", href: "/joint-injections/" },
  { label: "Physical Therapy", href: "/physical-therapy/" },
  { label: "Spinal Decompression", href: "/spinal-decompression/" },
  { label: "Medical Weight Loss", href: "/medical-weight-loss/" },
  { label: "Trigger Point Injections", href: "/trigger-point-injections/" },
  { label: "Nutritional IVs", href: "/nutritional-ivs/" },
  { label: "Bioidentical Hormones", href: "/bioidentical-hormones/" },
  { label: "Chiropractic Care", href: "/chiropractic-care/" },
  { label: "Auto Injury", href: "/auto-injury/" },
  { label: "Auto Accident", href: "/auto-accident-chiropractor-eugene-or/" },
];

const CONDITIONS: NavChild[] = [
  { label: "Back Pain", href: "/back-pain/" },
  { label: "Neck Pain", href: "/neck-pain/" },
  { label: "Joint Pain", href: "/joint-pain/" },
  { label: "Neuropathy", href: "/neuropathy/" },
  { label: "Hormonal Imbalance", href: "/hormonal-imbalance/" },
  { label: "Knee Pain", href: "/knee-pain/" },
  { label: "Pain Relief", href: "/pain-relief/" },
  { label: "Shoulder Pain", href: "/shoulder-pain/" },
  { label: "Whiplash", href: "/whiplash/" },
];

const ABOUT: NavChild[] = [
  { label: "About Us", href: "/about/" },
  { label: "Blog", href: "/blog/" },
];

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/", children: ABOUT },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Appointments", href: "/appointments/" },
  { label: "Services", href: "/services/", children: SERVICES },
  { label: "Conditions", href: "/conditions/", children: CONDITIONS },
  { label: "Contact", href: "/contact/" },
];

const BRAND = "#7E9146";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1l-2.22 2.2Z" />
  </svg>
);

const PinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M13.5 21v-7.5h2.55l.38-3H13.5V8.6c0-.86.24-1.45 1.48-1.45h1.58V4.47a21 21 0 0 0-2.3-.12c-2.28 0-3.84 1.39-3.84 3.94V10.5H7.86v3h2.56V21h3.08Z" />
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M21.6 12.23c0-.7-.06-1.36-.18-2H12v3.79h5.4a4.62 4.62 0 0 1-2 3.03v2.51h3.23c1.89-1.74 2.97-4.3 2.97-7.33Z" />
    <path d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.22-2.5c-.9.6-2.04.95-3.4.95-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22Z" />
    <path d="M6.4 13.89a6 6 0 0 1 0-3.78V7.53H3.07a10 10 0 0 0 0 8.94l3.33-2.58Z" />
    <path d="M12 5.96c1.47 0 2.78.5 3.82 1.5l2.86-2.85A10 10 0 0 0 3.07 7.53L6.4 10.1C7.19 7.74 9.4 5.96 12 5.96Z" />
  </svg>
);

const Chevron = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSub(null);
    // Drop focus from a just-clicked nav link so the desktop dropdown
    // (driven by group-focus-within) doesn't stay open after navigation.
    if (typeof document !== "undefined") {
      const el = document.activeElement as HTMLElement | null;
      if (el && typeof el.blur === "function") el.blur();
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* ROW 1 — utility bar */}
      <div className="bg-[#0a0a0a] text-white text-[13px]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <a
            href="tel:+15414845777"
            className="inline-flex items-center gap-2 hover:text-[color:var(--brand)] transition-colors"
            style={{ ["--brand" as string]: BRAND }}
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            <span className="font-medium">(541) 484-5777</span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href="https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts"
              target="_blank"
              rel="noreferrer noopener"
              className="hidden md:inline-flex items-center gap-2 hover:text-[color:var(--brand)] transition-colors"
              style={{ ["--brand" as string]: BRAND }}
            >
              <PinIcon className="h-3.5 w-3.5" />
              <span>2286 Oakmont Way, Eugene, OR 97401</span>
            </a>
            <a
              href="https://www.facebook.com/AbsoluteWellnessCenter"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-[#7E9146] transition-colors"
            >
              <FacebookIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Google Maps"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-[#7E9146] transition-colors"
            >
              <GoogleIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ROW 2 — main nav */}
      <div
        className={`bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-sm border-b border-gray-100" : "border-b border-gray-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Absolute Wellness Center — Home" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Absolute Wellness Center"
              width={959}
              height={260}
              priority
              className="h-11 w-auto md:h-14"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              const hasChildren = !!item.children?.length;
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup={hasChildren || undefined}
                    className={`inline-flex items-center gap-1 px-3.5 py-2.5 text-[14px] font-semibold tracking-[0.02em] transition-colors ${
                      active
                        ? "text-[#7E9146] underline underline-offset-[6px] decoration-2"
                        : "text-gray-800 hover:text-[#7E9146]"
                    }`}
                  >
                    {item.label}
                    {hasChildren && <Chevron className="h-4 w-4" />}
                  </Link>

                  {hasChildren && (
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div
                        className={`${
                          item.children!.length > 4 ? "w-[440px]" : "w-[220px]"
                        } rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5`}
                      >
                        <div
                          className={`grid gap-1 ${
                            item.children!.length > 4 ? "grid-cols-2" : "grid-cols-1"
                          }`}
                        >
                          {item.children!.map((c) => {
                            const a = pathname === c.href;
                            return (
                              <Link
                                key={c.href}
                                href={c.href}
                                aria-current={a ? "page" : undefined}
                                onClick={(e) => e.currentTarget.blur()}
                                className={`block rounded-lg px-4 py-2.5 text-sm transition-colors ${
                                  a
                                    ? "bg-[#f0f4e8] text-[#7E9146] font-semibold"
                                    : "text-gray-700 hover:bg-[#f0f4e8] hover:text-[#7E9146]"
                                }`}
                              >
                                {c.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/appointments/"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
              style={{ backgroundColor: BRAND }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a6a30")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
            >
              Request Appointment
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          {/* Mobile button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-800 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
          <nav
            aria-label="Mobile"
            className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <Image
                src="/images/logo.png"
                alt="Absolute Wellness Center"
                width={959}
                height={260}
                className="h-10 w-auto"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-gray-100"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <ul className="px-2 py-3">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href);
                const hasChildren = !!item.children?.length;
                const expanded = openSub === item.href;
                return (
                  <li key={item.href} className="border-b border-gray-50 last:border-0">
                    <div className="flex items-stretch">
                      <Link
                        href={item.href}
                        className={`flex-1 px-4 py-3 text-sm font-semibold ${
                          active ? "text-[#7E9146]" : "text-gray-800"
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => setOpenSub(expanded ? null : item.href)}
                          aria-expanded={expanded}
                          aria-label={`Toggle ${item.label} submenu`}
                          className="px-4 text-gray-500 hover:bg-gray-50"
                        >
                          <Chevron className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    {hasChildren && expanded && (
                      <ul className="bg-gray-50">
                        {item.children!.map((c) => {
                          const a = pathname === c.href;
                          return (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                aria-current={a ? "page" : undefined}
                                className={`block px-8 py-2.5 text-sm ${a ? "text-[#7E9146] font-semibold" : "text-gray-700"}`}
                              >
                                {c.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="space-y-3 px-5 pb-8 pt-4 border-t border-gray-100">
              <a
                href="tel:+15414845777"
                className="flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 hover:border-[#7E9146] hover:text-[#7E9146]"
              >
                <PhoneIcon className="h-4 w-4" />
                (541) 484-5777
              </a>
              <Link
                href="/appointments/"
                className="block rounded-full px-4 py-3 text-center text-sm font-semibold text-white shadow"
                style={{ backgroundColor: BRAND }}
              >
                Request Appointment →
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

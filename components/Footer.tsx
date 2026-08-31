import Image from "next/image";
import Link from "next/link";

const BRAND = "#7E9146";

const SERVICE_LINKS = [
  { label: "Medical Weight Loss", href: "/medical-weight-loss/" },
  { label: "Spinal Decompression", href: "/spinal-decompression/" },
  { label: "Chiropractic Care", href: "/chiropractic-care/" },
  { label: "Physical Therapy", href: "/physical-therapy/" },
  { label: "Nutritional IVs", href: "/nutritional-ivs/" },
  { label: "Joint Injections", href: "/joint-injections/" },
  { label: "Auto Accident", href: "/auto-accident-chiropractor-eugene-or/" },
  { label: "View All Services", href: "/services/" },
];

const CONDITION_LINKS = [
  { label: "Back Pain", href: "/back-pain/" },
  { label: "Neck Pain", href: "/neck-pain/" },
  { label: "Knee Pain", href: "/knee-pain/" },
  { label: "Neuropathy", href: "/neuropathy/" },
  { label: "Joint Pain", href: "/joint-pain/" },
  { label: "Shoulder Pain", href: "/shoulder-pain/" },
  { label: "View All Conditions", href: "/conditions/" },
];

const QUICK_LINKS = [
  { label: "About Us", href: "/about/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Appointments", href: "/appointments/" },
  { label: "Blog", href: "/blog/" },
  { label: "Areas We Serve", href: "/areas/" },
  { label: "Contact", href: "/contact/" },
  { label: "Sitemap", href: "/sitemap/" },
  { label: "Accessibility", href: "/accessibility/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-raleway)] text-xs font-semibold uppercase tracking-[0.18em] text-white mb-5">
      {children}
    </h3>
  );
}

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-2.5 text-sm">
      {items.map((i) => (
        <li key={i.href}>
          <Link
            href={i.href}
            className="text-gray-400 hover:text-[#7E9146] transition-colors"
          >
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* Brand gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(126,145,70,0.18) 0%, rgba(10,10,10,0) 45%, rgba(184,205,122,0.10) 100%)",
        }}
      />
      {/* Top accent border */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(126,145,70,0.6), transparent)",
        }}
      />
      {/* Drifting brand blobs */}
      <div
        aria-hidden
        className="awc-float pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(126,145,70,0.45) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="awc-float-delayed pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(184,205,122,0.4) 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      {/* Animated SVG flow lines */}
      <svg
        aria-hidden
        viewBox="0 0 1400 400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      >
        <defs>
          <linearGradient id="awc-footer-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#7E9146" stopOpacity="0" />
            <stop offset="50%" stopColor="#b8cd7a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7E9146" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 320 Q 350 220 700 290 T 1400 240"
          stroke="url(#awc-footer-line)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M 0 360 Q 400 280 800 330 T 1400 300"
          stroke="url(#awc-footer-line)"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="Absolute Wellness Center — Home"
              className="inline-flex items-center gap-3"
            >
              <span className="relative block h-14 w-12 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={959}
                  height={260}
                  className="absolute left-0 top-0 h-full w-auto max-w-none"
                />
              </span>
              <span className="font-[family-name:var(--font-raleway)] leading-tight">
                <span className="block text-xl font-bold text-white">
                  Absolute
                </span>
                <span className="block text-base font-semibold text-white/85">
                  Wellness Center
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
              Dedicated to regenerative medicine and comprehensive wellness care
              for patients in Eugene, OR and surrounding areas.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <p className="text-gray-400">
                <span className="font-semibold" style={{ color: BRAND }}>Phone:</span>{" "}
                <a href="tel:+15414845777" className="hover:text-white">
                  (541) 484-5777
                </a>
              </p>
              <p className="text-gray-400">
                <span className="font-semibold" style={{ color: BRAND }}>Address:</span>{" "}
                <a
                  href="https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white"
                >
                  2286 Oakmont Way, Eugene, OR 97401
                </a>
              </p>
              <p className="text-gray-400">
                <span className="font-semibold" style={{ color: BRAND }}>Hours:</span>{" "}
                Mon–Thu: 9am–6pm | Fri–Sun: Closed
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <ColumnHeading>Our Services</ColumnHeading>
            <LinkList items={SERVICE_LINKS} />
          </div>

          {/* Conditions */}
          <div className="lg:col-span-2">
            <ColumnHeading>Conditions</ColumnHeading>
            <LinkList items={CONDITION_LINKS} />
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <ColumnHeading>Quick Links</ColumnHeading>
            <LinkList items={QUICK_LINKS} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-400">
            © {year} Absolute Wellness Center. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/AbsoluteWellnessCenter"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-[#7E9146] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M13.5 21v-7.5h2.55l.38-3H13.5V8.6c0-.86.24-1.45 1.48-1.45h1.58V4.47a21 21 0 0 0-2.3-.12c-2.28 0-3.84 1.39-3.84 3.94V10.5H7.86v3h2.56V21h3.08Z" />
              </svg>
            </a>
            <a
              href="https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Google Maps"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-[#7E9146] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M21.6 12.23c0-.7-.06-1.36-.18-2H12v3.79h5.4a4.62 4.62 0 0 1-2 3.03v2.51h3.23c1.89-1.74 2.97-4.3 2.97-7.33Z" />
                <path d="M12 22c2.7 0 4.96-.9 6.62-2.44l-3.22-2.5c-.9.6-2.04.95-3.4.95-2.6 0-4.81-1.76-5.6-4.12H3.07v2.58A10 10 0 0 0 12 22Z" />
                <path d="M6.4 13.89a6 6 0 0 1 0-3.78V7.53H3.07a10 10 0 0 0 0 8.94l3.33-2.58Z" />
                <path d="M12 5.96c1.47 0 2.78.5 3.82 1.5l2.86-2.85A10 10 0 0 0 3.07 7.53L6.4 10.1C7.19 7.74 9.4 5.96 12 5.96Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

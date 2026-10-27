import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { linkifyPhone } from "@/lib/linkify-phone";

const BRAND = "#7E9146";

/* ─────────────────────────────────────────────────────────────
   SECTION 2 — Two-column body (60/40): copy LEFT, image RIGHT
   ───────────────────────────────────────────────────────────── */
export function ServiceBody({
  pill,
  pillIcon,
  headingLead,
  headingAccent,
  paragraphs,
  image,
  imageAlt,
  ctaLabel = "Request an Appointment",
  extra,
}: {
  pill: string;
  pillIcon?: ReactNode;
  headingLead: string;
  headingAccent: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  extra?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          {/* LEFT — copy */}
          <div>
            <Reveal>
              <SectionPill icon={pillIcon ?? Icons.spark("h-3.5 w-3.5")}>
                {pill}
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                {headingLead}{" "}
                <span style={{ color: BRAND }}>{headingAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 space-y-4 font-[family-name:var(--font-lato)] text-base leading-8 text-gray-600">
                {paragraphs.map((p, i) => (
                  <p key={i}>{linkifyPhone(p)}</p>
                ))}
              </div>
            </Reveal>
            {extra && <Reveal delay={0.16}>{extra}</Reveal>}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/appointments/"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: BRAND }}
                >
                  {ctaLabel}
                  {Icons.arrow("h-4 w-4")}
                </Link>
                <a
                  href="tel:+15414845777"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#7E9146] px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#7E9146] transition-colors hover:bg-[#7E9146] hover:text-white"
                >
                  {Icons.phone("h-4 w-4")}
                  (541) 484-5777
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — image */}
          <Reveal delay={0.15}>
            <div className="relative lg:sticky lg:top-24">
              <div
                aria-hidden
                className="absolute -inset-2 rounded-[24px] opacity-25 blur-2xl"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, transparent 70%)`,
                }}
              />
              <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 3 — "How We Can Help" 3-column dark icon cards
   ───────────────────────────────────────────────────────────── */
export type HelpCard = {
  icon: (cls?: string) => ReactNode;
  title: string;
  body: string;
};

export function HowWeHelp({
  heading = "How We Can Help",
  accent,
  cards,
}: {
  heading?: string;
  accent?: string;
  cards: HelpCard[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Reveal>
            <SectionPill icon={Icons.shield("h-3.5 w-3.5")} inverted>
              Our Approach
            </SectionPill>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
              {heading}
              {accent && (
                <>
                  {" "}
                  <span style={{ color: BRAND }}>{accent}</span>
                </>
              )}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl bg-[#111] p-8 transition-all hover:-translate-y-1 hover:bg-[#161616]">
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    backgroundColor: "rgba(126,145,70,0.15)",
                    color: BRAND,
                  }}
                >
                  {c.icon("h-6 w-6")}
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-xl font-bold text-white">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{linkifyPhone(c.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 4 — Related Services sidebar cards + inline CTA
   ───────────────────────────────────────────────────────────── */
export type RelatedItem = {
  title: string;
  href: string;
  icon: (cls?: string) => ReactNode;
};

export function RelatedServices({
  currentHref,
  items,
}: {
  currentHref: string;
  items?: RelatedItem[];
}) {
  const all: RelatedItem[] = items ?? DEFAULT_RELATED;
  const related = all.filter((r) => r.href !== currentHref).slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          {/* LEFT — sidebar list */}
          <div>
            <Reveal>
              <SectionPill icon={Icons.spark("h-3.5 w-3.5")}>
                Related Services
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Explore More{" "}
                <span style={{ color: BRAND }}>Treatments</span>
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {related.map((r, i) => (
                <Reveal key={r.href} delay={i * 0.05}>
                  <Link
                    href={r.href}
                    className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: "rgba(126,145,70,0.12)",
                        color: BRAND,
                      }}
                    >
                      {r.icon("h-5 w-5")}
                    </span>
                    <span className="font-[family-name:var(--font-raleway)] text-sm font-bold text-gray-900 group-hover:text-[#5a6a30]">
                      {r.title}
                    </span>
                    <span
                      className="ml-auto text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-[#7E9146]"
                      aria-hidden
                    >
                      {Icons.arrow("h-4 w-4")}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT — inline CTA card */}
          <Reveal delay={0.1}>
            <div
              className="relative overflow-hidden rounded-[28px] p-10 text-white shadow-xl lg:sticky lg:top-24"
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, #5a6a30 100%)`,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="relative">
                <SectionPill icon={Icons.calendar("h-3.5 w-3.5")} inverted>
                  Book Today
                </SectionPill>
                <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight sm:text-4xl">
                  Personalized care for lasting relief
                </h3>
                <p className="mt-4 max-w-md text-base leading-7 text-white/90">
                  Our team in Eugene, OR is ready to design a treatment plan
                  built around your goals — call today or request an
                  appointment online.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/appointments/"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#5a6a30] transition-transform hover:scale-[1.02]"
                  >
                    Request Appointment
                    {Icons.arrow("h-4 w-4")}
                  </Link>
                  <a
                    href="tel:+15414845777"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#5a6a30]"
                  >
                    {Icons.phone("h-4 w-4")}
                    (541) 484-5777
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 5 — Green CTA Band → /appointments/
   ───────────────────────────────────────────────────────────── */
export function GreenCTABand({
  heading = "Ready to feel better?",
  body = "Call our team and we'll help you find the best path to feeling better.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section
      className="relative overflow-hidden py-16"
      style={{ backgroundColor: BRAND }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-white">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-3 text-base leading-7 text-white/90">{linkifyPhone(body)}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/appointments/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#5a6a30] transition-transform hover:scale-[1.02]"
            >
              Request Appointment
              {Icons.arrow("h-4 w-4")}
            </Link>
            <a
              href="tel:+15414845777"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#5a6a30]"
            >
              {Icons.phone("h-4 w-4")}
              Call (541) 484-5777
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 3.5 — Process Timeline ("What to Expect")
   ───────────────────────────────────────────────────────────── */
export type TimelineStep = {
  title: string;
  body: string;
  icon: (cls?: string) => ReactNode;
};

export function ProcessTimeline({
  heading = "What to",
  accent = "Expect",
  pill = "Your Care Path",
  steps,
}: {
  heading?: string;
  accent?: string;
  pill?: string;
  steps: TimelineStep[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7f9f2] to-white py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Reveal>
            <SectionPill icon={Icons.calendar("h-3.5 w-3.5")}>{pill}</SectionPill>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {heading} <span style={{ color: BRAND }}>{accent}</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* desktop connector line */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-[2px] rounded-full lg:block"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${BRAND} 18%, ${BRAND} 82%, transparent 100%)`,
              opacity: 0.4,
            }}
          />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="group relative flex flex-col items-center text-center">
                  <span
                    className="relative inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-md ring-2 transition-transform group-hover:scale-105"
                    style={{ borderColor: BRAND, color: BRAND }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ boxShadow: "0 0 0 8px rgba(126,145,70,0.08)" }}
                    />
                    <span className="font-[family-name:var(--font-raleway)] text-2xl font-black">
                      {i + 1}
                    </span>
                  </span>
                  <span
                    className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.12)",
                      color: BRAND,
                    }}
                  >
                    {s.icon("h-5 w-5")}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-raleway)] text-lg font-bold text-gray-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xs font-[family-name:var(--font-lato)] text-sm leading-6 text-gray-600">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Default Related-Services pool (all 9 services) */
export const DEFAULT_RELATED: RelatedItem[] = [
  { title: "Joint Injections",         href: "/joint-injections/",         icon: Icons.syringe },
  { title: "Trigger Point Injections", href: "/trigger-point-injections/", icon: Icons.spark   },
  { title: "Physical Therapy",         href: "/physical-therapy/",         icon: Icons.figure  },
  { title: "Spinal Decompression",     href: "/spinal-decompression/",     icon: Icons.spine   },
  { title: "Medical Weight Loss",      href: "/medical-weight-loss/",      icon: Icons.scale   },
  { title: "Nutritional IVs",          href: "/nutritional-ivs/",          icon: Icons.drip    },
  { title: "Bioidentical Hormones",    href: "/bioidentical-hormones/",    icon: Icons.leaf    },
  { title: "Chiropractic Care",        href: "/chiropractic-care/",        icon: Icons.hands   },
  { title: "Auto Injury",              href: "/auto-injury/",              icon: Icons.shield  },
];

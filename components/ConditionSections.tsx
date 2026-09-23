import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/home/Reveal";
import { Icons } from "@/components/home/ui";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";

const BRAND = "#7E9146";

/* All 9 conditions — single source of truth for grid + related-cards */
export type ConditionItem = {
  title: string;
  href: string;
  icon: (cls?: string) => ReactNode;
};

export const CONDITIONS_POOL: ConditionItem[] = [
  { title: "Back Pain",          href: "/back-pain/",          icon: Icons.spine    },
  { title: "Neck Pain",          href: "/neck-pain/",          icon: Icons.user     },
  { title: "Shoulder Pain",      href: "/shoulder-pain/",      icon: Icons.figure   },
  { title: "Knee Pain",          href: "/knee-pain/",          icon: Icons.shield   },
  { title: "Whiplash",           href: "/whiplash/",           icon: Icons.cross    },
  { title: "Joint Pain",         href: "/joint-pain/",         icon: Icons.hands    },
  { title: "Pain Relief",        href: "/pain-relief/",        icon: Icons.check    },
  { title: "Neuropathy",         href: "/neuropathy/",         icon: Icons.spark    },
  { title: "Hormonal Imbalance", href: "/hormonal-imbalance/", icon: Icons.leaf     },
];

/* ─────────────────────────────────────────────────────────────
   [C] ENHANCEMENT — Related Conditions row (dark bg)
   ───────────────────────────────────────────────────────────── */
export function RelatedConditions({ hrefs }: { hrefs: string[] }) {
  const items = hrefs
    .map((h) => CONDITIONS_POOL.find((c) => c.href === h))
    .filter((x): x is ConditionItem => Boolean(x));

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-1/4 h-[360px] w-[360px] rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-[family-name:var(--font-raleway)] text-xs font-bold uppercase tracking-[0.2em] text-white/40">
            Explore More Conditions
          </p>
        </Reveal>
        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          {items.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.08} className="flex-1">
              <Link
                href={c.href}
                className="group flex items-center gap-4 rounded-2xl bg-[#111] p-5 ring-1 ring-white/5 transition-all hover:-translate-y-0.5 hover:bg-[#161616] hover:ring-[#7E9146]/40"
              >
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    backgroundColor: "rgba(126,145,70,0.15)",
                    color: BRAND,
                  }}
                >
                  {c.icon("h-5 w-5")}
                </span>
                <span className="font-[family-name:var(--font-raleway)] text-sm font-bold text-white">
                  {c.title}
                </span>
                <span
                  className="ml-auto text-[#7E9146] transition-transform group-hover:translate-x-1"
                  aria-hidden
                >
                  {Icons.arrow("h-4 w-4")}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   [D] ENHANCEMENT — Green CTA band (condition variant)
   ───────────────────────────────────────────────────────────── */
export function ConditionCTABand({
  heading = "Ready to Find Relief?",
  body = "Call (541) 484-5777 or request an appointment online.",
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
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-white/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-white">
            {heading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-3 text-lg leading-7 text-white/90">{body}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/appointments/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#5a6a30] transition-transform hover:scale-[1.02] hover:bg-[#f0f4e8]"
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
   Typography wrapper — styles live-content children consistently
   ───────────────────────────────────────────────────────────── */
export function ConditionProse({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "max-w-none font-[family-name:var(--font-lato)] text-gray-600 " +
        "[&_p]:mt-4 [&_p]:text-base [&_p]:leading-7 " +
        "[&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:font-[family-name:var(--font-raleway)] [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-900 " +
        "[&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:font-[family-name:var(--font-raleway)] [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-gray-900 " +
        "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:marker:text-[#7E9146] [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:text-base [&_ul]:leading-7 " +
        "[&_ul_ul]:mt-2 [&_ul_ul]:list-[circle] " +
        "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:marker:text-[#7E9146] [&_ol]:pl-6 [&_ol]:space-y-2 " +
        "[&_strong]:text-gray-900 [&_strong]:font-semibold " +
        className
      }
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ENHANCEMENT — "What You May Feel" signs grid (cream bg, chip cards)
   ───────────────────────────────────────────────────────────── */
export function SignsGrid({
  pill,
  heading,
  accent,
  intro,
  items,
}: {
  pill: string;
  heading: string;
  accent: string;
  intro?: string;
  items: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#f7f9f2] py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(126,145,70,0.5) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: "rgba(126,145,70,0.3)",
                backgroundColor: "rgba(126,145,70,0.08)",
                color: BRAND,
              }}
            >
              <span aria-hidden>{Icons.spark("h-3.5 w-3.5")}</span>
              {pill}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {heading} <span style={{ color: BRAND }}>{accent}</span>
            </h2>
          </Reveal>
          {intro ? (
            <Reveal delay={0.14}>
              <p className="mt-5 font-[family-name:var(--font-lato)] text-base leading-7 text-gray-600">
                {intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((label, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <div className="group flex items-start gap-4 rounded-2xl border border-gray-200/70 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#7E9146]/40 hover:shadow-md">
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(126,145,70,0.12)",
                    color: BRAND,
                  }}
                  aria-hidden
                >
                  {Icons.check("h-5 w-5")}
                </span>
                <p className="pt-2 font-[family-name:var(--font-lato)] text-[15px] leading-6 text-gray-800">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ENHANCEMENT — "Our Approach" 3-step timeline (dark bg, animated)
   ───────────────────────────────────────────────────────────── */
export function TreatmentApproach({
  pill,
  heading,
  accent,
  intro,
  steps,
}: {
  pill: string;
  heading: string;
  accent: string;
  intro?: string;
  steps: { title: string; body: string; icon: ReactNode }[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[460px] w-[460px] rounded-full opacity-[0.18] blur-3xl"
        style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              <span aria-hidden style={{ color: BRAND }}>
                {Icons.stetho("h-3.5 w-3.5")}
              </span>
              {pill}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-white sm:text-5xl">
              {heading} <span style={{ color: BRAND }}>{accent}</span>
            </h2>
          </Reveal>
          {intro ? (
            <Reveal delay={0.14}>
              <p className="mt-5 font-[family-name:var(--font-lato)] text-base leading-7 text-white/70">
                {intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <ol className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(126,145,70,0.5), transparent)",
            }}
          />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <li className="group relative rounded-2xl bg-[#111] p-6 ring-1 ring-white/5 transition-all hover:-translate-y-1 hover:ring-[#7E9146]/40">
                <div className="flex items-center gap-4">
                  <span
                    className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.15)",
                      color: BRAND,
                    }}
                  >
                    {s.icon}
                    <span
                      className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: BRAND }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="font-[family-name:var(--font-raleway)] text-lg font-bold text-white">
                    {s.title}
                  </h3>
                </div>
                <p className="mt-4 font-[family-name:var(--font-lato)] text-[15px] leading-7 text-white/70">
                  {s.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ENHANCEMENT — Shared "Why Choose AWC" band (white bg, 4 features)
   ───────────────────────────────────────────────────────────── */
export async function WhyAWC({ condition }: { condition: string }) {
  const { meta } = await getDisplayedGoogleReviews();
  const reviewCopy =
    meta.rating > 0 && meta.reviewCount > 0
      ? `${meta.rating.toFixed(1)} stars across ${meta.reviewCount}+ Google reviews.`
      : "Read our Google reviews before you book.";
  const features = [
    {
      title: "Integrated Medical + Chiropractic",
      body: "Medical doctors and chiropractors working under one roof — coordinated care, not handoffs.",
      icon: Icons.cross("h-5 w-5"),
    },
    {
      title: "Personalized Treatment Plans",
      body: `No two cases of ${condition.toLowerCase()} are alike. Your plan is built around your exam, history, and goals.`,
      icon: Icons.user("h-5 w-5"),
    },
    {
      title: "On-Site Digital X-Ray",
      body: "Same-day imaging when clinically indicated so we can act on findings without delays.",
      icon: Icons.shield("h-5 w-5"),
    },
    {
      title: "9+ Years Serving Eugene",
      body: `Trusted by thousands of local patients — ${reviewCopy}`,
      icon: Icons.star("h-5 w-5"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: "rgba(126,145,70,0.3)",
                backgroundColor: "rgba(126,145,70,0.08)",
                color: BRAND,
              }}
            >
              <span aria-hidden>{Icons.leaf("h-3.5 w-3.5")}</span>
              Why Absolute Wellness
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Care designed around <span style={{ color: BRAND }}>your relief</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#7E9146]/40 hover:shadow-md">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    backgroundColor: "rgba(126,145,70,0.12)",
                    color: BRAND,
                  }}
                  aria-hidden
                >
                  {f.icon}
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-lg font-bold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 font-[family-name:var(--font-lato)] text-sm leading-6 text-gray-600">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Reusable section-pill heading block (for above each live H2)
   ───────────────────────────────────────────────────────────── */
export function ConditionHeading({
  pillIcon,
  pillText,
  leading,
  accent,
  onDark = false,
}: {
  pillIcon: ReactNode;
  pillText: string;
  leading: string;
  accent: string;
  onDark?: boolean;
}) {
  const headColor = onDark ? "text-white" : "text-gray-900";
  return (
    <>
      <Reveal>
        <span
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{
            borderColor: "rgba(126,145,70,0.3)",
            backgroundColor: "rgba(126,145,70,0.08)",
            color: BRAND,
          }}
        >
          <span aria-hidden>{pillIcon}</span>
          {pillText}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl ${headColor}`}
        >
          {leading} <span style={{ color: BRAND }}>{accent}</span>
        </h2>
      </Reveal>
    </>
  );
}

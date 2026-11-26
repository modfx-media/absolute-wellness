import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { GridPattern } from "@/components/home/decor";
import { Icons, SectionPill } from "@/components/home/ui";
import { AnimatedTickRow, DriftingOrbs } from "@/components/MotionAccents";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

// Title matches live awceugene.com.
const TITLE = "New Patients in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "New patients are always welcome at Absolute Wellness Center in Eugene, OR. Download new patient forms, learn what to expect, and call (541) 484-5777 to book.";
const URL = "https://awceugene.com/new-patients/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Absolute Wellness Center",
    locale: "en_US",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const pageSchema = buildPageGraph({
  url: URL,
  name: TITLE,
  description: DESCRIPTION,
  breadcrumb: [
    { name: "Home", item: "https://awceugene.com/" },
    { name: "New Patients" },
  ],
});

const NP_IMAGE = "/images/newpatients_img.jpg";
const FORM_HREF = "/forms/new-patient-paperwork.pdf";

const steps = [
  {
    n: "01",
    icon: Icons.bag("h-7 w-7"),
    title: "Complete Your Forms",
    body: "Download and print your new patient paperwork at home to save time.",
  },
  {
    n: "02",
    icon: Icons.stetho("h-7 w-7"),
    title: "Meet Our Team",
    body: "You'll be warmly greeted by our friendly staff and introduced to your care team.",
  },
  {
    n: "03",
    icon: Icons.spark("h-7 w-7"),
    title: "Begin Your Care",
    body: "Your doctor will review your history and create a personalized treatment plan.",
  },
];

function DownloadIcon({ cls }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </svg>
  );
}

export default function NewPatientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="New Patients"
        subtitle="We're excited to meet you — here's everything you need to know"
        badge="Join Our Family"
        image={NP_IMAGE}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "New Patients" }]}
      />

      {/* SECTION 1 — Welcome Message */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <SectionPill icon={Icons.leaf("h-3.5 w-3.5")}>
                  Welcome
                </SectionPill>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                  We Value Every{" "}
                  <span style={{ color: BRAND }}>Patient</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-7 space-y-4 text-base leading-8 text-gray-600">
                  <p>
                    Here at Absolute Wellness Center, we value our patients. We
                    acknowledge that going to a new place for the first time
                    can be nerve racking. We want to do everything we can to
                    eliminate any unnecessary stressors, which is why we
                    include the option of printing and completing your forms
                    at home. We think of our patients as part of our extended
                    family, and we are excited to meet you!
                  </p>
                  <p>
                    If you have any questions regarding your first visit,
                    please don&apos;t hesitate to call us at{" "}
                    <a
                      href="tel:+15414845777"
                      className="font-semibold hover:underline"
                      style={{ color: BRAND }}
                    >
                      (541) 484-5777
                    </a>
                    .
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/appointments/"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: BRAND }}
                  >
                    Request an Appointment
                    {Icons.arrow("h-4 w-4")}
                  </Link>
                  <a
                    href={FORM_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 rounded-full border-2 border-[#7E9146] px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#7E9146] transition-colors hover:bg-[#7E9146] hover:text-white"
                  >
                    <DownloadIcon cls="h-4 w-4" />
                    Download Form
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-2 rounded-[24px] opacity-25 blur-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND} 0%, transparent 70%)`,
                  }}
                />
                <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
                  <Image
                    src={NP_IMAGE}
                    alt="New patients welcome at Absolute Wellness Center in Eugene, OR"
                    width={800}
                    height={600}
                    className="aspect-[4/3] w-full object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2 — What to Expect */}
      <section className="relative overflow-hidden bg-white py-20">
        <GridPattern className="opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.calendar("h-3.5 w-3.5")}>
                First Visit
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                What to Expect on{" "}
                <span style={{ color: BRAND }}>Your First Visit</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-5 flex justify-center">
                <AnimatedTickRow />
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600">
                We make your first appointment as smooth and welcoming as
                possible.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-[#f7f9f2] p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <span
                    aria-hidden
                    className="absolute -top-6 right-4 font-[family-name:var(--font-raleway)] text-[96px] font-black leading-none"
                    style={{ color: "rgba(126,145,70,0.18)" }}
                  >
                    {s.n}
                  </span>
                  <span
                    className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.15)",
                      color: BRAND,
                    }}
                  >
                    {s.icon}
                  </span>
                  <h3 className="relative mt-5 font-[family-name:var(--font-raleway)] text-xl font-bold text-gray-900">
                    {s.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-6 text-gray-600">
                    {s.body}
                  </p>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundColor: BRAND }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Patient Forms */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
        <DriftingOrbs />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.bag("h-3.5 w-3.5")} inverted>
                Patient Forms
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
                Download Your <span style={{ color: BRAND }}>Paperwork</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-400">
                Complete these at home to make your first visit faster and
                easier.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="relative mx-auto mt-12 max-w-lg">
              <div
                aria-hidden
                className="absolute -inset-2 rounded-[28px] opacity-30 blur-2xl"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, transparent 70%)`,
                }}
              />
              <div className="relative rounded-2xl bg-[#111] p-10 ring-1 ring-white/10">
                <span
                  className="inline-flex h-16 w-16 items-center justify-center rounded-xl text-white shadow-lg"
                  style={{
                    backgroundColor: BRAND,
                    boxShadow: "0 12px 28px -10px rgba(126,145,70,0.55)",
                  }}
                >
                  <DownloadIcon cls="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-raleway)] text-xl font-bold text-white">
                  New Patient Paperwork
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Download &amp; Print Form — Adobe Reader required.
                </p>
                <a
                  href={FORM_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: BRAND }}
                >
                  Download Form
                  {Icons.arrow("h-4 w-4")}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 4 — Green CTA Band */}
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
              Ready to Book Your First Appointment?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 text-base leading-7 text-white/90">
              Call us today at (541) 484-5777 or request an appointment online.
            </p>
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
    </>
  );
}

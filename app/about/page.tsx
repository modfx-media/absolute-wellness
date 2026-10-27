import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { GridPattern } from "@/components/home/decor";
import { Icons, SectionPill } from "@/components/home/ui";
import { BreathPulse, DriftingOrbs } from "@/components/MotionAccents";
import AboutMotionGraphs from "@/components/AboutMotionGraphs";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

// Title matches live awceugene.com.
const TITLE = "About in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Learn about Absolute Wellness Center in Eugene, OR — a welcoming clinic offering regenerative medicine, chiropractic care, IV therapy, and more. Call (541) 484-5777.";
const URL = "https://awceugene.com/about/";

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
    { name: "About" },
  ],
});

const reasons = [
  {
    icon: Icons.scale("h-6 w-6"),
    title: "Advanced Technology",
    body: "State-of-the-art digital X-ray on-site for efficient diagnosis.",
  },
  {
    icon: Icons.user("h-6 w-6"),
    title: "Individualized Care",
    body: "Every treatment plan is adapted to each patient's unique needs and concerns.",
  },
  {
    icon: Icons.leaf("h-6 w-6"),
    title: "Drug-Free Options",
    body: "Hands-on care for patients who want to avoid medications or surgery.",
  },
  {
    icon: Icons.spark("h-6 w-6"),
    title: "Multidisciplinary",
    body: "Combining chiropractic, IV therapy, exercise, and regenerative medicine.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="About"
        subtitle="Eugene's trusted regenerative medicine clinic"
        badge="Meet Our Team"
        image="/images/meditation-1920.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* SECTION 1 — About Intro */}
      <section className="relative overflow-hidden bg-white py-24">
        <GridPattern className="opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <Reveal>
                <SectionPill icon={Icons.shield("h-3.5 w-3.5")}>
                  Who We Are
                </SectionPill>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                  About Absolute{" "}
                  <span style={{ color: BRAND }}>Wellness Center</span>
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-8 space-y-5 text-base leading-8 text-gray-600">
                  <p>
                    Absolute Wellness Center in Eugene, OR offers a welcoming
                    and relaxed environment for an innovative and
                    multidisciplinary approach. The team offers innovative
                    medicine and a variety of therapies, including chiropractic,
                    therapeutic exercise and cold laser therapy, to help
                    patients suffering from sciatica, symptoms associated with
                    neuropathy, arthritis, whiplash, and musculoskeletal pain.
                  </p>
                  <p>
                    The Absolute Wellness Center team uses the best products
                    available. Our services are complemented by advanced
                    technologies for efficient and effective treatments that can
                    relieve pain and help speed up the healing process. Absolute
                    Wellness Center also has state-of-the-art X-ray equipment
                    on-site for efficient diagnosis, so patients are fully
                    informed about their condition before beginning treatment.
                  </p>
                  <p>
                    The team appreciate that every patient has individualized
                    needs and concerns and adapts all of their treatment plans
                    to address the uniqueness of each patient. Their treatment
                    approach focuses on relieving pain and improving physical
                    function for better overall health and well-being. The team
                    provides effective hands-on care and innovative medicine
                    services that can help patients who want to avoid taking
                    medications or having surgery.
                  </p>
                  <p>
                    To learn more about care at Absolute Wellness Center, call
                    or request an appointment now.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/appointments/"
                    className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: BRAND }}
                  >
                    Request an Appointment
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
                    src="/images/meditation-1920.jpg"
                    alt="A welcoming, multidisciplinary approach at Absolute Wellness Center"
                    width={1200}
                    height={800}
                    className="aspect-[4/3] w-full object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                  {/* Breath/meditation motion overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <BreathPulse size={240} />
                  </div>
                </div>
                <AboutMotionGraphs />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Why Choose Us */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
        <DriftingOrbs />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.star("h-3.5 w-3.5")} inverted>
                Why Choose AWC
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
                Why Patients Choose{" "}
                <span style={{ color: BRAND }}>Us</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl bg-[#111] p-8 transition-all hover:-translate-y-1 hover:bg-[#161616]">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.15)",
                      color: BRAND,
                    }}
                  >
                    {r.icon}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-xl font-bold text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — CTA Band */}
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
              Ready to Start Your Wellness Journey?
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

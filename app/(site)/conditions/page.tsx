import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { GridPattern } from "@/components/home/decor";
import { Icons, SectionPill } from "@/components/home/ui";
import { BodyPings } from "@/components/MotionAccents";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

// Title matches live awceugene.com.
const TITLE = "Conditions in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Absolute Wellness Center treats back pain, neck pain, neuropathy, knee pain, hormonal imbalance, whiplash, and more in Eugene, OR. Call (541) 484-5777 today.";
const URL = "https://awceugene.com/conditions/";

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
    { name: "Conditions" },
  ],
});

type Condition = {
  title: string;
  href: string;
  body: string;
  icon: (cls?: string) => React.ReactNode;
};

const conditions: Condition[] = [
  { title: "Back Pain",          href: "/back-pain/",          icon: Icons.spine,  body: "One of the most common medical conditions we treat with natural, effective care." },
  { title: "Neck Pain",          href: "/neck-pain/",          icon: Icons.spine,  body: "Cervical spine pain from injury, posture, or degenerative changes." },
  { title: "Shoulder Pain",      href: "/shoulder-pain/",      icon: Icons.hands,  body: "Rotator cuff issues, bursitis, arthritis, and frozen shoulder." },
  { title: "Knee Pain",          href: "/knee-pain/",          icon: Icons.figure, body: "Osteoarthritis, tendonitis, ligament injuries, and chronic wear." },
  { title: "Whiplash",           href: "/whiplash/",           icon: Icons.shield, body: "Auto accident neck injuries treated with gentle, proven methods." },
  { title: "Joint Pain",         href: "/joint-pain/",         icon: Icons.scale,  body: "Arthritis, inflammation, and structural joint conditions." },
  { title: "Pain Relief",        href: "/pain-relief/",        icon: Icons.leaf,   body: "Naturopathic pain management for chronic and acute pain." },
  { title: "Neuropathy",         href: "/neuropathy/",         icon: Icons.drip,   body: "Peripheral nerve damage affecting 20+ million Americans." },
  { title: "Hormonal Imbalance", href: "/hormonal-imbalance/", icon: Icons.spark,  body: "Hormone optimization for men and women of all ages." },
];

const approachSteps = [
  {
    icon: Icons.stetho("h-7 w-7"),
    title: "Comprehensive Exam",
    body: "We start with a thorough evaluation — including on-site digital X-ray when needed — so we understand exactly what's driving your pain.",
  },
  {
    icon: Icons.user("h-7 w-7"),
    title: "Personalized Treatment Plan",
    body: "Every plan is adapted to your unique needs and concerns, combining the therapies that fit your body and your goals.",
  },
  {
    icon: Icons.calendar("h-7 w-7"),
    title: "Follow-Up & Monitoring",
    body: "We track your progress and adjust along the way — focused on relieving pain and improving physical function long-term.",
  },
];

export default function ConditionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Conditions We Treat"
        subtitle="Natural, drug-free solutions for pain and chronic conditions"
        badge="Conditions"
        image="/images/walking-women-1920-web-2.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Conditions" }]}
      />

      {/* SECTION 1 — Conditions Grid */}
      <section className="relative overflow-hidden bg-white py-24">
        <GridPattern className="opacity-40" />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.stetho("h-3.5 w-3.5")}>
                We Treat
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Find Relief From{" "}
                <span style={{ color: BRAND }}>Your Condition</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
                Our multidisciplinary approach treats the root cause, not just
                symptoms.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mx-auto mt-8 hidden max-w-md md:block">
                <BodyPings />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3">
            {conditions.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.06}>
                <Link
                  href={c.href}
                  className="group relative block h-full overflow-hidden rounded-2xl bg-[#f7f9f2] p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.15)",
                      color: BRAND,
                    }}
                  >
                    {c.icon("h-6 w-6")}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-xl font-bold text-gray-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {c.body}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:underline"
                    style={{ color: BRAND }}
                  >
                    Learn More
                    {Icons.arrow("h-3.5 w-3.5")}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Dark approach section */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.leaf("h-3.5 w-3.5")} inverted>
                Our Approach
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
                Treating the Root Cause, Not Just{" "}
                <span style={{ color: BRAND }}>Symptoms</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {approachSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group text-center md:text-left">
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.18)",
                      color: BRAND,
                    }}
                  >
                    {s.icon}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-xl font-bold text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Green CTA Band */}
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

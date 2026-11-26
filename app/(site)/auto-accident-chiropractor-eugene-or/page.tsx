import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import {
  ServiceBody,
  GreenCTABand,
  ProcessTimeline,
} from "@/components/ServiceSections";
import ServiceFAQ from "@/components/ServiceFAQ";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

const TITLE = "Auto Accident Chiropractor in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Hurt in a car accident in Eugene, OR? Absolute Wellness Center treats whiplash, back pain, neck injuries, and soft tissue damage with chiropractic care and regenerative medicine. Same-week appointments. Call (541) 484-5777.";
const URL = "https://awceugene.com/auto-accident-chiropractor-eugene-or/";

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
    { name: "Services", item: "https://awceugene.com/services/" },
    { name: "Auto Accident Chiropractor" },
  ],
});

const FAQS = [
  {
    q: "How soon after a car accident should I see a chiropractor in Eugene, OR?",
    a: "You should seek care within 72 hours of your accident. Injuries like whiplash and soft tissue damage often don't cause immediate pain but can worsen significantly without early treatment. Oregon law also requires timely documentation for PIP insurance claims.",
  },
  {
    q: "Does Oregon PIP insurance cover chiropractic care after a car accident?",
    a: "Yes. Oregon requires a minimum of $15,000 in Personal Injury Protection (PIP) coverage, which typically covers chiropractic care, physical therapy, and other treatments after an auto accident — regardless of who was at fault.",
  },
  {
    q: "What are the most common injuries treated after a car accident?",
    a: "The most common injuries include whiplash, herniated discs, back and neck pain, shoulder injuries, knee injuries, and headaches. At Absolute Wellness Center, we also treat soft tissue damage and nerve-related symptoms using regenerative medicine.",
  },
  {
    q: "Does Absolute Wellness Center treat auto accident injuries in Eugene, OR?",
    a: "Yes. We specialize in non-surgical, drug-free recovery for auto accident injuries. Our team uses chiropractic care, regenerative medicine, spinal decompression, and physical therapy to help Eugene patients recover fully after a crash.",
  },
];

const SERVICES: { title: string; body: string; icon: (cls?: string) => React.ReactNode }[] = [
  {
    title: "Chiropractic Care",
    body: "Spinal realignment after collision trauma to restore healthy motion and relieve nerve pressure.",
    icon: Icons.hands,
  },
  {
    title: "Physical Therapy",
    body: "Rebuild strength and mobility post-accident with targeted rehab and soft-tissue therapy.",
    icon: Icons.figure,
  },
  {
    title: "Spinal Decompression",
    body: "Relieve herniated disc pressure from impact and reduce radiating back and leg pain.",
    icon: Icons.spine,
  },
  {
    title: "Trigger Point Injections",
    body: "Release stubborn muscle knots from crash-related tension and guarding.",
    icon: Icons.spark,
  },
  {
    title: "Joint Injections",
    body: "Reduce inflammation in injured joints so you can move and heal with less pain.",
    icon: Icons.syringe,
  },
  {
    title: "Regenerative Medicine",
    body: "Non-surgical healing for soft tissue damage that supports your body's natural repair.",
    icon: Icons.leaf,
  },
];

const CONDITIONS: { title: string; body: string; href?: string; icon: (cls?: string) => React.ReactNode }[] = [
  {
    title: "Whiplash",
    body: "Sudden neck strain from rear-end collisions and sudden stops.",
    href: "/whiplash/",
    icon: Icons.cross,
  },
  {
    title: "Neck Pain",
    body: "Stiffness, soreness, and reduced range of motion after impact.",
    href: "/neck-pain/",
    icon: Icons.user,
  },
  {
    title: "Back Pain",
    body: "Lower and mid-back strain, disc injuries, and muscle spasms.",
    href: "/back-pain/",
    icon: Icons.spine,
  },
  {
    title: "Shoulder Pain",
    body: "Seatbelt and bracing injuries to the shoulder and rotator cuff.",
    href: "/shoulder-pain/",
    icon: Icons.figure,
  },
  {
    title: "Knee Pain",
    body: "Dashboard and bracing trauma to the knees and joints.",
    href: "/knee-pain/",
    icon: Icons.shield,
  },
  {
    title: "Headaches & Migraines",
    body: "Post-accident headaches often linked to whiplash and tension.",
    icon: Icons.spark,
  },
  {
    title: "Soft Tissue Injuries",
    body: "Strains, sprains, and tears in muscles, ligaments, and tendons.",
    icon: Icons.hands,
  },
  {
    title: "Neuropathy",
    body: "Tingling, numbness, and nerve pain from crash-related compression.",
    href: "/neuropathy/",
    icon: Icons.stetho,
  },
];

const WHY_POINTS: { title: string; body: string; icon: (cls?: string) => React.ReactNode }[] = [
  {
    title: "On-Site Digital X-Ray",
    body: "Immediate post-accident diagnosis so we can act on findings without delays.",
    icon: Icons.shield,
  },
  {
    title: "Oregon PIP Insurance Accepted",
    body: "No out-of-pocket delay — we bill your Personal Injury Protection directly.",
    icon: Icons.check,
  },
  {
    title: "Non-Surgical & Drug-Free",
    body: "Recovery options that help your body heal without surgery or opioids.",
    icon: Icons.leaf,
  },
  {
    title: "Same-Week Appointments",
    body: "Get seen quickly — early care after a crash protects your health and your claim.",
    icon: Icons.calendar,
  },
  {
    title: "9+ Years Serving Eugene, OR",
    body: "Trusted by thousands of local patients recovering after auto accidents.",
    icon: Icons.star,
  },
];

export default function AutoAccidentChiropractorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Auto Accident Chiropractor in Eugene, OR"
        subtitle="Expert chiropractic and regenerative care for car accident injuries — whiplash, back pain, neck pain, and soft tissue damage."
        badge="Auto Accident Recovery • Eugene, OR"
        image="/images/Auto-Injuri.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Auto Accident Chiropractor" },
        ]}
        ctas={[
          { label: "Call (541) 484-5777", href: "tel:+15414845777", variant: "call" },
          { label: "Request Appointment", href: "/appointments/", variant: "primary" },
          { label: "Contact Us", href: "/contact/", variant: "outline" },
        ]}
      />

      {/* Urgency intro */}
      <ServiceBody
        pill="Don't Wait After a Crash"
        pillIcon={Icons.clock("h-3.5 w-3.5")}
        headingLead="Car accident injuries don't always"
        headingAccent="show up right away."
        image="/images/Auto-Injuri.jpg"
        imageAlt="Auto accident chiropractic care in Eugene, OR at Absolute Wellness Center"
        ctaLabel="Request an Appointment"
        paragraphs={[
          "After a car accident, adrenaline and inflammation can mask serious injuries for hours or even days. Whiplash, soft tissue damage, and spinal misalignments often feel minor at first — then turn into chronic neck pain, headaches, and stiffness if they go untreated.",
          "That's why seeing a chiropractor within 72 hours of your accident is critical. Early evaluation and treatment dramatically lower your risk of long-term pain, and they create the documentation Oregon requires to support your insurance claim.",
          "In most cases there's no out-of-pocket cost. Oregon PIP (Personal Injury Protection) insurance is required on every auto policy and typically covers chiropractic care, physical therapy, and other treatment up to $15,000 — regardless of who caused the crash. Call (541) 484-5777 and we'll get you in this week.",
        ]}
        extra={
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "See a chiropractor within 72 hours",
              "Oregon PIP covers up to $15,000",
              "Same-week appointments available",
              "Non-surgical, drug-free recovery",
              "Whiplash, back, neck & headache care",
              "Documentation for your insurance claim",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm font-semibold text-gray-800"
              >
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {Icons.check("h-3 w-3")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        }
      />

      {/* Services for auto accident recovery */}
      <section className="relative overflow-hidden bg-[#f7f9f2] py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <Reveal>
              <SectionPill icon={Icons.shield("h-3.5 w-3.5")}>
                Auto Accident Treatments
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Complete care to{" "}
                <span style={{ color: BRAND }}>recover after a collision</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 font-[family-name:var(--font-lato)] text-base leading-7 text-gray-600">
                We combine chiropractic care and regenerative medicine to treat
                the full range of car accident injuries — addressing the cause
                of your pain, not just the symptoms.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#7E9146]/40 hover:shadow-md">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.12)",
                      color: BRAND,
                    }}
                    aria-hidden
                  >
                    {s.icon("h-5 w-5")}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-lg font-bold text-gray-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-lato)] text-sm leading-6 text-gray-600">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions framed around car accidents */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <Reveal>
              <SectionPill icon={Icons.cross("h-3.5 w-3.5")}>
                Car Accident Injuries
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Injuries we treat after a{" "}
                <span style={{ color: BRAND }}>car accident</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONDITIONS.map((c, i) => {
              const inner = (
                <>
                  <span
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.12)",
                      color: BRAND,
                    }}
                    aria-hidden
                  >
                    {c.icon("h-5 w-5")}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-raleway)] text-base font-bold text-gray-900 group-hover:text-[#5a6a30]">
                    {c.title}
                  </h3>
                  <p className="mt-2 font-[family-name:var(--font-lato)] text-sm leading-6 text-gray-600">
                    {c.body}
                  </p>
                </>
              );
              return (
                <Reveal key={c.title} delay={i * 0.05}>
                  {c.href ? (
                    <Link
                      href={c.href}
                      className="group flex h-full flex-col rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#7E9146]/40 hover:shadow-md"
                    >
                      {inner}
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#7E9146]">
                        Learn more
                        {Icons.arrow("h-4 w-4")}
                      </span>
                    </Link>
                  ) : (
                    <div className="group flex h-full flex-col rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#7E9146]/40 hover:shadow-md">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to expect timeline */}
      <ProcessTimeline
        pill="Your Recovery Path"
        heading="From crash to"
        accent="full recovery"
        steps={[
          { title: "Same-Week Visit", body: "Call us and we'll get you in this week — early care matters most after a crash.", icon: Icons.clock },
          { title: "Exam & Imaging", body: "Thorough evaluation and on-site digital X-ray if indicated, with full documentation.", icon: Icons.stetho },
          { title: "Active Treatment", body: "Chiropractic, decompression, injections, and rehab mapped to your injuries.", icon: Icons.hands },
          { title: "Insurance Handled", body: "We bill your Oregon PIP directly and coordinate records with your attorney.", icon: Icons.shield },
        ]}
      />

      {/* Why AWC */}
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
                Eugene&apos;s trusted choice for{" "}
                <span style={{ color: BRAND }}>auto accident recovery</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {WHY_POINTS.map((f, i) => (
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
                    {f.icon("h-5 w-5")}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-base font-bold text-gray-900">
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

      <ServiceFAQ faqs={FAQS} />

      <GreenCTABand
        heading="Eugene, OR: Don't wait after an accident."
        body="Early care protects your health and your claim. Call (541) 484-5777 or request an appointment online — same-week openings for auto accident patients."
      />
    </>
  );
}

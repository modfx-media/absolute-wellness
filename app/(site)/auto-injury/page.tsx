import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Icons, SectionPill } from "@/components/home/ui";
import {
  ServiceBody,
  HowWeHelp,
  RelatedServices,
  GreenCTABand,
  ProcessTimeline,
} from "@/components/ServiceSections";
import ServiceFAQ from "@/components/ServiceFAQ";
import {
  DriftingOrbs,
  CalendarGlow,
  MapPinPulse,
  AnimatedTickRow,
} from "@/components/MotionAccents";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

const TITLE = "Auto Injury Treatment in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Injured in a car accident? Absolute Wellness Center in Eugene, OR treats auto accident injuries including whiplash, back pain, and soft tissue damage. Oregon PIP insurance accepted. Call (541) 484-5777.";
const URL = "https://awceugene.com/auto-injury/";

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
    { name: "Auto Injury" },
  ],
});

/* ────────────────────────────────────────────────
   Friendly scheduling card — motion graphics + clear CTAs
   ──────────────────────────────────────────────── */
function ScheduleCard() {
  const trust = [
    { icon: Icons.clock, label: "Seen Today" },
    { icon: Icons.shield, label: "$0 Out-of-Pocket*" },
    { icon: Icons.check, label: "PIP Billed Direct" },
    { icon: Icons.user, label: "Attorney Coordination" },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] py-24">
      {/* gentle ambient motion */}
      <DriftingOrbs className="opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-white p-8 shadow-xl ring-1 ring-black/5 sm:p-12">
          {/* soft brand glow inside the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full opacity-[0.12] blur-3xl"
            style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
          />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            {/* LEFT — motion graphics column */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-6 -z-10 rounded-full opacity-50 blur-3xl"
                  style={{ background: `radial-gradient(circle, rgba(126,145,70,0.35) 0%, transparent 70%)` }}
                />
                {/* dark wrapper so CalendarGlow reads well on light bg */}
                <div
                  className="rounded-2xl p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #5a6a30 0%, #3d4a1f 100%)",
                  }}
                >
                  <div className="rounded-[14px] bg-[#0a0a0a] p-3">
                    <CalendarGlow size={260} />
                  </div>
                </div>
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-md ring-1 ring-black/5"
                  style={{ color: BRAND }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-flex h-2 w-2 rounded-full motion-safe:animate-pulse"
                      style={{ backgroundColor: BRAND }}
                    />
                    Availability Today
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <MapPinPulse size={56} />
                <div className="text-left">
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: BRAND }}
                  >
                    Eugene, OR
                  </div>
                  <div className="font-[family-name:var(--font-raleway)] text-base font-bold text-gray-900">
                    2286 Oakmont Way
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — copy + CTAs */}
            <div>
              <SectionPill icon={Icons.calendar("h-3.5 w-3.5")}>
                Schedule Same-Day
              </SectionPill>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-5xl">
                Booking takes{" "}
                <span style={{ color: BRAND }}>30 seconds.</span>
                <br />
                Healing starts today.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-gray-600">
                One quick call locks in your spot. We&apos;ll handle PIP
                billing, paperwork, and attorney coordination — you just show
                up and start feeling better.
              </p>

              {/* steps with animated ticks */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <AnimatedTickRow />
                <span
                  className="font-[family-name:var(--font-raleway)] text-sm font-bold tracking-wide"
                  style={{ color: "#3d4a1f" }}
                >
                  Call &nbsp;→&nbsp; Get Seen &nbsp;→&nbsp; We Bill PIP
                </span>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+15414845777"
                  className="group relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-5 font-[family-name:var(--font-raleway)] text-base font-black text-white shadow-[0_10px_30px_-12px_rgba(126,145,70,0.7)] transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: BRAND }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full opacity-50 motion-safe:animate-ping"
                    style={{ background: BRAND }}
                  />
                  {Icons.phone("h-5 w-5")}
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                      Tap To Call
                    </span>
                    <span>(541) 484-5777</span>
                  </span>
                </a>
                <Link
                  href="/appointments/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#7E9146] px-7 py-5 font-[family-name:var(--font-raleway)] text-base font-black text-[#7E9146] transition-colors hover:bg-[#7E9146] hover:text-white"
                >
                  Book Online
                  {Icons.arrow("h-5 w-5")}
                </Link>
              </div>

              {/* trust strip */}
              <ul className="mt-8 grid grid-cols-2 gap-3 border-t border-black/5 pt-6 sm:grid-cols-2">
                {trust.map((t) => (
                  <li
                    key={t.label}
                    className="flex items-center gap-2.5 text-sm font-semibold text-gray-800"
                  >
                    <span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: BRAND }}
                    >
                      {t.icon("h-3.5 w-3.5")}
                    </span>
                    {t.label}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                *Most Oregon auto-accident patients pay nothing out of pocket.
                Oregon PIP covers up to $15,000 in medical care regardless of
                fault.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   Sticky mobile call bar — always-visible scheduling CTA
   ──────────────────────────────────────────────── */
function StickyMobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <a
          href="tel:+15414845777"
          className="relative flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-black text-white"
          style={{ backgroundColor: BRAND }}
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full opacity-60 motion-safe:animate-ping"
            style={{ background: BRAND }}
          />
          {Icons.phone("h-4 w-4")}
          Call Now
        </a>
        <Link
          href="/appointments/"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#7E9146] bg-white px-4 py-3 text-sm font-black text-[#7E9146] transition-colors hover:bg-[#7E9146] hover:text-white"
        >
          {Icons.calendar("h-4 w-4")}
          Book Today
        </Link>
      </div>
    </div>
  );
}

export default function AutoInjuryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Auto Injury Treatment in Eugene, OR — Get Care TODAY."
        subtitle="Same-day auto injury appointments in Eugene, OR. Every hour you wait, injuries get harder to treat — call (541) 484-5777 right now and we'll get you in today."
        badge="Same-Day Appointments • Open Now"
        image="/images/Auto-Injuri.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Auto Injury" },
        ]}
        ctas={[
          { label: "Call (541) 484-5777", href: "tel:+15414845777", variant: "call" },
          { label: "Schedule Same-Day", href: "/appointments/", variant: "primary" },
          { label: "Contact Us", href: "/contact/", variant: "outline" },
        ]}
      />

      <ServiceBody
        pill="Auto Injury Care"
        pillIcon={Icons.shield("h-3.5 w-3.5")}
        headingLead="Don't Wait. Recovery Starts in the"
        headingAccent="First 72 Hours."
        image="/images/Auto-Injuri.jpg"
        imageAlt="Auto injury recovery and chiropractic care at Absolute Wellness Center in Eugene, OR"
        ctaLabel="Book My Same-Day Visit"
        paragraphs={[
          "Even a \"minor\" fender-bender can tear ligaments, jam joints, and inflame nerves. Skip treatment and a week-old injury can turn into months of headaches, neck pain, and disability. Research is clear: patients who start care within the first 72 hours recover faster and have far fewer long-term symptoms.",
          "We see auto-accident patients on the same day — no waiting weeks for an opening. Our team handles the chiropractic adjustments, soft-tissue therapy, and rehab from start to finish, so you focus on getting better while we handle the paperwork.",
          "Oregon PIP covers up to $15,000 of injury treatment regardless of fault. In most cases there's no out-of-pocket cost to you — we bill PIP directly and coordinate with your attorney if you have one. Call (541) 484-5777 right now and lock in a same-day appointment.",
        ]}
        extra={
          <>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Same-day appointments available",
              "We bill your PIP insurance directly",
              "Attorney & legal-team coordination",
              "Documented exam, imaging & care notes",
              "Whiplash, back, neck & headache care",
              "Treating crash injuries since 2017",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm font-semibold text-gray-800"
              >
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: "#7E9146" }}
                >
                  {Icons.check("h-3 w-3")}
                </span>
                {item}
              </li>
            ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-gray-600">
              <Link
                href="/auto-accident-chiropractor-eugene-or/"
                className="font-semibold text-[#7E9146] underline underline-offset-4 hover:text-[#5a6a30]"
              >
                Learn more about our auto accident chiropractic care in Eugene, OR
              </Link>
              .
            </p>
          </>
        }
      />

      <ScheduleCard />

      <HowWeHelp
        heading="What to Do"
        accent="Right Now"
        cards={[
          {
            icon: Icons.phone,
            title: "1. Call Today",
            body: "Phone (541) 484-5777 and ask for a same-day auto-injury visit. We'll get you in fast — even if symptoms feel minor.",
          },
          {
            icon: Icons.stetho,
            title: "2. Get Examined",
            body: "Full evaluation, on-site digital X-ray if needed, and a clear plan to address pain before it becomes chronic.",
          },
          {
            icon: Icons.shield,
            title: "3. We Handle the Rest",
            body: "Chiropractic, rehab, and soft-tissue care — plus direct billing to your PIP insurance and coordination with your attorney.",
          },
        ]}
      />

      <ProcessTimeline
        steps={[
          { title: "Same-Day Visit", body: "Call us and we'll get you in today — no waiting weeks for an evaluation.", icon: Icons.clock },
          { title: "Exam & Imaging", body: "Thorough exam, on-site digital X-ray if indicated, and full documentation of every finding.", icon: Icons.stetho },
          { title: "Active Treatment", body: "Chiropractic adjustments, soft-tissue therapy, and rehab exercises mapped to your injury.", icon: Icons.hands },
          { title: "Insurance & Legal", body: "We bill PIP directly and coordinate records with your attorney so you don't have to.", icon: Icons.shield },
        ]}
      />

      <RelatedServices currentHref="/auto-injury/" />

      <ServiceFAQ
        faqs={[
          { q: "Can I really get a same-day appointment?", a: "Yes. Call (541) 484-5777 and tell us you were in an accident — we hold time on the schedule for new auto-injury patients and will get you in as quickly as possible." },
          { q: "How soon should I be seen after a crash?", a: "As soon as possible — ideally within 72 hours. Many serious auto injuries don't show symptoms right away, and early treatment dramatically lowers your risk of chronic pain." },
          { q: "Will it cost me anything?", a: "In most Oregon auto-accident cases, no. Personal Injury Protection (PIP) is required on every Oregon auto policy and covers up to $15,000 of medical care regardless of who caused the crash. We bill your PIP carrier directly." },
          { q: "Do you work with attorneys?", a: "Yes. If you have an attorney, we coordinate exam findings, treatment notes, and billing records with their office. If you don't have one and need a referral, we can point you to attorneys we trust." },
          { q: "What if my pain didn't start until weeks later?", a: "Delayed-onset pain is extremely common after a crash — adrenaline and inflammation can mask injuries for days or weeks. Come in. We can still evaluate you and start care." },
          { q: "What injuries do you treat?", a: "Whiplash, neck and back pain, headaches, shoulder injuries, low-back strains, sciatica, soft-tissue injuries, and the chronic complications that follow untreated crashes." },
          { q: "Is auto injury chiropractic care covered by Oregon insurance?", a: "Oregon PIP coverage typically includes chiropractic and physical therapy for auto injuries. We work with most major insurance carriers." },
          { q: "What auto accident injuries do you treat in Eugene?", a: "We treat whiplash, back pain, neck pain, shoulder injuries, soft tissue damage, herniated discs, and headaches resulting from car accidents." },
        ]}
      />

      <GreenCTABand
        heading="Stop waiting. Start healing today."
        body="Same-day appointments. Direct PIP billing. Attorney coordination. Don't let one phone call be the difference between full recovery and chronic pain — call (541) 484-5777 right now."
      />

      <StickyMobileCallBar />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import {
  ConditionProse,
  RelatedConditions,
  ConditionCTABand,
  SignsGrid,
  TreatmentApproach,
  WhyAWC,
} from "@/components/ConditionSections";
import { buildPageGraph } from "@/lib/site-schema";

const TITLE = "Pain Relief in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Naturopathic pain relief in Eugene, OR. Effective treatment for chronic and acute pain without unwanted side effects. Absolute Wellness Center. Call (541) 484-5777.";
const URL = "https://awceugene.com/pain-relief/";

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
    { name: "Conditions", item: "https://awceugene.com/conditions/" },
    { name: "Pain Relief" },
  ],
});

export default function PainReliefPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Pain Relief"
        subtitle="Both chronic and acute pain can be effectively treated with naturopathic medicine."
        badge="Conditions"
        image="/images/woman-running-1920-web.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Conditions", href: "/conditions/" },
          { label: "Pain Relief" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/pain-relief/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            <Reveal>
              <SectionPill icon={Icons.check("h-3.5 w-3.5")}>Pain Relief</SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Pain <span style={{ color: "#7E9146" }}>Relief</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <ConditionProse>
                <p>
                  Pain relief is one of the top reasons that people seek medical
                  attention. Chronic pain is defined as pain lasting longer than
                  12 weeks and though conventional treatment options such as
                  medication and surgery can treat pain, they may come with
                  unwanted side effects and lengthy recovery periods.
                  Fortunately, both chronic and acute pain can be effectively
                  treated with naturopathic medicine.
                </p>
                <p className="mt-8">
                  <Link
                    href="/appointments/"
                    className="inline-flex items-center gap-2 rounded-full bg-[#7E9146] px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.02] hover:bg-[#5a6a30]"
                  >
                    Request an Appointment
                    {Icons.arrow("h-4 w-4")}
                  </Link>
                </p>
              </ConditionProse>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/images/woman-running-1920-web.jpg"
                alt="Pain relief"
                width={800}
                height={600}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#7E9146]/20 via-transparent to-transparent"
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-3xl"
              style={{ backgroundColor: "rgba(126,145,70,0.15)" }}
            />
          </Reveal>
        </div>
      </section>

      {/* [E] ENHANCEMENT — not on live site */}
      <SignsGrid
        pill="Is It Time?"
        heading="Signs you've waited"
        accent="long enough"
        intro="Pain that keeps returning is your body asking for a different approach. If you see yourself here, let's talk."
        items={[
          "Pain that limits daily activities",
          "Reliance on over-the-counter medication",
          "Sleep disrupted by aches or stiffness",
          "Pain that returns despite past treatments",
          "Reduced strength or flexibility",
          "Tension that builds throughout the day",
        ]}
      />

      {/* [F] ENHANCEMENT — not on live site */}
      <TreatmentApproach
        pill="Our Approach"
        heading="Pain relief that"
        accent="actually lasts"
        intro="Chiropractic, medical, and rehab care under one roof — so every treatment supports the next."
        steps={[
          { title: "Listen", body: "We start with a full history and exam to understand your pain — when it started, what makes it worse, and what you've already tried.", icon: Icons.user("h-6 w-6") },
          { title: "Combine", body: "Chiropractic, medical, physical therapy, and nutritional services work together to attack pain from every angle.", icon: Icons.hands("h-6 w-6") },
          { title: "Sustain", body: "We hand you the tools — exercises, posture habits, lifestyle changes — to keep pain from coming back.", icon: Icons.shield("h-6 w-6") },
        ]}
      />

      {/* [G] ENHANCEMENT — not on live site */}
      <WhyAWC condition="Chronic Pain" />

      {/* [C] ENHANCEMENT — not on live site */}
      <RelatedConditions
        hrefs={["/back-pain/", "/joint-pain/", "/neuropathy/"]}
      />

      {/* [D] ENHANCEMENT — not on live site */}
      <ConditionCTABand
        heading="Ready for Lasting Relief?"
        body="Call (541) 484-5777 or request an appointment online."
      />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
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

const TITLE = "Joint Pain in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Joint pain treatment in Eugene, OR — acute and chronic care for arthritis, dislocation, and inflammation at Absolute Wellness Center. Call (541) 484-5777.";
const URL = "https://awceugene.com/joint-pain/";

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
    { name: "Joint Pain" },
  ],
});

export default function JointPainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Joint Pain"
        subtitle="From acute injury to chronic arthritis — we treat the underlying cause, not just the symptoms."
        badge="Conditions"
        image="/images/knee-pain-4.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Conditions", href: "/conditions/" },
          { label: "Joint Pain" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/joint-pain/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            <Reveal>
              <SectionPill icon={Icons.hands("h-3.5 w-3.5")}>Joint Pain</SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Joint <span style={{ color: "#7E9146" }}>Pain</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <ConditionProse>
                <h3>What is the cause of joint pain?</h3>
                <p>
                  Acute joint pain is typically the result of an injury or
                  direct trauma while chronic joint pain can be caused by
                  rheumatoid arthritis or osteoarthritis. Chronic joint pain
                  can also develop as a result of an underlying medical
                  condition such as dislocation, infection, osteoporosis,
                  cancer, or fibromyalgia.
                </p>
              </ConditionProse>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/images/knee-pain-4.jpg"
                alt="Joint pain treatment"
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
              className="pointer-events-none absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-3xl"
              style={{ backgroundColor: "rgba(126,145,70,0.15)" }}
            />
          </Reveal>
        </div>
      </section>

      {/* [E] ENHANCEMENT — not on live site */}
      <SignsGrid
        pill="Common Signs"
        heading="What joint pain"
        accent="feels like"
        intro="Joint pain can creep in slowly or show up overnight. The sooner we identify what's driving it, the better your outcome."
        items={[
          "Morning stiffness that loosens with movement",
          "Aching after activity",
          "Swelling around a joint",
          "Reduced range of motion",
          "Grinding or crepitus",
          "Flare-ups during cold or damp weather",
        ]}
      />

      {/* [F] ENHANCEMENT — not on live site */}
      <TreatmentApproach
        pill="Our Approach"
        heading="How we calm pain"
        accent="and protect your joints"
        intro="Medical, chiropractic, and rehab care — coordinated for the long haul."
        steps={[
          { title: "Identify", body: "We pinpoint whether your pain is osteoarthritis, inflammatory, post-injury, or biomechanical — the right diagnosis drives the right treatment.", icon: Icons.stetho("h-6 w-6") },
          { title: "Relieve", body: "Joint and trigger-point injections, chiropractic adjustments, and physical therapy reduce pain and inflammation.", icon: Icons.hands("h-6 w-6") },
          { title: "Protect", body: "A long-term plan — movement, strength, and nutrition — keeps your joints comfortable for years to come.", icon: Icons.shield("h-6 w-6") },
        ]}
      />

      {/* [G] ENHANCEMENT — not on live site */}
      <WhyAWC condition="Joint Pain" />

      {/* [C] ENHANCEMENT — not on live site */}
      <RelatedConditions
        hrefs={["/knee-pain/", "/shoulder-pain/", "/pain-relief/"]}
      />

      {/* [D] ENHANCEMENT — not on live site */}
      <ConditionCTABand
        heading="Ready to Move Without Joint Pain?"
        body="Call (541) 484-5777 or request an appointment online."
      />
    </>
  );
}

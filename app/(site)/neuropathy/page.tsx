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

const TITLE = "Neuropathy in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Neuropathy treatment in Eugene, OR. Natural care for nerve damage, tingling, burning pain, and muscle spasms at Absolute Wellness Center. Call (541) 484-5777.";
const URL = "https://awceugene.com/neuropathy/";

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
    { name: "Neuropathy" },
  ],
});

export default function NeuropathyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Neuropathy"
        subtitle="Peripheral neuropathy affects over 20 million Americans — we offer natural treatment options."
        badge="Conditions"
        image="/images/neuropathy_img.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Conditions", href: "/conditions/" },
          { label: "Neuropathy" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/neuropathy/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            <Reveal>
              <SectionPill icon={Icons.spark("h-3.5 w-3.5")}>Neuropathy</SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Neuro<span style={{ color: "#7E9146" }}>pathy</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <ConditionProse>
                <p>
                  Neuropathy is a medical condition caused by damaged nerve
                  cells and often associated with autoimmune diseases,
                  infections, diabetes, tumors, or hereditary conditions.
                  Peripheral neuropathy currently affects over 20 million people
                  in the United States with symptoms ranging from tingling or
                  burning pain and nausea to muscle spasms, difficulty moving
                  your arms or legs, or atrophy.
                </p>
              </ConditionProse>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/images/neuropathy_img.jpg"
                alt="Neuropathy treatment"
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
        heading="What neuropathy"
        accent="feels like"
        intro="Nerve symptoms range from subtle to disruptive — and they tend to progress. Early support can make a meaningful difference."
        items={[
          "Burning, tingling, or 'pins and needles'",
          "Numbness in the feet or hands",
          "Sharp, electric-shock pains",
          "Loss of balance or coordination",
          "Weakness in the legs",
          "Sensitivity to touch or temperature",
        ]}
      />

      {/* [F] ENHANCEMENT — not on live site */}
      <TreatmentApproach
        pill="Our Approach"
        heading="How we support"
        accent="nerve health"
        intro="Medical evaluation, targeted therapies, and nutritional support working together."
        steps={[
          { title: "Investigate", body: "A neurological exam helps identify what's driving your nerve symptoms — diabetes, injury, chemotherapy, or other causes.", icon: Icons.stetho("h-6 w-6") },
          { title: "Treat", body: "Targeted therapies, nutritional IVs, and trigger-point injections address inflammation and support nerve health.", icon: Icons.drip("h-6 w-6") },
          { title: "Support", body: "Lifestyle, supplement, and rehab guidance help slow progression and improve daily function.", icon: Icons.shield("h-6 w-6") },
        ]}
      />

      {/* [G] ENHANCEMENT — not on live site */}
      <WhyAWC condition="Neuropathy" />

      {/* [C] ENHANCEMENT — not on live site */}
      <RelatedConditions
        hrefs={["/pain-relief/", "/back-pain/", "/hormonal-imbalance/"]}
      />

      {/* [D] ENHANCEMENT — not on live site */}
      <ConditionCTABand
        heading="Living With Neuropathy?"
        body="Call (541) 484-5777 or request an appointment online."
      />
    </>
  );
}

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

const TITLE = "Shoulder Pain in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Shoulder pain treatment in Eugene, OR — rotator cuff issues, limited range of motion, and chronic pain. Natural care at Absolute Wellness Center. (541) 484-5777.";
const URL = "https://awceugene.com/shoulder-pain/";

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
    { name: "Shoulder Pain" },
  ],
});

export default function ShoulderPainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Shoulder Pain"
        subtitle="A very common condition that affects almost half of the U.S. — limiting movement and daily life."
        badge="Conditions"
        image="/images/shoulder-pain-new-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Conditions", href: "/conditions/" },
          { label: "Shoulder Pain" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/shoulder-pain/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            <Reveal>
              <SectionPill icon={Icons.figure("h-3.5 w-3.5")}>Shoulder Pain</SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Shoulder <span style={{ color: "#7E9146" }}>Pain</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <ConditionProse>
                <p>
                  Shoulder pain is a very common condition and affects almost
                  half of the U.S. Most patients feel some sort of pain, limited
                  range of motion, an inability to engage in activities of daily
                  living (ADL) or something more serious as a permanent
                  disability.
                </p>
              </ConditionProse>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/images/shoulder-pain-new-1.jpg"
                alt="Shoulder pain treatment"
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
        pill="Common Signs"
        heading="What shoulder pain"
        accent="feels like"
        intro="Many shoulder problems actually start in the neck. A proper evaluation tells us where to focus so treatment actually sticks."
        items={[
          "Aching deep in the shoulder joint",
          "Pain reaching overhead or behind your back",
          "Weakness lifting everyday objects",
          "Stiffness in the morning",
          "Clicking or popping with movement",
          "Pain that disturbs your sleep",
        ]}
      />

      {/* [F] ENHANCEMENT — not on live site */}
      <TreatmentApproach
        pill="Our Approach"
        heading="How we restore your"
        accent="range of motion"
        intro="Medical, chiropractic, and rehab care working together — coordinated by one team."
        steps={[
          { title: "Diagnose", body: "We assess the rotator cuff, joint capsule, and surrounding spine to find the true source of your pain.", icon: Icons.stetho("h-6 w-6") },
          { title: "Treat", body: "Soft-tissue work, joint mobilization, and trigger-point or joint injections calm pain and restore movement.", icon: Icons.hands("h-6 w-6") },
          { title: "Strengthen", body: "Progressive physical therapy rebuilds rotator-cuff stability so you can lift, reach, and sleep comfortably again.", icon: Icons.figure("h-6 w-6") },
        ]}
      />

      {/* [G] ENHANCEMENT — not on live site */}
      <WhyAWC condition="Shoulder Pain" />

      {/* [C] ENHANCEMENT — not on live site */}
      <RelatedConditions
        hrefs={["/neck-pain/", "/joint-pain/", "/back-pain/"]}
      />

      {/* [D] ENHANCEMENT — not on live site */}
      <ConditionCTABand
        heading="Ready to Move Freely Again?"
        body="Call (541) 484-5777 or request an appointment online."
      />
    </>
  );
}

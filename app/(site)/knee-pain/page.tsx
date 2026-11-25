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

const TITLE = "Knee Pain in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Knee pain treatment in Eugene, OR. Individualized chiropractic care for wear-and-tear, osteoarthritis, and chronic knee pain at Absolute Wellness Center. (541) 484-5777.";
const URL = "https://awceugene.com/knee-pain/";

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
    { name: "Knee Pain" },
  ],
});

export default function KneePainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Knee Pain"
        subtitle="Reduce the symptoms and progression of osteoarthritis with our individualized chiropractic approach."
        badge="Conditions"
        image="/images/Knee-Pain-new.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Conditions", href: "/conditions/" },
          { label: "Knee Pain" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/knee-pain/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            <Reveal>
              <SectionPill icon={Icons.shield("h-3.5 w-3.5")}>Knee Pain</SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Knee <span style={{ color: "#7E9146" }}>Pain</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <ConditionProse>
                <p>
                  Knee pain is increasingly becoming a more common problem in
                  society. It is a complaint we see frequently. The most common
                  complaint associated with knee pain is considered the normal
                  &ldquo;wear and tear.&rdquo; Another ailment that affects the
                  knee is osteoarthritis. The symptoms and progression of
                  osteoarthritis and knee pain can be reduced through our
                  individualized approach to chiropractic care.
                </p>
              </ConditionProse>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/images/Knee-Pain-new.jpg"
                alt="Knee pain treatment"
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
        heading="What knee pain"
        accent="feels like"
        intro="Knee pain rarely starts at the knee — hips, ankles, and biomechanics all play a role. We treat the system, not just the symptom."
        items={[
          "Pain climbing or descending stairs",
          "Stiffness after sitting",
          "Swelling around the kneecap",
          "Catching or locking sensations",
          "Pain kneeling or squatting",
          "Buckling or giving way",
        ]}
      />

      {/* [F] ENHANCEMENT — not on live site */}
      <TreatmentApproach
        pill="Our Approach"
        heading="How we get you"
        accent="moving again"
        intro="A coordinated medical, chiropractic, and rehab plan tailored to your knee — and your life."
        steps={[
          { title: "Evaluate", body: "Functional exam and imaging clarify whether your pain is from arthritis, ligament strain, meniscus issues, or biomechanics above and below the knee.", icon: Icons.stetho("h-6 w-6") },
          { title: "Treat", body: "Joint injections, physical therapy, and chiropractic care address the pain — and the alignment issues that caused it.", icon: Icons.hands("h-6 w-6") },
          { title: "Rebuild", body: "A guided strengthening program restores stability so you can walk, run, and play without flare-ups.", icon: Icons.figure("h-6 w-6") },
        ]}
      />

      {/* [G] ENHANCEMENT — not on live site */}
      <WhyAWC condition="Knee Pain" />

      {/* [C] ENHANCEMENT — not on live site */}
      <RelatedConditions
        hrefs={["/joint-pain/", "/pain-relief/", "/back-pain/"]}
      />

      {/* [D] ENHANCEMENT — not on live site */}
      <ConditionCTABand
        heading="Ready to Walk Without Knee Pain?"
        body="Call (541) 484-5777 or request an appointment online."
      />
    </>
  );
}

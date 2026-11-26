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

const TITLE = "Back Pain in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Back pain treatment in Eugene, OR at Absolute Wellness Center. Natural relief for acute and chronic back pain, spinal conditions, and disc problems. Call (541) 484-5777.";
const URL = "https://awceugene.com/back-pain/";

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
    { name: "Back Pain" },
  ],
});

export default function BackPainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Back Pain"
        subtitle="One of the most common medical problems in the United States — and one we treat every day."
        badge="Conditions"
        image="/images/upper-and-lower-back-pain-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Conditions", href: "/conditions/" },
          { label: "Back Pain" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/back-pain/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            <Reveal>
              <SectionPill icon={Icons.spine("h-3.5 w-3.5")}>Back Pain</SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Back <span style={{ color: "#7E9146" }}>Pain</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <ConditionProse>
                <p>
                  Back pain is one of the most common medical problems in the
                  United States. It is the #1 reason for a doctor to write a
                  prescription for narcotics. Back pain can range from a dull,
                  constant ache to sudden, sharp pain. Sometimes it can come on
                  suddenly &ndash; from an accident, a fall, or lifting something
                  heavy, or it can develop slowly because of age-related
                  degenerative changes to the spine. In some cases, inflammatory
                  disorders or other medical conditions cause back pain.
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
                src="/images/upper-and-lower-back-pain-2.jpg"
                alt="Back pain treatment"
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
        heading="What back pain"
        accent="feels like"
        intro="Back pain shows up differently for every patient. If any of these sound familiar, it's time to get to the root cause instead of chasing symptoms."
        items={[
          "Dull, constant lower-back ache",
          "Sharp pain when lifting or bending",
          "Radiating pain into the hip or leg",
          "Stiffness after sitting or sleeping",
          "Muscle spasms in the lower back",
          "Numbness or tingling down the leg",
        ]}
      />

      {/* [F] ENHANCEMENT — not on live site */}
      <TreatmentApproach
        pill="Our Approach"
        heading="A clear path to"
        accent="lasting relief"
        intro="We combine medical and chiropractic care under one roof so every step of your recovery is coordinated."
        steps={[
          { title: "Evaluate", body: "A thorough exam — and on-site digital X-ray when indicated — pinpoints whether your pain is muscular, joint-related, or disc-related.", icon: Icons.stetho("h-6 w-6") },
          { title: "Treat", body: "Adjustments, spinal decompression, trigger-point therapy, and physical therapy combine to relieve pressure and calm inflamed tissues.", icon: Icons.hands("h-6 w-6") },
          { title: "Recover", body: "Targeted exercises, posture coaching, and lifestyle guidance help your spine stay strong long after pain is gone.", icon: Icons.shield("h-6 w-6") },
        ]}
      />

      {/* [G] ENHANCEMENT — not on live site */}
      <WhyAWC condition="Back Pain" />

      {/* [C] ENHANCEMENT — not on live site */}
      <RelatedConditions
        hrefs={["/neck-pain/", "/joint-pain/", "/whiplash/"]}
      />

      {/* [D] ENHANCEMENT — not on live site */}
      <ConditionCTABand
        heading="Ready to Find Back Pain Relief?"
        body="Call (541) 484-5777 or request an appointment online."
      />
    </>
  );
}

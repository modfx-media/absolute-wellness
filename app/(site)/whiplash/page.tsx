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

const TITLE = "Whiplash Treatment in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Suffering from whiplash after a car accident in Eugene, OR? Absolute Wellness Center provides expert chiropractic and regenerative treatment for whiplash injuries. Same-week appointments. (541) 484-5777.";
const URL = "https://awceugene.com/whiplash/";

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
    { name: "Whiplash" },
  ],
});

export default function WhiplashPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Whiplash"
        subtitle="One of the most common causes of neck pain — sudden, forced movement that injures the tissues supporting your head and neck."
        badge="Conditions"
        image="/images/whiplash.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Conditions", href: "/conditions/" },
          { label: "Whiplash" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/whiplash/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            <Reveal>
              <SectionPill icon={Icons.cross("h-3.5 w-3.5")}>Whiplash</SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Whip<span style={{ color: "#7E9146" }}>lash</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <ConditionProse>
                <p>
                  According to the American Chiropractic Association, one of the
                  most common causes of neck pain is whiplash resulting from a
                  car accident. A sudden forced movement of the head or neck in
                  any direction and the resulting &ldquo;rebound&rdquo; in the
                  opposite direction is known as whiplash. The sudden
                  &ldquo;whipping&rdquo; motion injures the surrounding and
                  supporting tissues of the neck and head. Muscles react by
                  tightening and contracting, creating muscle fatigue, which can
                  result in pain and stiffness. Severe whiplash can also be
                  associated with injury to the intervertebral joints, discs,
                  ligaments, muscles, and nerve roots.
                </p>
                <p>
                  Our Eugene, OR whiplash treatment combines gentle
                  chiropractic adjustments, soft-tissue therapy, and
                  regenerative care to address the root of your injury. Whether
                  you need auto accident whiplash Eugene care after a rear-end
                  collision or relief from a car accident neck injury Eugene OR
                  residents trust, our team documents every finding and builds a
                  recovery plan around you.{" "}
                  <Link
                    href="/auto-accident-chiropractor-eugene-or/"
                    className="font-semibold text-[#7E9146] underline underline-offset-4 hover:text-[#5a6a30]"
                  >
                    Comprehensive auto accident care in Eugene, OR
                  </Link>{" "}
                  is available for every crash-related injury.
                </p>
              </ConditionProse>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src="/images/whiplash.jpg"
                alt="Whiplash treatment"
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
        pill="After the Accident"
        heading="Symptoms that can"
        accent="surface days later"
        intro="Whiplash symptoms often don't appear immediately. Getting examined early — even if you feel fine — protects both your health and your claim."
        items={[
          "Neck pain and stiffness within 24 hours",
          "Headaches at the base of the skull",
          "Shoulder and upper-back tightness",
          "Dizziness or fatigue",
          "Tingling or numbness into the arms",
          "Trouble concentrating or sleeping",
        ]}
      />

      {/* [F] ENHANCEMENT — not on live site */}
      <TreatmentApproach
        pill="Our Approach"
        heading="From accident to"
        accent="full recovery"
        intro="We document your injuries, treat them, and coordinate with your attorney or insurance so you can focus on healing."
        steps={[
          { title: "Document", body: "A detailed exam and imaging document your injuries — critical for both your recovery and your insurance claim.", icon: Icons.stetho("h-6 w-6") },
          { title: "Treat", body: "Gentle adjustments, soft-tissue therapy, and rehab exercises reduce inflammation and restore healthy motion.", icon: Icons.hands("h-6 w-6") },
          { title: "Recover", body: "We track progress and coordinate with attorneys and providers until you're back to pre-accident function.", icon: Icons.shield("h-6 w-6") },
        ]}
      />

      {/* [G] ENHANCEMENT — not on live site */}
      <WhyAWC condition="Whiplash" />

      {/* [C] ENHANCEMENT — not on live site */}
      <RelatedConditions
        hrefs={["/neck-pain/", "/back-pain/", "/pain-relief/"]}
      />

      {/* [D] ENHANCEMENT — not on live site */}
      <ConditionCTABand
        heading="Recovering From an Auto Accident?"
        body="Call (541) 484-5777 or request an appointment online."
      />
    </>
  );
}

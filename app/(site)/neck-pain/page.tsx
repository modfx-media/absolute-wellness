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

const TITLE = "Neck Pain in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Neck pain treatment in Eugene, OR at Absolute Wellness Center. The cervical spine supports 12 lbs — we help restore healthy function. (541) 484-5777.";
const URL = "https://awceugene.com/neck-pain/";

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
    { name: "Neck Pain" },
  ],
});

export default function NeckPainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Neck Pain"
        subtitle="The cervical spine supports about 12 pounds — and its flexibility makes it vulnerable."
        badge="Conditions"
        image="/images/neckpain_img.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Conditions", href: "/conditions/" },
          { label: "Neck Pain" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/neck-pain/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div>
            <Reveal>
              <SectionPill icon={Icons.user("h-3.5 w-3.5")}>Neck Pain</SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Neck <span style={{ color: "#7E9146" }}>Pain</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <ConditionProse>
                <p>
                  The neck, also called the cervical spine, begins at the base of
                  the skull and contains seven small vertebrae. The cervical spine
                  supports the full weight of your head which is on average about
                  12 pounds. While the cervical spine can move your head in
                  nearly every direction, this flexibility makes the neck very
                  susceptible to pain and injury.
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
                src="/images/neckpain_img.jpg"
                alt="Neck pain treatment"
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
        heading="What neck pain"
        accent="feels like"
        intro="Neck pain can be quiet and nagging — or sharp and limiting. Either way, the right diagnosis is the first step to real relief."
        items={[
          "Tightness and stiffness across the upper traps",
          "Tension headaches at the base of the skull",
          "Sharp pain when turning your head",
          "Numbness or tingling into the arm or hand",
          "Pain after long hours at a desk or phone",
          "Reduced range of motion",
        ]}
      />

      {/* [F] ENHANCEMENT — not on live site */}
      <TreatmentApproach
        pill="Our Approach"
        heading="How we get your"
        accent="neck moving again"
        intro="Coordinated medical, chiropractic, and rehab care — all under one roof."
        steps={[
          { title: "Evaluate", body: "A focused cervical exam — and X-ray when warranted — identifies whether your pain is from joint dysfunction, muscle strain, or disc irritation.", icon: Icons.stetho("h-6 w-6") },
          { title: "Restore", body: "Gentle adjustments, trigger-point injections, and targeted physical therapy reduce nerve pressure and rebuild healthy motion.", icon: Icons.hands("h-6 w-6") },
          { title: "Prevent", body: "Posture retraining, ergonomic guidance, and home exercises keep your neck mobile so the pain doesn't return.", icon: Icons.shield("h-6 w-6") },
        ]}
      />

      {/* [G] ENHANCEMENT — not on live site */}
      <WhyAWC condition="Neck Pain" />

      {/* [C] ENHANCEMENT — not on live site */}
      <RelatedConditions
        hrefs={["/whiplash/", "/back-pain/", "/shoulder-pain/"]}
      />

      {/* [D] ENHANCEMENT — not on live site */}
      <ConditionCTABand
        heading="Ready to Relieve Your Neck Pain?"
        body="Call (541) 484-5777 or request an appointment online."
      />
    </>
  );
}

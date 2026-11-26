import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons } from "@/components/home/ui";
import {
  ServiceBody,
  HowWeHelp,
  RelatedServices,
  GreenCTABand,
  ProcessTimeline,
} from "@/components/ServiceSections";
import ServiceFAQ from "@/components/ServiceFAQ";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

const TITLE = "Nutritional IVs in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "IV therapy and nutritional IVs in Eugene, OR at Absolute Wellness Center. Fast delivery of vitamins and nutrients directly to the bloodstream. Call (541) 484-5777.";
const URL = "https://awceugene.com/nutritional-ivs/";

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
    { name: "Nutritional IVs" },
  ],
});

const benefits = [
  "Common skin problems",
  "Dehydration",
  "Stress",
  "Muscle soreness",
  "Common cold",
  "Low energy",
  "Excess weight",
];

export default function NutritionalIVsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Nutritional IVs"
        subtitle="Vitamins and nutrients delivered directly to your bloodstream — in as little as 15 minutes."
        badge="IV Therapy"
        image="/images/IV-Therapy-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Nutritional IVs" },
        ]}
      />

      <ServiceBody
        pill="Nutritional IVs"
        pillIcon={Icons.drip("h-3.5 w-3.5")}
        headingLead="Nutritional IVs in"
        headingAccent="Eugene, OR"
        image="/images/IV-Therapy-2.jpg"
        imageAlt="IV therapy session at Absolute Wellness Center"
        paragraphs={[
          "Nutritional IV therapy is a fast, effective way to give your body the vitamins and nutrients it needs to feel its best. We tailor every IV to the individual — from energy and immune support to recovery and skin health.",
          "The primary benefit of IV therapy is that it delivers the needed products directly to the bloodstream. Rather than waiting for nutrients to be absorbed through the digestive system, our patients can quickly receive them where the body will actually utilize them.",
          "Most therapies take between 15 and 30 minutes to administer — we even have some patients come in on their lunch breaks.",
        ]}
        extra={
          <div className="mt-8 rounded-2xl border border-[#e7ecd8] bg-[#f7f9f2] p-6">
            <p
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: BRAND }}
            >
              IV therapy may help with
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: BRAND }}
                    aria-hidden
                  >
                    {Icons.check("h-4 w-4")}
                  </span>
                  <span className="font-[family-name:var(--font-raleway)] text-sm font-semibold text-gray-900">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <HowWeHelp
        heading="What Makes Our IVs"
        accent="Different"
        cards={[
          {
            icon: Icons.drip,
            title: "Direct to Bloodstream",
            body: "Bypass the digestive system so nutrients reach your cells right away.",
          },
          {
            icon: Icons.clock,
            title: "15–30 Min Sessions",
            body: "Quick enough to fit on a lunch break, restorative enough to feel the difference.",
          },
          {
            icon: Icons.user,
            title: "Custom Treatment Plans",
            body: "Formulas adapted to your goals — energy, immunity, recovery, hydration, and more.",
          },
        ]}
      />

      <ProcessTimeline
        steps={[
          { title: "Wellness Consult", body: "We review your goals — energy, recovery, immunity or weight — to design your formula.", icon: Icons.stetho },
          { title: "Custom Formula", body: "Your IV is blended with the vitamins, minerals and amino acids your body needs.", icon: Icons.drip },
          { title: "15–30 Min Infusion", body: "Relax in a comfortable chair while the nutrients absorb directly into your bloodstream.", icon: Icons.clock },
          { title: "Reassess & Repeat", body: "Many patients return weekly or monthly to support ongoing wellness goals.", icon: Icons.leaf },
        ]}
      />

      <RelatedServices currentHref="/nutritional-ivs/" />

      <ServiceFAQ
        faqs={[
          { q: "What's in a nutritional IV?", a: "A custom blend of vitamins, minerals, amino acids, and antioxidants — designed around your specific wellness goals." },
          { q: "Is IV therapy safe?", a: "Yes — every infusion is administered by our trained medical staff in a comfortable clinical setting." },
          { q: "How often should I get an IV?", a: "It depends on your goals. Some patients come weekly for energy support, others monthly for general wellness." },
          { q: "How long does each session take?", a: "Most infusions take 15 to 30 minutes." },
        ]}
      />

      <GreenCTABand
        heading="Recharge with a nutritional IV."
        body="Stop in for an IV that fits your schedule and your wellness goals."
      />
    </>
  );
}

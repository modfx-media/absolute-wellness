import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
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

const TITLE = "Chiropractic Care in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Chiropractic care in Eugene, OR at Absolute Wellness Center. Correcting misalignments, improving spinal health, and reducing pain naturally. Call (541) 484-5777.";
const URL = "https://awceugene.com/chiropractic-care/";

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
    { name: "Chiropractic Care" },
  ],
});

export default function ChiropracticCarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Chiropractic Care"
        subtitle="Drug-free care to correct misalignments and keep your body working harmoniously."
        badge="Chiropractic"
        image="/images/chiropracticcare_img-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Chiropractic Care" },
        ]}
      />

      <ServiceBody
        pill="Chiropractic Care"
        pillIcon={Icons.hands("h-3.5 w-3.5")}
        headingLead="Chiropractic Care in"
        headingAccent="Eugene, OR"
        image="/images/chiropracticcare_img-2.jpg"
        imageAlt="Chiropractic adjustment at Absolute Wellness Center in Eugene"
        paragraphs={[
          "We specialize in correcting your body's misalignments. Our goal is to ensure that your spine and the rest of your body are working harmoniously.",
          "To do so, we will help you develop a plan that will require light stretching, some exercise, chiropractic care, and a healthy diet.",
        ]}
      />

      <HowWeHelp
        heading="How Chiropractic Care"
        accent="Can Help"
        cards={[
          {
            icon: Icons.spine,
            title: "Spinal Alignment",
            body: "Gentle adjustments correct the misalignments that drive pain and dysfunction.",
          },
          {
            icon: Icons.leaf,
            title: "Drug-Free",
            body: "A natural approach to pain relief — no medication, no surgery, no downtime.",
          },
          {
            icon: Icons.shield,
            title: "Whole-Body Health",
            body: "Plans that combine adjustments, stretching, exercise, and nutrition.",
          },
        ]}
      />

      <ProcessTimeline
        steps={[
          { title: "Spinal & Postural Exam", body: "We assess alignment, posture and movement to find what's out of balance.", icon: Icons.stetho },
          { title: "Custom Care Plan", body: "You receive a treatment plan tailored to your goals and pain points.", icon: Icons.shield },
          { title: "Gentle Adjustments", body: "Precise, low-force adjustments restore alignment and function.", icon: Icons.hands },
          { title: "Lifestyle & Movement", body: "Stretching, exercise and nutrition guidance keep your results lasting.", icon: Icons.leaf },
        ]}
      />

      <RelatedServices currentHref="/chiropractic-care/" />

      <ServiceFAQ
        faqs={[
          { q: "Is chiropractic care safe?", a: "Yes — chiropractic adjustments are an established, safe approach to musculoskeletal care." },
          { q: "Do adjustments hurt?", a: "No. Most patients feel immediate relief or a sense of release after an adjustment." },
          { q: "How often will I need visits?", a: "Initial care is often more frequent, then we taper to maintenance based on your goals." },
          { q: "Will my insurance cover it?", a: "We accept many insurance plans — call our office and we'll verify your coverage." },
        ]}
      />

      <GreenCTABand
        heading="Move better. Feel better."
        body="Book a chiropractic visit and let us help your body work in harmony again."
      />
    </>
  );
}

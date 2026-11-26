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

const TITLE = "Spinal Decompression in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Non-invasive spinal decompression therapy in Eugene, OR at Absolute Wellness Center. Relief for chronic back pain, bulging discs, and spinal pressure. Call (541) 484-5777.";
const URL = "https://awceugene.com/spinal-decompression/";

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
    { name: "Spinal Decompression" },
  ],
});

export default function SpinalDecompressionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Spinal Decompression"
        subtitle="A non-invasive procedure that gently relieves pressure on the spine."
        badge="Back Pain Relief"
        image="/images/spinaldecompression_img-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Spinal Decompression" },
        ]}
      />

      <ServiceBody
        pill="Spinal Decompression"
        pillIcon={Icons.spine("h-3.5 w-3.5")}
        headingLead="Spinal Decompression in"
        headingAccent="Eugene, OR"
        image="/images/spinaldecompression_img-1.jpg"
        imageAlt="Spinal decompression therapy at Absolute Wellness Center in Eugene"
        paragraphs={[
          "Spinal decompression is a non-invasive mechanical procedure performed within our office to help alleviate back pain. It involves gently stretching the spine to take pressure off the spinal discs — the cushions that separate the vertebrae in the spine.",
          "By relieving this pressure, bulging discs can retract back into place, which takes pressure off the nerves in the spine. Decompressing the spine also permits water, oxygen and other fluids to work their way back into the discs, allowing them to heal naturally.",
          "Spinal decompression is an excellent option for anyone with chronic back pain who wants to get back to living a pain-free life as quickly as possible.",
        ]}
      />

      <HowWeHelp
        heading="How Spinal Decompression"
        accent="Can Help"
        cards={[
          {
            icon: Icons.shield,
            title: "Non-Invasive",
            body: "A gentle, in-office mechanical procedure — no surgery, no downtime.",
          },
          {
            icon: Icons.spine,
            title: "Disc Relief",
            body: "Reduces pressure on bulging or compressed discs so they can retract into place.",
          },
          {
            icon: Icons.leaf,
            title: "Natural Healing",
            body: "Restores water and oxygen flow to spinal discs, supporting your body's own repair.",
          },
        ]}
      />

      <ProcessTimeline
        steps={[
          { title: "Spine Exam", body: "A focused exam and review of your imaging confirms decompression is appropriate.", icon: Icons.stetho },
          { title: "Custom Setup", body: "Each session is set up to match your body and the segment we're targeting.", icon: Icons.shield },
          { title: "Gentle Sessions", body: "Sessions last 15–30 minutes — most patients describe them as deeply relaxing.", icon: Icons.clock },
          { title: "Recovery Support", body: "Stretches, posture work and lifestyle guidance reinforce your results.", icon: Icons.figure },
        ]}
      />

      <RelatedServices currentHref="/spinal-decompression/" />

      <ServiceFAQ
        faqs={[
          { q: "Is spinal decompression painful?", a: "No. Most patients describe it as a gentle stretch — many even relax or fall asleep during a session." },
          { q: "How long does each session last?", a: "Typically 15 to 30 minutes. A full course of care usually spans several weeks." },
          { q: "What conditions benefit from spinal decompression?", a: "Herniated and bulging discs, sciatica, degenerative disc disease, and chronic low back or neck pain." },
          { q: "How soon will I feel relief?", a: "Many patients notice meaningful relief within the first few sessions, with continued improvement over a complete plan." },
        ]}
      />

      <GreenCTABand
        heading="Find lasting relief from back pain."
        body="Ask our team in Eugene whether spinal decompression is a fit for your condition."
      />
    </>
  );
}

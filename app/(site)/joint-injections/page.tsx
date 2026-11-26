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

const TITLE = "Joint Injections in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Absolute Wellness Center offers joint injections for joint pain relief in Eugene, OR. Non-surgical treatment for wrists, knees, hips, and shoulders. Call (541) 484-5777.";
const URL = "https://awceugene.com/joint-injections/";

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
    { name: "Joint Injections" },
  ],
});

export default function JointInjectionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Joint Injections"
        subtitle="Non-surgical relief for joint pain in the wrists, knees, hips, and shoulders."
        badge="Joint Pain Relief"
        image="/images/man-running.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Joint Injections" },
        ]}
      />

      <ServiceBody
        pill="Joint Injections"
        pillIcon={Icons.syringe("h-3.5 w-3.5")}
        headingLead="Joint Injections in"
        headingAccent="Eugene, OR"
        image="/images/man-running.jpg"
        imageAlt="Active patient enjoying mobility after joint injection therapy"
        paragraphs={[
          "At Absolute Wellness Center, we offer joint injections to those patients struggling with joint pain.",
          "Joint pain can occur in any joint of the body, but most patients who experience joint pain tend to feel it in certain areas such as the wrists, knees, hips, or shoulders. Acute joint pain is typically the result of an injury or direct trauma while chronic joint pain can be caused by rheumatoid arthritis or osteoarthritis.",
          "Persistent and/or severe pain that prohibits your ability to complete everyday tasks should be evaluated by a doctor. If you notice redness, joint deformity, swelling, or reduced range of motion, it is time to schedule an appointment.",
          "If over-the-counter medications and physical therapy prove unable to relieve your pain, we may then proceed with another method of treatment such as joint injections. This non-surgical treatment option can not only help you experience pain relief, but can also provide increased range of motion which can also aid in making physical therapy more comfortable.",
        ]}
      />

      <HowWeHelp
        heading="How Joint Injections"
        accent="Can Help"
        cards={[
          {
            icon: Icons.shield,
            title: "Non-Surgical",
            body: "A safe, in-office alternative to invasive joint surgery for ongoing or recurring pain.",
          },
          {
            icon: Icons.leaf,
            title: "Pain Relief",
            body: "Targeted relief that reduces inflammation and discomfort at the source.",
          },
          {
            icon: Icons.figure,
            title: "Increased Mobility",
            body: "Restored range of motion so you can move comfortably and get more from physical therapy.",
          },
        ]}
      />

      <ProcessTimeline
        steps={[
          { title: "Consultation", body: "We review your history, imaging and symptoms to confirm joint injections are the right fit.", icon: Icons.user },
          { title: "Targeted Diagnosis", body: "Our provider identifies the exact joint and structure driving your pain.", icon: Icons.stetho },
          { title: "Precision Injection", body: "Medication is delivered directly into the joint to calm inflammation at the source.", icon: Icons.syringe },
          { title: "Recovery Plan", body: "We pair injections with rehab and reassess your progress at every visit.", icon: Icons.shield },
        ]}
      />

      <RelatedServices currentHref="/joint-injections/" />

      <ServiceFAQ
        faqs={[
          { q: "What conditions do joint injections treat?", a: "Joint injections are used for arthritis, bursitis, tendonitis and other inflammatory joint conditions in the knee, shoulder, hip, ankle, wrist and more." },
          { q: "Do joint injections hurt?", a: "Most patients feel only mild pressure. We use a local anesthetic and small-gauge needles to keep the procedure as comfortable as possible." },
          { q: "How long does relief last?", a: "Many patients experience significant relief lasting weeks to months. Plans often combine injections with physical therapy for longer-lasting results." },
          { q: "How soon will I feel results?", a: "Some patients notice relief within hours. Corticosteroid effects typically take 24–72 hours to take full effect." },
        ]}
      />

      <GreenCTABand
        heading="Stop letting joint pain hold you back."
        body="Schedule a consultation and learn whether joint injections are right for you."
      />
    </>
  );
}

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

const TITLE =
  "Trigger Point Injections in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Trigger point injections for fibromyalgia, tension headaches, and muscle pain in Eugene, OR. Safe, effective relief at Absolute Wellness Center. (541) 484-5777.";
const URL = "https://awceugene.com/trigger-point-injections/";

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
    { name: "Trigger Point Injections" },
  ],
});

export default function TriggerPointInjectionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Trigger Point Injections"
        subtitle="Targeted relief for fibromyalgia, tension headaches, and muscle pain."
        badge="Pain Injections"
        image="/images/knee-pain-1-2-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Trigger Point Injections" },
        ]}
      />

      <ServiceBody
        pill="Trigger Point Injections"
        pillIcon={Icons.syringe("h-3.5 w-3.5")}
        headingLead="Trigger Point Injections in"
        headingAccent="Eugene, OR"
        image="/images/knee-pain-1-2-1.jpg"
        imageAlt="Trigger point injection therapy at Absolute Wellness Center"
        paragraphs={[
          "Here at Absolute Wellness Center, we are proud to offer trigger point injections for patients struggling with fibromyalgia, tension headaches, myofascial pain, and muscle pain in the arms, legs, lower back and neck.",
          "During your appointment, we will locate the area where you are experiencing pain and inject small amounts of anesthetic to help alleviate your symptoms.",
          "This procedure is safe and the risk of possible complications is very low. You may experience soreness or numbness at the injection site for a temporary period of time. While you should avoid strenuous activity for a few days, you should be able to actively use your muscles immediately following treatment.",
          "For more information or to request an appointment, contact us today at (541) 484-5777.",
        ]}
      />

      <HowWeHelp
        heading="How Trigger Point Injections"
        accent="Can Help"
        cards={[
          {
            icon: Icons.spark,
            title: "Fibromyalgia Relief",
            body: "Calm widespread tender points and reduce day-to-day fibromyalgia pain.",
          },
          {
            icon: Icons.shield,
            title: "Tension Headaches",
            body: "Release the tight muscle bands in the neck and shoulders that drive headaches.",
          },
          {
            icon: Icons.hands,
            title: "Muscle Pain",
            body: "Effective for myofascial pain in the arms, legs, lower back, and neck.",
          },
        ]}
      />

      <ProcessTimeline
        steps={[
          { title: "Tender Point Mapping", body: "Our provider pinpoints the muscular knots driving your pain.", icon: Icons.user },
          { title: "Targeted Injection", body: "A small injection releases the tight band and resets the muscle.", icon: Icons.syringe },
          { title: "Stretch & Release", body: "Gentle stretching and soft-tissue work follow to reinforce the release.", icon: Icons.hands },
          { title: "Follow-Up Plan", body: "We pair injections with PT or movement work so the relief lasts.", icon: Icons.shield },
        ]}
      />

      <RelatedServices currentHref="/trigger-point-injections/" />

      <ServiceFAQ
        faqs={[
          { q: "What is a trigger point?", a: "A tight knot in a muscle that can cause localized or referred pain — often felt in the neck, shoulders, or back." },
          { q: "Do trigger point injections hurt?", a: "Most patients feel a quick pinch followed by immediate relief. A local anesthetic minimizes discomfort." },
          { q: "What conditions do they treat?", a: "Fibromyalgia, tension headaches, myofascial pain syndrome, and chronic muscular pain." },
          { q: "How fast do they work?", a: "Many patients feel relief within minutes, with continued improvement over the next few days." },
        ]}
      />

      <GreenCTABand
        heading="Relief from chronic muscle pain is possible."
        body="Schedule a trigger point injection consultation in Eugene today."
      />
    </>
  );
}

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

const TITLE = "Physical Therapy in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Physical therapy and therapeutic exercise at Absolute Wellness Center in Eugene, OR. Injury rehab, mobility, balance, and pain relief. Call (541) 484-5777.";
const URL = "https://awceugene.com/physical-therapy/";

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
    { name: "Physical Therapy" },
  ],
});

export default function PhysicalTherapyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Physical Therapy"
        subtitle="Therapeutic exercise and injury rehabilitation tailored to your recovery goals."
        badge="Physical Therapy"
        image="/images/physical-therapy-9-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Physical Therapy" },
        ]}
      />

      <ServiceBody
        pill="Therapeutic Exercise"
        pillIcon={Icons.figure("h-3.5 w-3.5")}
        headingLead="Physical Therapy in"
        headingAccent="Eugene, OR"
        image="/images/physical-therapy-9-1.jpg"
        imageAlt="Patient working with a physical therapist on rehabilitation exercises"
        paragraphs={[
          "Here at Absolute Wellness Center, we specialize in helping you receive the proper care after a personal injury, auto accident or fall. Our staff is devoted to helping you obtain the most comprehensive treatments and the care you deserve.",
          "If you have recently been injured in an accident or suffered any other kind of personal injury, you may be eligible to receive injury rehabilitation in the form of physical therapy.",
          "Physical therapy has many important health benefits. It not only reduces and eliminates pain, but many therapies and technologies can stop pain from recurring. Physical therapy has been known in some cases to even help prevent surgery, and has contributed to the recovery from sports injuries and strokes. If you are having trouble standing, walking or moving — no matter your age — physical therapy can help improve your mobility, improve your balance and prevent falls.",
          "Physical therapists can perform specific exercises that quickly restore proper vestibular functioning, and reduce and eliminate symptoms of dizziness or vertigo. In addition to the numerous physical health benefits, physical therapy also aids in the management of women's health concerns such as pregnancy and postpartum care. For pulmonary problems, physical therapy can improve quality of life through strengthening, conditioning and breathing exercises, and help patients clear fluid in the lungs.",
          "From improving mobility to creating a treatment plan after an injury, we are here to help make your recovery and everyday activities easier.",
        ]}
      />

      <HowWeHelp
        heading="How Physical Therapy"
        accent="Can Help"
        cards={[
          {
            icon: Icons.cross,
            title: "Pain Elimination",
            body: "Reduce — and stop — recurring pain through targeted exercises and proven therapies.",
          },
          {
            icon: Icons.shield,
            title: "Injury Recovery",
            body: "Comprehensive rehabilitation after personal injuries, auto accidents, and sports injuries.",
          },
          {
            icon: Icons.figure,
            title: "Improved Mobility",
            body: "Restore balance, prevent falls, and move with confidence at every stage of life.",
          },
        ]}
      />

      <ProcessTimeline
        steps={[
          { title: "Movement Assessment", body: "We evaluate strength, mobility and movement patterns to pinpoint the root cause.", icon: Icons.figure },
          { title: "Personalized Plan", body: "You receive a custom plan built around your goals, lifestyle and recovery timeline.", icon: Icons.clock },
          { title: "Hands-On Therapy", body: "Sessions combine manual therapy, targeted exercises and patient education.", icon: Icons.hands },
          { title: "Progress Tracking", body: "We reassess regularly and adjust your plan so every session moves you forward.", icon: Icons.shield },
        ]}
      />

      <RelatedServices currentHref="/physical-therapy/" />

      <ServiceFAQ
        faqs={[
          { q: "Do I need a referral for physical therapy?", a: "In Oregon you can typically see a physical therapist directly. We'll let you know if a referral is needed for your insurance." },
          { q: "How many sessions will I need?", a: "Most patients see meaningful change in 6–12 sessions. We re-evaluate regularly and adjust to your progress." },
          { q: "Will PT help if surgery has been recommended?", a: "Often yes — many patients avoid surgery entirely with a focused physical therapy program." },
          { q: "Can physical therapy help with chronic pain?", a: "Yes. Targeted strength, mobility, and movement re-education are foundational tools for managing chronic pain." },
        ]}
      />

      <GreenCTABand
        heading="Start your recovery in Eugene, OR."
        body="Speak with our team about a physical therapy plan built around your injury and goals."
      />
    </>
  );
}

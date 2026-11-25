import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import {
  ServiceBody,
  RelatedServices,
  GreenCTABand,
  ProcessTimeline,
} from "@/components/ServiceSections";
import ServiceFAQ from "@/components/ServiceFAQ";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

const TITLE = "Medical Weight Loss in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Medical weight loss programs in Eugene, OR including semaglutide (Wegovy/Ozempic), phentermine, and more at Absolute Wellness Center. Call (541) 484-5777.";
const URL = "https://awceugene.com/medical-weight-loss/";

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
    { name: "Medical Weight Loss" },
  ],
});

type Med = {
  n: string;
  name: string;
  pct: string;
  body: string;
  star?: boolean;
};

const meds: Med[] = [
  {
    n: "01",
    name: "Contrave",
    pct: "4–6% body weight loss",
    body: "Combination therapy that helps reduce appetite and curb cravings.",
  },
  {
    n: "02",
    name: "Phentermine",
    pct: "4–6% body weight loss",
    body: "A well-established appetite suppressant used for short-term support.",
  },
  {
    n: "03",
    name: "Topiramate",
    pct: "4–6% body weight loss",
    body: "Often paired with other therapies to improve appetite control.",
  },
  {
    n: "04",
    name: "Semaglutide",
    pct: "15–20% body weight loss",
    body: "Our preferred GLP-1 option (Wegovy / Ozempic) — significant, sustained results.",
    star: true,
  },
  {
    n: "05",
    name: "Lipolean",
    pct: "Natural vitamin approach",
    body: "A vitamin-based injection that supports metabolism and energy.",
  },
];

export default function MedicalWeightLossPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Medical Weight Loss"
        subtitle="A doctor-supervised plan — including semaglutide — built around your body and goals."
        badge="Weight Loss"
        image="/images/weightloss_img.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Medical Weight Loss" },
        ]}
      />

      <ServiceBody
        pill="Medical Weight Loss"
        pillIcon={Icons.scale("h-3.5 w-3.5")}
        headingLead="Medical Weight Loss in"
        headingAccent="Eugene, OR"
        image="/images/weightloss_img.jpg"
        imageAlt="Medical weight loss program at Absolute Wellness Center in Eugene"
        paragraphs={[
          "Weight loss is a process that is definitely easier said than done. So often, people hear from their medical providers, \"You should probably lose a little weight — it will be good for you.\" The advice is correct, but there usually isn't a plan that comes with it.",
          "Diet and exercise is typically the recommended advice. This can be challenging — people may have so much weight to lose that they cannot exercise very long, or they have joint pain that prohibits them from exercising. Diet can be very confusing too. There is so much information out there that it can leave a person feeling overwhelmed.",
          "At Absolute Wellness Center, we provide a medically supervised plan that pairs the right medication with practical guidance, so you can lose weight safely and keep it off.",
        ]}
      />

      {/* SECTION 3 — 5 Medication Options grid (dark) */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.spark("h-3.5 w-3.5")} inverted>
                Medication Options
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
                5 Medication{" "}
                <span style={{ color: BRAND }}>Options</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-300">
                We&apos;ll review your history and goals together to choose the
                medication best suited to you.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {meds.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 0.06}>
                <div
                  className={`group relative h-full rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                    m.star
                      ? "bg-[#111]"
                      : "bg-[#111] hover:bg-[#161616]"
                  }`}
                  style={
                    m.star
                      ? {
                          border: `2px solid ${BRAND}`,
                          boxShadow: `0 20px 50px -20px ${BRAND}66`,
                        }
                      : { border: "1px solid rgba(255,255,255,0.06)" }
                  }
                >
                  {m.star && (
                    <span
                      className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                      style={{ backgroundColor: BRAND }}
                    >
                      {Icons.star("h-3 w-3")}
                      Preferred
                    </span>
                  )}
                  <span
                    className="font-[family-name:var(--font-raleway)] text-4xl font-black"
                    style={{ color: BRAND }}
                  >
                    {m.n}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-raleway)] text-xl font-bold text-white">
                    {m.name}
                  </h3>
                  <p
                    className="mt-1 text-xs font-bold uppercase tracking-[0.16em]"
                    style={{ color: BRAND }}
                  >
                    {m.pct}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {m.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline
        steps={[
          { title: "Health Evaluation", body: "We review your medical history, labs and goals to ensure your plan is safe and effective.", icon: Icons.stetho },
          { title: "Personalized Medication", body: "Your provider selects the right GLP-1 or non-GLP medication for your profile.", icon: Icons.syringe },
          { title: "Lifestyle Coaching", body: "Nutrition and movement guidance amplify your results and protect lean mass.", icon: Icons.leaf },
          { title: "Ongoing Monitoring", body: "Regular check-ins, lab reviews and dose adjustments keep your plan on track.", icon: Icons.clock },
        ]}
      />

      <RelatedServices currentHref="/medical-weight-loss/" />

      <ServiceFAQ
        faqs={[
          { q: "Which medications do you prescribe?", a: "We offer Semaglutide (our preferred GLP-1), Tirzepatide, Phentermine, Topiramate, and Metformin — chosen based on your health profile." },
          { q: "Is medical weight loss safe?", a: "Yes — every plan is supervised by our provider with regular check-ins, lab monitoring, and dose adjustments." },
          { q: "How much weight can I expect to lose?", a: "GLP-1 patients commonly see 10–20% of body weight reduction over 6–12 months when combined with lifestyle changes." },
          { q: "Are the injections painful?", a: "No. The injections use very small needles and most patients describe them as nearly painless." },
        ]}
      />

      <GreenCTABand
        heading="A weight-loss plan that actually fits your life."
        body="Call our team in Eugene and we'll walk you through your medication options."
      />
    </>
  );
}

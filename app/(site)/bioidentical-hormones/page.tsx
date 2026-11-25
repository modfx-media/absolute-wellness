import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
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

const TITLE = "Bioidentical Hormones in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Bioidentical Hormone Replacement Therapy (BHRT) in Eugene, OR for men and women. Treats menopause, low libido, fatigue, and more. Call (541) 484-5777.";
const URL = "https://awceugene.com/bioidentical-hormones/";

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
    { name: "Bioidentical Hormones" },
  ],
});

const conditions: { label: string; icon: (cls?: string) => React.ReactNode }[] = [
  { label: "Mental clarity",              icon: Icons.spark   },
  { label: "Low sex drive",               icon: Icons.leaf    },
  { label: "Incontinence",                icon: Icons.shield  },
  { label: "Anxiety",                     icon: Icons.spark   },
  { label: "Depression",                  icon: Icons.user    },
  { label: "Andropause",                  icon: Icons.user    },
  { label: "Fatigue",                     icon: Icons.clock   },
  { label: "Erectile dysfunction",        icon: Icons.shield  },
  { label: "Insulin resistance",          icon: Icons.scale   },
  { label: "Adrenal & thyroid disorders", icon: Icons.stetho  },
  { label: "Osteoporosis",                icon: Icons.spine   },
  { label: "Fibromyalgia",                icon: Icons.hands   },
];

const delivery = ["Creams", "Patches", "Gels", "Injections"];

export default function BioidenticalHormonesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Bioidentical Hormones"
        subtitle="BHRT for men and women — restore balance, energy, and vitality."
        badge="Hormone Therapy"
        image="/images/chiropracticcare_img-1-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: "Bioidentical Hormones" },
        ]}
      />

      <ServiceBody
        pill="Bioidentical Hormones"
        pillIcon={Icons.leaf("h-3.5 w-3.5")}
        headingLead="Bioidentical Hormones in"
        headingAccent="Eugene, OR"
        image="/images/chiropracticcare_img-1-2.jpg"
        imageAlt="Bioidentical hormone replacement therapy consultation in Eugene"
        paragraphs={[
          "Bioidentical Hormone Replacement Therapy (BHRT) is used to treat both men and women experiencing imbalances or drops in their naturally-occurring hormones. Hormones are responsible for most of your essential bodily functions, so when they are disrupted in any way, cascade effects across all your systems can ensue.",
          "Bioidentical hormones are designed to be chemically identical to those your body produces on its own. That allows us to restore your levels gently and effectively — without the side-effect profile of synthetic alternatives.",
          "Whether you are navigating perimenopause, menopause, andropause, or unexplained fatigue and mood changes, BHRT may help you feel like yourself again.",
        ]}
        extra={
          <div className="mt-8">
            <p
              className="text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: BRAND }}
            >
              Delivery methods
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {delivery.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold"
                  style={{
                    borderColor: "rgba(126,145,70,0.3)",
                    backgroundColor: "rgba(126,145,70,0.08)",
                    color: "#5a6a30",
                  }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: BRAND }}
                  />
                  {d}
                </span>
              ))}
            </div>
          </div>
        }
      />

      {/* Conditions Treated — dark grid */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
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
              <SectionPill icon={Icons.stetho("h-3.5 w-3.5")} inverted>
                Conditions Treated
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
                BHRT may help with{" "}
                <span style={{ color: BRAND }}>these conditions</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {conditions.map((c, i) => (
              <Reveal key={c.label} delay={(i % 4) * 0.05}>
                <div className="group flex h-full items-center gap-3 rounded-2xl bg-[#111] p-5 transition-all hover:-translate-y-1 hover:bg-[#161616]">
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.15)",
                      color: BRAND,
                    }}
                  >
                    {c.icon("h-5 w-5")}
                  </span>
                  <span className="font-[family-name:var(--font-raleway)] text-sm font-bold text-white">
                    {c.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowWeHelp
        heading="How BHRT"
        accent="Can Help"
        cards={[
          {
            icon: Icons.user,
            title: "Men & Women",
            body: "Plans tailored for both perimenopause/menopause and andropause/low-T.",
          },
          {
            icon: Icons.leaf,
            title: "Hormone Balance",
            body: "Restore the hormone levels your body needs to function at its best.",
          },
          {
            icon: Icons.spark,
            title: "Improved Vitality",
            body: "Better energy, mood, sleep, and libido — without synthetic side-effect profiles.",
          },
        ]}
      />

      <ProcessTimeline
        steps={[
          { title: "Hormone Lab Testing", body: "We start with comprehensive lab work to see exactly where your hormones sit.", icon: Icons.stetho },
          { title: "Symptom Review", body: "Your provider connects your symptoms to your labs to design a focused plan.", icon: Icons.user },
          { title: "Custom BHRT Plan", body: "Treatment is matched to you — creams, patches, gels or injections.", icon: Icons.leaf },
          { title: "Ongoing Optimization", body: "We monitor labs and adjust dosing as you feel — and your numbers — improve.", icon: Icons.clock },
        ]}
      />

      <RelatedServices currentHref="/bioidentical-hormones/" />

      <ServiceFAQ
        faqs={[
          { q: "What are bioidentical hormones?", a: "Hormones that are chemically identical to those your body naturally produces — derived from plant sources." },
          { q: "Is BHRT safe?", a: "When prescribed and monitored by a qualified provider, BHRT is considered a safe option for many adults." },
          { q: "How are the hormones delivered?", a: "Through creams, patches, gels or injections — chosen based on your needs and lifestyle." },
          { q: "How soon will I feel a difference?", a: "Many patients notice improved energy, mood and clarity within 2 to 6 weeks of starting treatment." },
        ]}
      />

      <GreenCTABand
        heading="Feel like yourself again."
        body="Ask our team how bioidentical hormones could restore your balance and energy."
      />
    </>
  );
}

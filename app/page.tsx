import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Approach from "@/components/home/Approach";
import Conditions from "@/components/home/Conditions";
import FeaturePanels from "@/components/home/FeaturePanels";
import LocationContact from "@/components/home/LocationContact";
import Marquee from "@/components/home/Marquee";
import Reveal from "@/components/home/Reveal";
import ServicesGrid from "@/components/home/ServicesGrid";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import { DotPattern, GridPattern, WaveDivider } from "@/components/home/decor";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import Testimonials from "@/components/home/Testimonials";
import { Icons, SectionPill } from "@/components/home/ui";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { isFiveStarReview } from "@/lib/reviews";
import { medicalBusinessSchema } from "@/lib/site-schema";

const TITLE =
  "Regenerative Medicine in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Absolute Wellness Center is a skilled Regenerative Medicine in Eugene, OR. Accepting new appointments. Call today or request an appointment on our website.";
const URL = "https://awceugene.com/";
const BRAND = "#7E9146";

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
    type: "website",
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

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://awceugene.com/",
      url: "https://awceugene.com/",
      name: TITLE,
      isPartOf: { "@id": "https://awceugene.com/#website" },
      about: { "@id": "https://awceugene.com/#medicalbusiness" },
      description: DESCRIPTION,
      breadcrumb: { "@id": "https://awceugene.com/#breadcrumb" },
      inLanguage: "en-US",
      potentialAction: [
        { "@type": "ReadAction", target: ["https://awceugene.com/"] },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://awceugene.com/#breadcrumb",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home" }],
    },
    {
      "@type": "WebSite",
      "@id": "https://awceugene.com/#website",
      url: "https://awceugene.com/",
      name: "Absolute Wellness Center",
      description: "Regenerative Medicine in Eugene, OR",
      inLanguage: "en-US",
    },
    medicalBusinessSchema,
  ],
};

export default async function HomePage() {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  const visible = reviews.filter(isFiveStarReview);
  const homeSchema = {
    ...pageSchema,
    "@graph": pageSchema["@graph"].map((node) =>
      node === medicalBusinessSchema
        ? {
            ...medicalBusinessSchema,
            ...(meta.rating > 0 && meta.reviewCount > 0
              ? {
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: String(meta.rating),
                    reviewCount: String(meta.reviewCount),
                    bestRating: "5",
                  },
                }
              : {}),
            ...(visible.length
              ? {
                  review: visible.map((review) => ({
                    "@type": "Review",
                    author: { "@type": "Person", name: review.name },
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                    reviewBody: review.quote,
                  })),
                }
              : {}),
          }
        : node,
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      {/* SECTION 1 — Hero */}
      <Hero
        rating={meta.rating}
        reviewCount={meta.reviewCount}
        reviewsUrl={meta.reviewsUrl}
      />

      {/* Scrolling brand + 5-star Google reviews */}
      <Marquee
        reviews={visible.map((review) => ({
          name: review.name,
          quote: review.quote,
        }))}
      />

      {/* SECTION 2 — Dark Trust Band (compact) */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-14">
        <DotPattern />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1.4fr] lg:gap-12">
            {/* Heading block */}
            <Reveal>
              <SectionPill icon={Icons.shield("h-3.5 w-3.5")} inverted>
                Trusted in Eugene, OR
              </SectionPill>
              <h2 className="mt-4 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-white sm:text-4xl">
                Absolute Wellness <span style={{ color: BRAND }}>Center</span>
              </h2>
              <p className="mt-3 max-w-md text-sm text-gray-400">
                Eugene&apos;s premier destination for regenerative medicine and
                whole-body wellness.
              </p>
            </Reveal>

            {/* Compact stats row */}
            <Reveal delay={0.1}>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    value: meta.rating || 0,
                    decimals: 1,
                    suffix: "★",
                    label: "Patient Rating",
                    sub:
                      meta.reviewCount > 0
                        ? `${meta.reviewCount.toLocaleString("en-US")} Reviews`
                        : "Google Reviews",
                    href: meta.reviewsUrl,
                  },
                  {
                    value: 9,
                    suffix: "h",
                    label: "Open Mon–Thu",
                    sub: "9am – 6pm",
                  },
                  {
                    value: 6,
                    suffix: "+",
                    label: "Treatments",
                    sub: "Regenerative care",
                  },
                ].map((s) => {
                  const card = (
                    <>
                      <span
                        className="block font-[family-name:var(--font-raleway)] text-2xl font-black sm:text-3xl"
                        style={{ color: BRAND }}
                      >
                        <AnimatedCounter
                          to={s.value}
                          decimals={s.decimals ?? 0}
                          suffix={s.suffix}
                        />
                      </span>
                      <p className="mt-1.5 font-[family-name:var(--font-raleway)] text-[11px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs">
                        {s.label}
                      </p>
                      <p className="mt-0.5 text-[10px] text-gray-500 sm:text-[11px]">
                        {s.sub}
                      </p>
                    </>
                  );
                  const className =
                    "group rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur transition-colors hover:border-[#7E9146]/40 hover:bg-white/[0.07] sm:p-5";
                  return s.href ? (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`${className} block`}
                    >
                      {card}
                    </a>
                  ) : (
                    <div key={s.label} className={className}>
                      {card}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Welcome / About */}
      <section className="relative overflow-hidden bg-white py-24">
        <GridPattern className="opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.star("h-3.5 w-3.5")}>
                Welcome to AWC
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Welcome To Absolute{" "}
                <span style={{ color: BRAND }}>Wellness Center</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                We are dedicated to staying on top of the latest tools and
                treatments. It is our goal to create a friendly and professional
                atmosphere that you can rely on for all of your needs.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Icons.stetho("h-7 w-7"),
                title: "Compassionate Staff",
                body: (
                  <>
                    Our staff will discuss all of your options and what to
                    expect. They are here to answer your questions and address
                    your concerns.
                  </>
                ),
              },
              {
                icon: Icons.shield("h-7 w-7"),
                title: "Latest Treatments",
                body: (
                  <>
                    We stay on top of the latest tools and treatments to offer
                    you the most up-to-date care available in Eugene, OR.
                  </>
                ),
              },
              {
                icon: Icons.calendar("h-7 w-7"),
                title: "Easy Appointments",
                body: (
                  <>
                    If you would like to visit our office, feel free to contact
                    us today at{" "}
                    <a
                      href="tel:+15414845777"
                      className="font-semibold hover:underline"
                      style={{ color: BRAND }}
                    >
                      (541) 484-5777
                    </a>
                    . Accepting new patients now.
                  </>
                ),
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-[#f7f9f2] p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span
                    className="inline-flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: "rgba(126,145,70,0.15)",
                      color: BRAND,
                    }}
                  >
                    {c.icon}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-raleway)] text-2xl font-bold text-gray-900">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">
                    {c.body}
                  </p>
                  <span
                    aria-hidden
                    className="absolute -bottom-12 -right-12 text-[160px] font-black leading-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.07]"
                    style={{ color: BRAND }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Services Grid (dark) */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-24">
        <DotPattern />
        <WaveDivider fill="#ffffff" className="absolute inset-x-0 top-0" flip />
        <div className="relative mx-auto max-w-7xl px-6 pt-8">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.spark("h-3.5 w-3.5")} inverted>
                Our Services
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-white sm:text-5xl">
                Our <span style={{ color: BRAND }}>Services</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
                Comprehensive regenerative and wellness treatments to help you
                live better
              </p>
            </Reveal>
          </div>

          <div className="mt-16">
            <ServicesGrid />
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 text-center">
              <Link
                href="/services/"
                className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold transition-all hover:bg-[#7E9146] hover:text-white"
                style={{ borderColor: BRAND, color: BRAND }}
              >
                View All Services →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — Feature panels: New Patients / Our Services */}
      <FeaturePanels />

      {/* SECTION 6 — Our Approach (on-site diagnostics + multidisciplinary) */}
      <Approach />

      {/* SECTION 7 — Conditions We Treat */}
      <Conditions />

      <GoogleReviews>
        {({ reviews: items, meta: reviewMeta }) => (
          <Testimonials
            items={items.map((review) => ({
              name: review.name,
              quote: review.quote,
              when: review.relativeTime ?? "Posted on Google",
            }))}
            rating={reviewMeta.rating}
            reviewCount={reviewMeta.reviewCount}
            reviewsUrl={reviewMeta.reviewsUrl}
            variant="scroll"
          />
        )}
      </GoogleReviews>

      {/* SECTION 8 — Location & Contact */}
      <LocationContact
        rating={meta.rating}
        reviewCount={meta.reviewCount}
        reviewsUrl={meta.reviewsUrl}
      />
    </>
  );
}

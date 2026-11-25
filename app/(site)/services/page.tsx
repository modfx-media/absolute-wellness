import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { FloatingTiles } from "@/components/MotionAccents";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

// Title matches live awceugene.com.
const TITLE = "Services in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Absolute Wellness Center in Eugene, OR offers joint injections, spinal decompression, medical weight loss, chiropractic care, nutritional IVs, and more. Call (541) 484-5777.";
const URL = "https://awceugene.com/services/";

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
    { name: "Services" },
  ],
});

type Service = {
  n: string;
  title: string;
  href: string;
  image: string;
  icon: (cls?: string) => React.ReactNode;
};

const services: Service[] = [
  { n: "01", title: "Joint Injections",         href: "/joint-injections/",         image: "/images/medical-injections.jpg",     icon: Icons.syringe },
  { n: "02", title: "Trigger Point Injections", href: "/trigger-point-injections/", image: "/images/medical-injections.jpg",     icon: Icons.spark },
  { n: "03", title: "Therapeutic Exercise",     href: "/physical-therapy/",         image: "/images/correctiveexercises_img.jpg", icon: Icons.figure },
  { n: "04", title: "Chiropractic Care",        href: "/chiropractic-care/",        image: "/images/chiropracticcare_img.jpg",   icon: Icons.hands },
  { n: "05", title: "Bioidentical Hormones",    href: "/bioidentical-hormones/",    image: "/images/chiropracticcare_img.jpg",   icon: Icons.leaf },
  { n: "06", title: "Spinal Decompression",     href: "/spinal-decompression/",     image: "/images/spinaldecompression_img.jpg", icon: Icons.spine },
  { n: "07", title: "Medical Weight Loss",      href: "/medical-weight-loss/",      image: "/images/weight-loss-3-1.jpg",        icon: Icons.scale },
  { n: "08", title: "Nutritional IV's",         href: "/nutritional-ivs/",          image: "/images/IV-Therapy-2.jpg",           icon: Icons.drip },
  { n: "09", title: "Auto Injury",              href: "/auto-injury/",              image: "/images/Back-Pain.jpg",              icon: Icons.shield },
  { n: "10", title: "Physical Therapy",         href: "/physical-therapy/",         image: "/images/correctiveexercises_img.jpg", icon: Icons.stetho },
];

function ServiceCard({ s, i }: { s: Service; i: number }) {
  return (
    <Reveal delay={(i % 3) * 0.06}>
      <Link
        href={s.href}
        className="group relative block h-72 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-2xl"
      >
        <Image
          src={s.image}
          alt={s.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity group-hover:from-black/90"
        />

        {/* Icon top-left */}
        <span
          className="absolute left-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6"
          style={{
            backgroundColor: BRAND,
            boxShadow: "0 10px 24px -10px rgba(126,145,70,0.6)",
          }}
        >
          {s.icon("h-6 w-6")}
        </span>

        {/* Number badge top-right */}
        <span
          aria-hidden
          className="absolute right-5 top-4 font-[family-name:var(--font-raleway)] text-4xl font-black text-white/30"
        >
          {s.n}
        </span>

        {/* Bottom content */}
        <div className="absolute inset-x-5 bottom-5">
          <h3 className="font-[family-name:var(--font-raleway)] text-xl font-bold text-white drop-shadow">
            {s.title}
          </h3>
          <span
            className="mt-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ backgroundColor: BRAND }}
          >
            Learn More
            {Icons.arrow("h-3.5 w-3.5")}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Our Services"
        subtitle="Comprehensive regenerative and wellness treatments in Eugene, OR"
        badge="What We Offer"
        image="/images/Back-Pain-new-1.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* SECTION 1 — Intro + Services Grid */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full opacity-[0.1] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Reveal>
              <SectionPill icon={Icons.spark("h-3.5 w-3.5")}>
                Our Treatments
              </SectionPill>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                If you are experiencing pain,{" "}
                <span style={{ color: BRAND }}>we want to help!</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
                We are dedicated to helping patients regain pain-free lives.
                Oftentimes, people do not seek help for pain until it worsens.
                We want to help at the onset of symptoms, so they do not
                progress.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-10 hidden h-32 md:block">
            <FloatingTiles />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.n} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Green CTA Band */}
      <section
        className="relative overflow-hidden py-16"
        style={{ backgroundColor: BRAND }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-white">
              Not sure which treatment is right for you?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 text-base leading-7 text-white/90">
              Call our team and we&apos;ll help you find the best path to
              feeling better.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/appointments/"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#5a6a30] transition-transform hover:scale-[1.02]"
              >
                Request Appointment
                {Icons.arrow("h-4 w-4")}
              </Link>
              <a
                href="tel:+15414845777"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#5a6a30]"
              >
                {Icons.phone("h-4 w-4")}
                Call (541) 484-5777
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

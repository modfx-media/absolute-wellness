import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import ContactForm from "@/components/ContactForm";
import {
  CITIES,
  SERVICES,
  ORIGIN,
  getCity,
  getService,
  getRelatedServices,
  nearbyCities,
} from "@/lib/areas";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { buildPageGraph, buildServiceSchema } from "@/lib/site-schema";

const BRAND = "#7E9146";
const SITE = "https://awceugene.com";

type Params = Promise<{ city: string; service: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const c of CITIES) {
    for (const s of SERVICES) {
      params.push({ city: c.slug, service: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) return {};

  const title = `${service.name} in ${city.name}, OR | Absolute Wellness Center`;
  const description = `${service.name} for ${city.name}, Oregon patients at Absolute Wellness Center in Eugene. ${service.short} Call ${ORIGIN.phone}.`;
  const url = `${SITE}/areas/${city.slug}/${service.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Absolute Wellness Center",
      locale: "en_US",
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function CityServicePage({ params }: { params: Params }) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  const url = `${SITE}/areas/${city.slug}/${service.slug}/`;
  const title = `${service.name} in ${city.name}, OR | Absolute Wellness Center`;
  const description = `${service.name} for ${city.name}, OR patients at Absolute Wellness Center. ${service.short}`;

  const pageSchema = buildPageGraph({
    url,
    name: title,
    description,
    breadcrumb: [
      { name: "Home", item: `${SITE}/` },
      { name: "Areas We Serve", item: `${SITE}/areas/` },
      { name: city.name, item: `${SITE}/areas/${city.slug}/` },
      { name: service.name },
    ],
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q.replace("[city]", city.name),
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceSchema = buildServiceSchema({
    url,
    name: `${service.name} in ${city.name}, OR`,
    description,
    serviceType: service.name,
    areaServed: [city.name, city.county, `${city.region}`],
    image: `${SITE}${service.image}`,
  });

  const related = getRelatedServices(service);
  const near = nearbyCities(city, 6);
  const { meta } = await getDisplayedGoogleReviews();
  const reviewBlurb =
    meta.rating > 0 && meta.reviewCount > 0
      ? `${meta.rating.toFixed(1)} stars across ${meta.reviewCount}+ Google reviews — read them before you book.`
      : "Read our Google reviews before you book.";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        title={`${service.name} in ${city.name}, OR`}
        subtitle={service.hero}
        badge={`${service.badge} · ${city.name}`}
        image={service.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas We Serve", href: "/areas/" },
          { label: city.name, href: `/areas/${city.slug}/` },
          { label: service.name },
        ]}
      />

      {/* Intro + Distance card */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl" style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }} />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f0f4e8] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5a6a30]">
                Serving {city.name}, {city.county}
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                {service.name}{" "}
                <span style={{ color: BRAND }}>built for {city.name} patients</span>
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-700">
                {city.intro} Absolute Wellness Center provides {service.name.toLowerCase()} from our Eugene clinic to patients across {city.county}. {service.short}
              </p>
              <ul className="mt-8 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-base text-gray-800">
                    <span className="mt-1.5 inline-block h-2 w-2 flex-none rounded-full" style={{ backgroundColor: BRAND }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={ORIGIN.telLink} className="inline-flex items-center gap-2 rounded-full bg-[#7E9146] px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-transform hover:scale-[1.02]">
                  Call {ORIGIN.phone}
                </a>
                <Link href="/appointments/" className="inline-flex items-center gap-2 rounded-full border-2 border-[#7E9146] px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#5a6a30] hover:bg-[#7E9146] hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <aside className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] p-8 shadow-[0_20px_60px_-30px_rgba(126,145,70,0.4)]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl" style={{ background: BRAND }} />
              <h3 className="font-[family-name:var(--font-raleway)] text-2xl font-black text-gray-900">
                From {city.name} → Our Eugene Clinic
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-gray-200/70 pb-3">
                  <dt className="font-semibold uppercase tracking-wide text-gray-500">Distance</dt>
                  <dd className="font-bold text-gray-900">{city.distanceMiles === 0 ? "Local" : `~${city.distanceMiles} miles`}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200/70 pb-3">
                  <dt className="font-semibold uppercase tracking-wide text-gray-500">Drive Time</dt>
                  <dd className="font-bold text-gray-900">{city.driveMinutes === 0 ? "On-site" : `~${city.driveMinutes} min`}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200/70 pb-3">
                  <dt className="font-semibold uppercase tracking-wide text-gray-500">County</dt>
                  <dd className="font-bold text-gray-900">{city.county}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="font-semibold uppercase tracking-wide text-gray-500">Region</dt>
                  <dd className="font-bold text-gray-900">{city.region}</dd>
                </div>
              </dl>
              <div className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-gray-100">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5a6a30]">Visit Us</p>
                <p className="mt-2 text-sm font-semibold text-gray-900">{ORIGIN.street}</p>
                <p className="text-sm text-gray-700">{ORIGIN.city}, {ORIGIN.state} {ORIGIN.zip}</p>
                <a href="https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts" target="_blank" rel="noreferrer noopener" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#5a6a30] hover:underline">
                  Get directions →
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Why locals choose AWC */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRAND }}>Why {city.name}</span>
            <h2 className="mt-3 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-white sm:text-5xl">
              Patients across {city.region.toLowerCase()} choose Absolute Wellness Center
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "01", t: "Specialty Care Worth The Drive", d: `Patients drive in from ${city.name} for ${service.name.toLowerCase()} because the right protocol matters more than the closest clinic.` },
              { n: "02", t: "One Team, One Plan", d: "Chiropractic, PT, BHRT, weight loss, and injections under one roof. No fragmented care, no finger-pointing." },
              { n: "03", t: "Transparent Pricing", d: "We accept self-pay and most insurances and quote real numbers up front." },
              { n: "04", t: "Same-Week Availability", d: `New ${city.name} patients are usually seen within 1–3 business days.` },
              { n: "05", t: "9+ Years In Eugene", d: "Founded in 2017, with thousands of treatments completed across Lane County and beyond." },
              { n: "06", t: "Real Results, Real People", d: reviewBlurb },
            ].map((c) => (
              <Reveal key={c.n}>
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-[#7E9146]/40">
                  <span className="font-[family-name:var(--font-raleway)] text-5xl font-black text-white/15">{c.n}</span>
                  <h3 className="mt-2 font-[family-name:var(--font-raleway)] text-xl font-bold text-white">{c.t}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-300">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a6a30]">FAQ</span>
            <h2 className="mt-3 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {service.name} questions from {city.name}
            </h2>
          </div>
          <dl className="mt-12 space-y-4">
            {service.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-gray-200 bg-[#f7f9f2]/40 p-6 transition-all open:bg-white open:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-raleway)] text-lg font-bold text-gray-900">
                  {f.q}
                  <span className="ml-auto inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#7E9146] text-white transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base leading-7 text-gray-700">{f.a}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* Related services in city */}
      <section className="bg-[#f7f9f2] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a6a30]">Related Services</span>
              <h2 className="mt-3 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                More care for {city.name} patients
              </h2>
            </div>
            <Link href={`/areas/${city.slug}/`} className="text-sm font-bold text-[#5a6a30] hover:underline">All services in {city.name} →</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/areas/${city.slug}/${r.slug}/`}
                className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(126,145,70,0.5)]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: BRAND }} />
                <span className="inline-flex items-center rounded-full bg-[#f0f4e8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5a6a30]">{r.badge}</span>
                <h3 className="mt-4 font-[family-name:var(--font-raleway)] text-xl font-bold text-gray-900">{r.name}</h3>
                <p className="mt-3 text-sm text-gray-700">{r.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#5a6a30]">In {city.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby cities */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a6a30]">Nearby Areas</span>
            <h2 className="mt-3 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              {service.name} for cities near {city.name}
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {near.map((n) => (
              <Link
                key={n.slug}
                href={`/areas/${n.slug}/${service.slug}/`}
                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-[#7E9146] hover:bg-[#f0f4e8] hover:text-[#5a6a30]"
              >
                {service.name} in {n.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#5a6a30] via-[#7E9146] to-[#5a6a30] py-20 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-white sm:text-5xl">
              Ready to start {service.name.toLowerCase()}?
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/90">
              {city.name} patients — request an appointment and we'll call you back within one business day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={ORIGIN.telLink} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#5a6a30] transition-transform hover:scale-[1.02]">
                Call {ORIGIN.phone}
              </a>
              <Link href="/contact/" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-white hover:bg-white hover:text-[#5a6a30] transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          <div>
            <ContactForm title="Request an Appointment" />
          </div>
        </div>
      </section>
    </>
  );
}

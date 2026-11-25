import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import {
  CITIES,
  SERVICES,
  ORIGIN,
  getCity,
  nearbyCities,
} from "@/lib/areas";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";
const SITE = "https://awceugene.com";

type Params = Promise<{ city: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};

  const title = `Wellness, Pain & Weight Loss Care for ${city.name}, OR | Absolute Wellness Center`;
  const description = `${city.name}, Oregon patients trust Absolute Wellness Center in Eugene for chiropractic care, BHRT, medical weight loss, neuropathy treatment, and more. Call ${ORIGIN.phone}.`;
  const url = `${SITE}/areas/${city.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Absolute Wellness Center", locale: "en_US", type: "article" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export default async function CityHubPage({ params }: { params: Params }) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const url = `${SITE}/areas/${city.slug}/`;
  const title = `Wellness Care for ${city.name}, OR`;
  const description = `Specialty care for ${city.name}, Oregon — BHRT, medical weight loss, neuropathy, chiropractic care, and more at Absolute Wellness Center in Eugene.`;

  const pageSchema = buildPageGraph({
    url,
    name: title,
    description,
    breadcrumb: [
      { name: "Home", item: `${SITE}/` },
      { name: "Areas We Serve", item: `${SITE}/areas/` },
      { name: city.name },
    ],
  });

  const near = nearbyCities(city, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <PageHero
        title={`Wellness Care for ${city.name}, OR`}
        subtitle={`Specialty care for ${city.name} patients — BHRT, medical weight loss, neuropathy treatment, chiropractic care, joint injections, and more.`}
        badge={`Serving ${city.county}`}
        image="/images/walking-women-1920-web-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas We Serve", href: "/areas/" },
          { label: city.name },
        ]}
      />

      {/* City overview */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl" style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <Reveal>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f0f4e8] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5a6a30]">
                  {city.region}
                </span>
                <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                  Care that's <span style={{ color: BRAND }}>worth the drive</span> from {city.name}
                </h2>
                <p className="mt-5 text-lg leading-8 text-gray-700">{city.intro}</p>
                <p className="mt-4 text-base leading-8 text-gray-700">
                  From our Eugene clinic, we serve {city.name} patients across {SERVICES.length} specialty programs — including bioidentical hormone therapy, medical weight loss with semaglutide, peripheral neuropathy treatment, chiropractic care, spinal decompression, and joint injections.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <aside className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] p-8 shadow-[0_20px_60px_-30px_rgba(126,145,70,0.4)]">
                <h3 className="font-[family-name:var(--font-raleway)] text-2xl font-black text-gray-900">From {city.name}</h3>
                <dl className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between border-b border-gray-200/70 pb-3"><dt className="font-semibold uppercase tracking-wide text-gray-500">Distance</dt><dd className="font-bold text-gray-900">{city.distanceMiles === 0 ? "Local" : `~${city.distanceMiles} mi`}</dd></div>
                  <div className="flex justify-between border-b border-gray-200/70 pb-3"><dt className="font-semibold uppercase tracking-wide text-gray-500">Drive Time</dt><dd className="font-bold text-gray-900">{city.driveMinutes === 0 ? "On-site" : `~${city.driveMinutes} min`}</dd></div>
                  <div className="flex justify-between border-b border-gray-200/70 pb-3"><dt className="font-semibold uppercase tracking-wide text-gray-500">County</dt><dd className="font-bold text-gray-900">{city.county}</dd></div>
                  {city.population && (
                    <div className="flex justify-between"><dt className="font-semibold uppercase tracking-wide text-gray-500">Population</dt><dd className="font-bold text-gray-900">{city.population}</dd></div>
                  )}
                </dl>
                <a href={ORIGIN.telLink} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7E9146] px-6 py-3 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-transform hover:scale-[1.02]">Call {ORIGIN.phone}</a>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* All services grid */}
      <section className="bg-[#f7f9f2] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a6a30]">Specialty Programs</span>
            <h2 className="mt-3 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {SERVICES.length} services available to {city.name} patients
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700">
              Pick a service to see how it's delivered for {city.name}, {city.county} residents.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/areas/${city.slug}/${s.slug}/`}
                className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(126,145,70,0.5)]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: BRAND }} />
                <span className="inline-flex items-center rounded-full bg-[#f0f4e8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5a6a30]">{s.badge}</span>
                <h3 className="mt-4 font-[family-name:var(--font-raleway)] text-xl font-bold text-gray-900">{s.name}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-700">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#5a6a30]">In {city.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a6a30]">Nearby Cities</span>
            <h2 className="mt-3 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              Other areas we serve near {city.name}
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {near.map((n) => (
              <Link
                key={n.slug}
                href={`/areas/${n.slug}/`}
                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-[#7E9146] hover:bg-[#f0f4e8] hover:text-[#5a6a30]"
              >
                {n.name}, OR
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/areas/" className="inline-flex items-center gap-2 rounded-full border-2 border-[#7E9146] px-7 py-3.5 text-sm font-bold text-[#5a6a30] hover:bg-[#7E9146] hover:text-white transition-colors">
              View all areas we serve →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#5a6a30] via-[#7E9146] to-[#5a6a30] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
            Ready to book your first visit?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
            New {city.name} patients are usually seen within 1–3 business days at our Eugene clinic.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={ORIGIN.telLink} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#5a6a30] transition-transform hover:scale-[1.02]">Call {ORIGIN.phone}</a>
            <Link href="/appointments/" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold text-white hover:bg-white hover:text-[#5a6a30] transition-colors">Book Online</Link>
          </div>
        </div>
      </section>
    </>
  );
}

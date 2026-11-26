import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { CITIES, SERVICES, REGIONS, ORIGIN } from "@/lib/areas";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";
const SITE = "https://awceugene.com";

const TITLE = "Areas We Serve | Absolute Wellness Center — Eugene, OR";
const DESCRIPTION = `Absolute Wellness Center proudly serves Eugene, Springfield, and 50+ Oregon cities with BHRT, medical weight loss, neuropathy treatment, chiropractic care, and more. Call ${ORIGIN.phone}.`;
const URL = `${SITE}/areas/`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: "Absolute Wellness Center", locale: "en_US", type: "article" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

const pageSchema = buildPageGraph({
  url: URL,
  name: TITLE,
  description: DESCRIPTION,
  breadcrumb: [
    { name: "Home", item: `${SITE}/` },
    { name: "Areas We Serve" },
  ],
});

const groupedCities = REGIONS.map((region) => ({
  region,
  cities: CITIES.filter((c) => c.region === region).sort((a, b) => a.distanceMiles - b.distanceMiles),
})).filter((g) => g.cities.length > 0);

const totalProgrammaticPages = CITIES.length * SERVICES.length + CITIES.length + 1;

export default function AreasIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <PageHero
        title="Areas We Serve"
        subtitle={`Specialty wellness, hormone, and pain-relief care for ${CITIES.length}+ Oregon communities — all delivered from our Eugene clinic.`}
        badge="Statewide Reach"
        image="/images/dog-forest4.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas We Serve" },
        ]}
      />

      {/* Hero stats band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] py-20">
        <div className="pointer-events-none absolute -left-32 top-10 h-[440px] w-[440px] rounded-full opacity-[0.1] blur-3xl" style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }} />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full opacity-[0.08] blur-3xl" style={{ background: `radial-gradient(circle, #b8cd7a 0%, transparent 70%)` }} />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f0f4e8] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5a6a30]">One Clinic · Statewide Care</span>
              <h2 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                Patients drive in from across Oregon because{" "}
                <span style={{ color: BRAND }}>the right care matters more than the closest clinic</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-700">
                Our Eugene office is the regional home for bioidentical hormone therapy, semaglutide medical weight loss, peripheral neuropathy treatment, and regenerative pain care.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-4">
            {[
              { n: `${CITIES.length}+`, l: "Cities Served" },
              { n: `${SERVICES.length}`, l: "Specialty Programs" },
              { n: "9+", l: "Years In Eugene" },
              { n: `${totalProgrammaticPages.toLocaleString()}+`, l: "Care Pathways" },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]">
                <div className="font-[family-name:var(--font-raleway)] text-4xl font-black text-[#5a6a30]">{s.n}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-gray-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Region jump nav */}
      <section className="sticky top-[64px] z-20 border-y border-gray-100 bg-white/85 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-3 lg:px-8" aria-label="Jump to region">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">Regions:</span>
          {groupedCities.map((g) => (
            <a
              key={g.region}
              href={`#${g.region.toLowerCase().replace(/\s|–/g, "-")}`}
              className="rounded-full bg-[#f7f9f2] px-3.5 py-1.5 text-xs font-bold text-[#5a6a30] hover:bg-[#7E9146] hover:text-white transition-colors"
            >
              {g.region}
            </a>
          ))}
        </nav>
      </section>

      {/* Regions */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl space-y-20 px-6 lg:px-8">
          {groupedCities.map((g) => (
            <Reveal key={g.region}>
              <div id={g.region.toLowerCase().replace(/\s|–/g, "-")} className="scroll-mt-32">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a6a30]">Region</span>
                    <h3 className="mt-2 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                      {g.region}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#f0f4e8] px-4 py-1.5 text-xs font-bold text-[#5a6a30]">
                    {g.cities.length} {g.cities.length === 1 ? "city" : "cities"}
                  </span>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {g.cities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/areas/${c.slug}/`}
                      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-[#f7f9f2]/40 p-5 transition-all hover:-translate-y-1 hover:border-[#7E9146]/40 hover:shadow-[0_20px_50px_-20px_rgba(126,145,70,0.5)]"
                    >
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: BRAND }} />
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-[family-name:var(--font-raleway)] text-lg font-bold text-gray-900 group-hover:text-[#5a6a30]">
                            {c.name}, OR
                          </h4>
                          <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">{c.county}</p>
                        </div>
                        <span className="text-gray-300 transition-colors group-hover:text-[#7E9146]">→</span>
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                        <span>{c.distanceMiles === 0 ? "Local" : `${c.distanceMiles} mi`}</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span>{c.driveMinutes === 0 ? "On-site" : `~${c.driveMinutes} min`}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Browse by service */}
      <section className="bg-[#f7f9f2] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a6a30]">Browse By Service</span>
            <h2 className="mt-3 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Every program, in every city
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700">
              Each service has a dedicated page for every community we serve — {totalProgrammaticPages.toLocaleString()}+ care pathways in total.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.slug} className="rounded-3xl border border-gray-100 bg-white p-7">
                <span className="inline-flex items-center rounded-full bg-[#f0f4e8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#5a6a30]">{s.badge}</span>
                <h3 className="mt-4 font-[family-name:var(--font-raleway)] text-xl font-bold text-gray-900">{s.name}</h3>
                <p className="mt-3 text-sm text-gray-700">{s.short}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {CITIES.slice(0, 6).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/areas/${c.slug}/${s.slug}/`}
                      className="rounded-full bg-[#f7f9f2] px-3 py-1 text-[11px] font-semibold text-[#5a6a30] hover:bg-[#7E9146] hover:text-white transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                  <Link href={`/${s.slug}/`} className="rounded-full bg-gray-900 px-3 py-1 text-[11px] font-bold text-white hover:bg-[#5a6a30]">
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All cities A-Z */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a6a30]">Every City, A → Z</span>
            <h2 className="mt-3 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              The complete list
            </h2>
          </div>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {[...CITIES].sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
              <li key={c.slug} className="flex items-center justify-between border-b border-gray-100 py-2">
                <Link href={`/areas/${c.slug}/`} className="font-semibold text-gray-800 hover:text-[#5a6a30] transition-colors">
                  {c.name}, OR
                </Link>
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{c.county}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#5a6a30] via-[#7E9146] to-[#5a6a30] py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
            Don't see your town?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
            We treat patients from across the Pacific Northwest. Call us and we'll get you scheduled.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={ORIGIN.telLink} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#5a6a30] transition-transform hover:scale-[1.02]">Call {ORIGIN.phone}</a>
            <Link href="/contact/" className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold text-white hover:bg-white hover:text-[#5a6a30] transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

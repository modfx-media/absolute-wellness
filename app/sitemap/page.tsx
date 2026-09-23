import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { buildPageGraph } from "@/lib/site-schema";
import { CITIES, SERVICES } from "@/lib/areas";

const TITLE = "Sitemap in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION = "Sitemap -";
const URL = "https://awceugene.com/sitemap/";

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
    { name: "Sitemap" },
  ],
});

/* Pages — verbatim alphabetical list from awceugene.com/sitemap/ */
type SitemapItem = { label: string; href: string | null };
const PAGES: SitemapItem[] = [
  { label: "About", href: "/about/" },
  { label: "Accessibility", href: "/accessibility/" },
  { label: "Appointments", href: "/appointments/" },
  { label: "Areas We Serve", href: "/areas/" },
  { label: "Auto Accident Chiropractor", href: "/auto-accident-chiropractor-eugene-or/" },
  { label: "Auto Injury", href: "/auto-injury/" },
  { label: "Back Pain", href: "/back-pain/" },
  { label: "Bioidentical Hormones", href: "/bioidentical-hormones/" },
  { label: "Blog", href: "/blog/" },
  { label: "Chiropractic Care", href: "/chiropractic-care/" },
  { label: "Conditions", href: "/conditions/" },
  { label: "Contact", href: "/contact/" },
  { label: "Home", href: "/" },
  { label: "Hormonal Imbalance", href: "/hormonal-imbalance/" },
  { label: "Joint Injections", href: "/joint-injections/" },
  { label: "Joint Pain", href: "/joint-pain/" },
  { label: "Knee Pain", href: "/knee-pain/" },
  { label: "Medical Weight Loss", href: "/medical-weight-loss/" },
  { label: "Neck Pain", href: "/neck-pain/" },
  { label: "Neuropathy", href: "/neuropathy/" },
  { label: "New Patients", href: "/new-patients/" },
  { label: "Nutritional IVs", href: "/nutritional-ivs/" },
  { label: "Pain Relief", href: "/pain-relief/" },
  { label: "Physical Therapy", href: "/physical-therapy/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "Services", href: "/services/" },
  { label: "Shoulder Pain", href: "/shoulder-pain/" },
  { label: "Sitemap", href: null },
  { label: "Spinal Decompression", href: "/spinal-decompression/" },
  { label: "Thank You", href: "/thank-you/" },
  { label: "Trigger Point Injections", href: "/trigger-point-injections/" },
  { label: "Whiplash", href: "/whiplash/" },
];

export default function SitemapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Sitemap"
        subtitle="Every page on awceugene.com, in one place."
        badge="Sitemap"
        image="/images/walking-women-1920-web-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Sitemap" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim alphabetical pages list from awceugene.com/sitemap/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionPill icon={Icons.spark("h-3.5 w-3.5")}>Pages</SectionPill>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Browse every <span style={{ color: "#7E9146" }}>page</span>
            </h2>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PAGES.map((p, i) => (
              <Reveal key={p.label} delay={Math.min(i * 0.03, 0.4)}>
                <li>
                  {p.href ? (
                    <Link
                      href={p.href}
                      className="group flex items-center gap-3 rounded-xl border border-gray-200/70 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#7E9146]/40 hover:shadow-md"
                    >
                      <span
                        aria-hidden
                        className="inline-block h-2 w-2 rounded-sm transition-transform group-hover:rotate-45"
                        style={{ backgroundColor: "#7E9146" }}
                      />
                      <span className="font-[family-name:var(--font-lato)] text-[15px] font-medium text-gray-800 group-hover:text-[#5a6a30]">
                        {p.label}
                      </span>
                      <span
                        aria-hidden
                        className="ml-auto text-[#7E9146] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        {Icons.arrow("h-4 w-4")}
                      </span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-4 py-3">
                      <span
                        aria-hidden
                        className="inline-block h-2 w-2 rounded-sm bg-gray-300"
                      />
                      <span className="font-[family-name:var(--font-lato)] text-[15px] font-medium text-gray-400">
                        {p.label}
                      </span>
                      <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300">
                        Current
                      </span>
                    </div>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* [C] AREAS WE SERVE — city hubs */}
      <section className="relative overflow-hidden bg-gray-50/60 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionPill icon={Icons.spark("h-3.5 w-3.5")}>Areas We Serve</SectionPill>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              City <span style={{ color: "#7E9146" }}>hubs</span>
            </h2>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((c, i) => (
              <Reveal key={c.slug} delay={Math.min(i * 0.02, 0.4)}>
                <li>
                  <Link
                    href={`/areas/${c.slug}/`}
                    className="group flex items-center gap-3 rounded-xl border border-gray-200/70 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#7E9146]/40 hover:shadow-md"
                  >
                    <span
                      aria-hidden
                      className="inline-block h-2 w-2 rounded-sm transition-transform group-hover:rotate-45"
                      style={{ backgroundColor: "#7E9146" }}
                    />
                    <span className="font-[family-name:var(--font-lato)] text-[15px] font-medium text-gray-800 group-hover:text-[#5a6a30]">
                      {c.name}, OR
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto text-[#7E9146] opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      {Icons.arrow("h-4 w-4")}
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* [D] CITY × SERVICE — programmatic pages */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <SectionPill icon={Icons.spark("h-3.5 w-3.5")}>Service by City</SectionPill>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Every <span style={{ color: "#7E9146" }}>service</span> in every city
            </h2>
          </Reveal>

          <div className="mt-12 space-y-10">
            {CITIES.map((c) => (
              <Reveal key={c.slug}>
                <div>
                  <h3 className="font-[family-name:var(--font-raleway)] text-xl font-bold text-gray-900">
                    <Link href={`/areas/${c.slug}/`} className="hover:text-[#5a6a30]">
                      {c.name}, OR
                    </Link>
                  </h3>
                  <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((s) => (
                      <li key={`${c.slug}-${s.slug}`}>
                        <Link
                          href={`/areas/${c.slug}/${s.slug}/`}
                          className="group flex items-center gap-3 rounded-lg border border-gray-200/70 bg-white px-3 py-2 text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#7E9146]/40 hover:shadow-md"
                        >
                          <span
                            aria-hidden
                            className="inline-block h-1.5 w-1.5 rounded-sm"
                            style={{ backgroundColor: "#7E9146" }}
                          />
                          <span className="font-[family-name:var(--font-lato)] font-medium text-gray-700 group-hover:text-[#5a6a30]">
                            {s.name} in {c.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

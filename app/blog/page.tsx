import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { type BlogPost, formatDate } from "@/lib/blog";
import { coverAbsoluteUrl, getPublishedSitePosts } from "@/lib/ranked/to-site-post";
import { buildPageGraph, SITE_URL } from "@/lib/site-schema";

export const revalidate = 3600;

const BRAND = "#7E9146";

const TITLE = "Blog | Absolute Wellness Center — Eugene, OR";
const DESCRIPTION =
  "Health, wellness, and pain-relief guidance from Absolute Wellness Center in Eugene, OR. Read practical articles on chiropractic care, hormone therapy, medical weight loss, neuropathy, and more.";
const URL = "https://awceugene.com/blog/";

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

const pageSchema = buildPageGraph({
  url: URL,
  name: TITLE,
  description: DESCRIPTION,
  breadcrumb: [
    { name: "Home", item: "https://awceugene.com/" },
    { name: "Blog" },
  ],
});

function blogSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${URL}#blog`,
    url: URL,
    name: "Absolute Wellness Center Blog",
    description: DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#medicalbusiness` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}/blog/${p.slug}/`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      author: { "@type": "Organization", name: p.author },
      image: coverAbsoluteUrl(p.cover, SITE_URL),
    })),
  };
}

export default async function BlogIndexPage() {
  const posts = [...(await getPublishedSitePosts())].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const featured = posts[0];
  const categories = Array.from(new Set(posts.map((p) => p.category)));
  const remaining = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema(posts)) }}
      />

      <PageHero
        title="Wellness Blog"
        subtitle="Practical, clinician-written guidance on pain relief, hormone balance, weight loss, and whole-body wellness — from the team at Absolute Wellness Center in Eugene, OR."
        badge="From Our Clinic"
        image="/images/walking-women-1920-web-2.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Intro strip */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <Reveal>
              <SectionPill icon={<span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRAND }} />}>
                Latest Articles
              </SectionPill>
              <h2 className="mt-4 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Insights from the treatment room.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-base leading-7 text-gray-600">
                Every article is written and reviewed by our clinical team so
                you get answers you can actually use — no fluff, no scare
                tactics. Have a topic you'd like us to cover?{" "}
                <Link href="/contact/" className="font-semibold text-[#7E9146] underline underline-offset-2 hover:text-[#5a6a30]">
                  Let us know.
                </Link>
              </p>
            </Reveal>
          </div>

          {categories.length > 0 && (
            <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-[#f0f4e8] px-3 py-1 text-xs font-semibold text-[#5a6a30]">
                All Topics
              </span>
              {categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700"
                >
                  {c}
                </span>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="relative bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#7E9146]/25 bg-[#7E9146]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5a6a30]">
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
                Featured
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <Link
                href={`/blog/${featured.slug}/`}
                className="group mt-6 grid overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-2xl lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] lg:aspect-auto">
                  <Image
                    src={featured.cover}
                    alt={featured.coverAlt ?? featured.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className="absolute left-5 top-5 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    {featured.category}
                  </span>
                </div>

                <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                    <time dateTime={featured.publishedAt}>
                      {formatDate(featured.publishedAt)}
                    </time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1.5">
                      {Icons.clock("h-3.5 w-3.5")}
                      {featured.readMinutes} min read
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-raleway)] text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="text-base leading-7 text-gray-600">
                    {featured.excerpt}
                  </p>
                  <span
                    className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md transition-transform group-hover:translate-x-1"
                    style={{ backgroundColor: BRAND }}
                  >
                    Read Article
                    {Icons.arrow("h-4 w-4")}
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid of remaining posts */}
      {remaining.length > 0 && (
        <section className="relative bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <h2 className="font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                More Articles
              </h2>
            </Reveal>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {remaining.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={(i % 3) * 0.06}>
                    <Link
                      href={`/blog/${p.slug}/`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={p.cover}
                          alt={p.coverAlt ?? p.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span
                          className="absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                          style={{ backgroundColor: BRAND }}
                        >
                          {p.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col gap-4 p-6">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                          <time dateTime={p.publishedAt}>
                            {formatDate(p.publishedAt)}
                          </time>
                          <span aria-hidden>·</span>
                          <span>{p.readMinutes} min read</span>
                        </div>
                        <h3 className="font-[family-name:var(--font-raleway)] text-xl font-bold leading-tight text-gray-900 group-hover:text-[#5a6a30]">
                          {p.title}
                        </h3>
                        <p className="text-sm leading-6 text-gray-600 line-clamp-3">
                          {p.excerpt}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#7E9146] transition-transform group-hover:translate-x-1">
                          Read more
                          {Icons.arrow("h-4 w-4")}
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h2 className="font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight sm:text-4xl">
              Ready to feel better?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-300">
              Articles are helpful — but nothing beats an evaluation with our
              team. New patients welcome.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/appointments/"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
                style={{ backgroundColor: BRAND }}
              >
                Request Appointment
                {Icons.arrow("h-4 w-4")}
              </Link>
              <a
                href="tel:+15414845777"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {Icons.phone("h-4 w-4")}
                (541) 484-5777
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

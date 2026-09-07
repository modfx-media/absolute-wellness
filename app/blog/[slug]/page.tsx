import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/home/Reveal";
import { DotPattern } from "@/components/home/decor";
import { Icons } from "@/components/home/ui";
import { SITE_URL, buildPageGraph } from "@/lib/site-schema";
import { type BlogBlock, type BlogPost, formatDate, getRelatedPosts } from "@/lib/blog";
import { linkifyRichText } from "@/lib/linkify-rich-text";
import { getPublishedBlogSlugs } from "@/lib/ranked/posts";
import { coverAbsoluteUrl, getPublishedSitePost, getPublishedSitePosts } from "@/lib/ranked/to-site-post";

const BRAND = "#7E9146";
const SITE = "https://awceugene.com";

type Params = Promise<{ slug: string }>;

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedSitePost(slug);
  if (!post) return {};

  const url = `${SITE}/blog/${post.slug}/`;
  const image = coverAbsoluteUrl(post.cover, SITE);

  return {
    title: `${post.title} | Absolute Wellness Center`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Absolute Wellness Center",
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: image, alt: post.coverAlt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading": {
      const id = block.id ?? slugify(block.text);
      if (block.level === 2) {
        return (
          <h2
            id={id}
            className="scroll-mt-28 mt-14 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-[2rem]"
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          id={id}
          className="scroll-mt-28 mt-10 font-[family-name:var(--font-raleway)] text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
        >
          {block.text}
        </h3>
      );
    }

    case "paragraph":
      return (
        <p className="mt-6 text-[1.05rem] leading-8 text-gray-700 first:mt-0">
          {linkifyRichText(block.text)}
        </p>
      );

    case "list":
      if (block.style === "number") {
        return (
          <ol className="mt-6 space-y-3 pl-6 text-[1.05rem] leading-8 text-gray-700 [counter-reset:item]">
            {block.items.map((it, i) => (
              <li
                key={i}
                className="relative pl-2 [counter-increment:item] before:absolute before:-left-6 before:top-0 before:font-bold before:text-[#7E9146] before:content-[counter(item)_'.']"
              >
                {linkifyRichText(it)}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mt-6 space-y-3 text-[1.05rem] leading-8 text-gray-700">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden
                className="mt-3 inline-block h-1.5 w-1.5 flex-none rounded-full"
                style={{ backgroundColor: BRAND }}
              />
              <span>{linkifyRichText(it)}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <figure className="my-10 border-l-4 pl-6" style={{ borderColor: BRAND }}>
          <blockquote className="font-[family-name:var(--font-raleway)] text-xl font-medium italic leading-8 text-gray-800 sm:text-2xl sm:leading-9">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-gray-500">
              — {block.attribution}
            </figcaption>
          )}
        </figure>
      );

    case "image":
      return (
        <figure className="my-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm italic text-gray-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <aside
          className="my-8 rounded-2xl border-l-4 bg-[#f7f9f2] p-6 sm:p-7"
          style={{ borderColor: BRAND }}
        >
          {block.title && (
            <p className="font-[family-name:var(--font-raleway)] text-sm font-bold uppercase tracking-[0.16em] text-[#5a6a30]">
              {block.title}
            </p>
          )}
          <p className={`${block.title ? "mt-2" : ""} text-[1.02rem] leading-8 text-gray-700`}>
            {linkifyRichText(block.text)}
          </p>
          {block.links && block.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {block.links.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    i === 0
                      ? "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
                      : "inline-flex items-center gap-2 rounded-full border border-[#7E9146]/30 bg-white px-5 py-2.5 text-sm font-semibold text-[#5a6a30] transition-colors hover:border-[#7E9146] hover:bg-[#f0f4e8]"
                  }
                  style={i === 0 ? { backgroundColor: BRAND } : undefined}
                >
                  {l.label}
                  {Icons.arrow("h-4 w-4")}
                </Link>
              ))}
            </div>
          )}
        </aside>
      );

    case "divider":
      return (
        <hr
          aria-hidden
          className="my-12 border-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
          style={{ height: 1 }}
        />
      );

    default:
      return null;
  }
}

function articleSchema(post: BlogPost) {
  const url = `${SITE}/blog/${post.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    mainEntityOfPage: url,
    url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    image: [coverAbsoluteUrl(post.cover, SITE)],
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE,
    },
    publisher: { "@id": `${SITE_URL}/#medicalbusiness` },
    articleSection: post.category,
    keywords: (post.tags ?? []).join(", "),
    inLanguage: "en-US",
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPublishedSitePost(slug);
  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}/`;
  const published = await getPublishedSitePosts();
  const related = getRelatedPosts(post, 3, published);
  const headings = post.content
    .filter((b): b is Extract<BlogBlock, { type: "heading" }> => b.type === "heading" && b.level === 2)
    .map((h) => ({ id: h.id ?? slugify(h.text), text: h.text }));

  const pageSchema = buildPageGraph({
    url,
    name: post.title,
    description: post.description,
    breadcrumb: [
      { name: "Home", item: `${SITE}/` },
      { name: "Blog", item: `${SITE}/blog/` },
      { name: post.title },
    ],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />

      {/* Editorial hero */}
      <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
        <div className="absolute inset-0">
          <Image
            src={post.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]/50" />
        </div>

        <DotPattern color="rgba(255,255,255,0.05)" />

        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-1/3 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />

        <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-28">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden className="text-gray-600">/</span>
            <Link href="/blog/" className="hover:text-white transition-colors">Blog</Link>
            <span aria-hidden className="text-gray-600">/</span>
            <span className="text-white line-clamp-1">{post.category}</span>
          </nav>

          <Reveal>
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
              {post.category}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight sm:text-5xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: BRAND }}
                  aria-hidden
                >
                  {Icons.user("h-5 w-5")}
                </span>
                <span>
                  <span className="block font-semibold text-white">{post.author}</span>
                  {post.authorRole && (
                    <span className="block text-xs uppercase tracking-[0.14em] text-gray-400">
                      {post.authorRole}
                    </span>
                  )}
                </span>
              </div>
              <span aria-hidden className="hidden h-8 w-px bg-white/20 sm:block" />
              <div className="flex items-center gap-2">
                {Icons.calendar("h-4 w-4")}
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-2">
                {Icons.clock("h-4 w-4")}
                <span>{post.readMinutes} min read</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Article body */}
      <article className="relative bg-white">
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-14 sm:pt-20">
          {headings.length >= 2 && (
            <Reveal>
              <nav
                aria-label="In this article"
                className="mb-12 rounded-2xl border border-gray-100 bg-[#f7f9f2] p-6"
              >
                <p className="font-[family-name:var(--font-raleway)] text-xs font-bold uppercase tracking-[0.16em] text-[#5a6a30]">
                  In this article
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="inline-flex items-start gap-2 text-sm font-medium text-gray-700 hover:text-[#5a6a30]"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1.5 w-1.5 flex-none rounded-full"
                          style={{ backgroundColor: BRAND }}
                        />
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          )}

          <div className="awc-article">
            {post.content.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-14 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-8">
              <span className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                Tagged
              </span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Share + back */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#5a6a30]"
            >
              <span aria-hidden>←</span>
              Back to Blog
            </Link>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
              <span>Share</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Share on Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-[#7E9146] hover:text-[#7E9146]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M13.5 21v-7.5h2.55l.38-3H13.5V8.6c0-.86.24-1.45 1.48-1.45h1.58V4.47a21 21 0 0 0-2.3-.12c-2.28 0-3.84 1.39-3.84 3.94V10.5H7.86v3h2.56V21h3.08Z" />
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Share on X"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-[#7E9146] hover:text-[#7E9146]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                  <path d="M17.5 3h3l-6.7 7.66L22 21h-6.3l-4.95-6.5L5 21H2l7.2-8.23L2 3h6.4l4.47 5.93L17.5 3Zm-1.1 16h1.66L7.7 5H5.94l10.46 14Z" />
                </svg>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`}
                aria-label="Share by email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-[#7E9146] hover:text-[#7E9146]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z M4 6l8 7 8-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Author block */}
        <div className="mx-auto max-w-4xl px-6 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-[#f7f9f2] to-[#f0f4e8] p-8 sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <span
                className="inline-flex h-16 w-16 flex-none items-center justify-center rounded-full text-white"
                style={{ backgroundColor: BRAND }}
                aria-hidden
              >
                {Icons.leaf("h-8 w-8")}
              </span>
              <div>
                <p className="font-[family-name:var(--font-raleway)] text-xs font-bold uppercase tracking-[0.16em] text-[#5a6a30]">
                  Written by
                </p>
                <p className="mt-1 font-[family-name:var(--font-raleway)] text-xl font-black text-gray-900">
                  {post.author}
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-700">
                  Absolute Wellness Center is a regenerative medicine and
                  chiropractic clinic in Eugene, OR. Our team has helped
                  patients across the Willamette Valley for 9+ years — combining
                  chiropractic care, IV therapy, medical weight loss, and
                  hormone balance in one welcoming clinic.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/about/"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5a6a30] hover:text-[#7E9146]"
                  >
                    Meet the team {Icons.arrow("h-4 w-4")}
                  </Link>
                  <Link
                    href="/appointments/"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5a6a30] hover:text-[#7E9146]"
                  >
                    Request appointment {Icons.arrow("h-4 w-4")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="relative bg-gradient-to-br from-white via-[#f7f9f2] to-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <h2 className="font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Keep Reading
              </h2>
              <p className="mt-3 max-w-2xl text-gray-600">
                More articles from the Absolute Wellness team.
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
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
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span
                          className="absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                          style={{ backgroundColor: BRAND }}
                        >
                          {p.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                          <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                          <span aria-hidden>·</span>
                          <span>{p.readMinutes} min</span>
                        </div>
                        <h3 className="font-[family-name:var(--font-raleway)] text-lg font-bold leading-tight text-gray-900 group-hover:text-[#5a6a30]">
                          {p.title}
                        </h3>
                        <p className="text-sm leading-6 text-gray-600 line-clamp-3">
                          {p.excerpt}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#7E9146] transition-transform group-hover:translate-x-1">
                          Read article {Icons.arrow("h-4 w-4")}
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
              Have questions about your care?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-300">
              Talk to our team in Eugene, OR. New patients welcome —
              appointments are typically available within a few days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/appointments/"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg"
                style={{ backgroundColor: BRAND }}
              >
                Request Appointment {Icons.arrow("h-4 w-4")}
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

import type { BlogPost } from "@/lib/blog";
import { DEFAULT_COVER, DEFAULT_COVER_ALT } from "@/lib/ranked/config";
import config from "@payload-config";
import { getPayload, type Where } from "payload";
import { blockPlainText, lexicalToBlocks } from "./lexical-to-blocks";
import { withCMS } from "./with-cms";

type SeoFields = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
  excludeFromSitemap?: boolean | null;
};

type MediaValue = {
  url?: string | null;
  alt?: string | null;
};

type PostDoc = {
  title?: string | null;
  slug?: string | null;
  datePublished?: string | null;
  featuredImage?: number | MediaValue | null;
  content?: unknown;
  seo?: SeoFields | null;
  updatedAt?: string | null;
};

function dateOnly(value: string): string {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : value.slice(0, 10);
}

function isFuture(iso: string, now = Date.now()): boolean {
  const time = Date.parse(iso);
  return !Number.isNaN(time) && time > now;
}

function readMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function payloadPostToBlogPost(doc: PostDoc, opts?: { allowFuture?: boolean }): BlogPost | null {
  const slug = typeof doc.slug === "string" ? doc.slug.trim() : "";
  const title = typeof doc.title === "string" ? doc.title.trim() : "";
  const publishedRaw = typeof doc.datePublished === "string" ? doc.datePublished : "";
  if (!slug || !title || !publishedRaw) return null;
  if (!opts?.allowFuture && isFuture(publishedRaw)) return null;

  const seo = doc.seo ?? {};
  const blocks = lexicalToBlocks(doc.content);
  const plain = blockPlainText(blocks);
  const firstParagraph = blocks.find((block) => block.type === "paragraph");
  const excerptSource =
    (firstParagraph && firstParagraph.type === "paragraph" ? firstParagraph.text : "") ||
    (typeof seo.metaDescription === "string" ? seo.metaDescription : "") ||
    title;
  const excerpt = excerptSource.length > 320 ? `${excerptSource.slice(0, 317).trimEnd()}...` : excerptSource;
  const description =
    typeof seo.metaDescription === "string" && seo.metaDescription.trim()
      ? seo.metaDescription.trim()
      : excerpt;

  const image = doc.featuredImage && typeof doc.featuredImage === "object" ? doc.featuredImage : null;
  const cover = image?.url || DEFAULT_COVER;
  const coverAlt = image?.alt || title || DEFAULT_COVER_ALT;

  return {
    slug,
    title,
    metaTitle: typeof seo.metaTitle === "string" && seo.metaTitle.trim() ? seo.metaTitle.trim() : undefined,
    description,
    category: "Wellness",
    author: "Absolute Wellness Center",
    authorRole: "Care Team",
    publishedAt: dateOnly(publishedRaw),
    updatedAt: typeof doc.updatedAt === "string" ? dateOnly(doc.updatedAt) : undefined,
    readMinutes: readMinutes(plain || title),
    cover,
    coverAlt,
    excerpt,
    content: blocks,
    canonicalUrl: typeof seo.canonicalUrl === "string" && seo.canonicalUrl.trim() ? seo.canonicalUrl.trim() : undefined,
    noIndex: Boolean(seo.noIndex),
    excludeFromSitemap: Boolean(seo.excludeFromSitemap),
  };
}

async function findPayloadPosts(where?: Where, draft = false): Promise<PostDoc[]> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "posts",
    depth: 2,
    draft,
    limit: 200,
    overrideAccess: true,
    pagination: false,
    where,
  });
  return result.docs as PostDoc[];
}

export async function getPublishedPayloadPosts(): Promise<BlogPost[]> {
  return withCMS(async () => {
    const docs = await findPayloadPosts({
      and: [
        { _status: { equals: "published" } },
        { datePublished: { less_than_equal: new Date().toISOString() } },
      ],
    });
    return docs.flatMap((doc) => {
      const post = payloadPostToBlogPost(doc);
      return post ? [post] : [];
    });
  }, []);
}

export async function getPayloadDraftPost(slug: string): Promise<BlogPost | null> {
  return withCMS(async () => {
    const docs = await findPayloadPosts({ slug: { equals: slug } }, true);
    const post = docs[0] ? payloadPostToBlogPost(docs[0], { allowFuture: true }) : null;
    return post;
  }, null);
}

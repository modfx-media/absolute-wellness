import { getPayloadDraftPost, getPublishedPayloadPosts } from '@/lib/cms/posts'
import {
  getPost,
  type BlogBlock,
  type BlogPost,
} from '@/lib/blog'
import { getPublishedBlogPost, getPublishedBlogPosts } from '@/lib/ranked/posts'
import type { BlogPostData } from '@/lib/ranked/types'

function isFutureDated(iso: string, now = Date.now()): boolean {
  const time = Date.parse(iso.length <= 10 ? `${iso}T23:59:59.999Z` : iso)
  return !Number.isNaN(time) && time > now
}

function wordCount(data: BlogPostData): number {
  const parts = [data.intro, ...data.sections.flatMap((s) => [s.heading, ...s.body])]
  return parts.join(' ').split(/\s+/).filter(Boolean).length
}

function rankedToBlogPost(data: BlogPostData): BlogPost {
  const content: BlogBlock[] = []
  for (const section of data.sections) {
    if (section.heading) {
      content.push({ type: 'heading', level: 2, text: section.heading })
    }
    for (const para of section.body) {
      if (para.trim()) content.push({ type: 'paragraph', text: para })
    }
  }

  const lastHeading = [...data.sections].reverse().find((s) => s.heading)?.heading ?? ''
  const hasCtaHeading = /contact|next step|ready when|schedule/i.test(lastHeading)
  if (data.cta && !hasCtaHeading) {
    content.push({
      type: 'callout',
      title: data.cta.label,
      text: 'Talk with the Absolute Wellness Center team in Eugene, OR about a plan that fits your health history and goals.',
      links: [{ label: data.cta.label, href: data.cta.href }],
    })
  }

  return {
    slug: data.slug,
    title: data.h1 || data.title,
    description: data.metaDescription,
    category: 'Wellness',
    author: 'Absolute Wellness Center',
    authorRole: 'Care Team',
    publishedAt: data.publishDate.slice(0, 10),
    readMinutes: Math.max(1, Math.round(wordCount(data) / 200)),
    cover: data.coverImage,
    coverAlt: data.coverAlt || data.title,
    excerpt: data.intro,
    content,
    relatedSlugs: data.relatedPosts?.map((p) => p.slug),
  }
}

export function toSiteBlogPost(data: BlogPostData): BlogPost {
  const local = getPost(data.slug)
  if (local) {
    return {
      ...local,
      publishedAt: data.publishDate.slice(0, 10),
      cover: data.coverImage || local.cover,
      coverAlt: data.coverAlt || local.coverAlt,
    }
  }
  return rankedToBlogPost(data)
}

function mergeBySlug(fallback: BlogPost[], cms: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>()
  for (const post of fallback) {
    if (!isFutureDated(post.publishedAt)) bySlug.set(post.slug, post)
  }
  for (const post of cms) {
    if (!isFutureDated(post.publishedAt)) bySlug.set(post.slug, post)
  }
  return [...bySlug.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export async function getPublishedSitePosts(): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPosts()
  const fallback = posts.map(toSiteBlogPost)
  const cms = await getPublishedPayloadPosts()
  return mergeBySlug(fallback, cms)
}

export async function getPublishedSitePost(
  slug: string,
  opts?: { draft?: boolean },
): Promise<BlogPost | undefined> {
  if (opts?.draft) {
    const draftPost = await getPayloadDraftPost(slug)
    if (draftPost) return draftPost
  }
  const posts = await getPublishedSitePosts()
  if (posts.some((post) => post.slug === slug)) {
    return posts.find((post) => post.slug === slug)
  }
  const ranked = await getPublishedBlogPost(slug)
  if (!ranked) return undefined
  const post = toSiteBlogPost(ranked)
  return isFutureDated(post.publishedAt) ? undefined : post
}

export function coverAbsoluteUrl(cover: string, site: string): string {
  if (/^https?:\/\//i.test(cover)) return cover
  return `${site}${cover.startsWith('/') ? cover : `/${cover}`}`
}

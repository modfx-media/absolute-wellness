import { getRankedContentDetail, isRankedConfigured, listRankedContent } from './client'
import { ensureUniqueCoverImages, getRankedCoverImage } from './cover'
import { fetchGoogleDocHtml } from './google-doc'
import {
  ensureUniquePublishDates,
  htmlToBlogPost,
  isBlogContentType,
  isRankedPostLive,
  publishDateFromRanked,
  slugFromTitle,
} from './html-to-post'
import { getLocalBlogPosts } from './local-posts'
import { articleBelongsToThisSite, configuredProjectIsThisSite, findThisSiteProject } from './this-site'
import type { BlogPostData, RankedContentDetail, RankedContentListItem } from './types'

async function resolveArticleHtml(
  item: RankedContentListItem,
  detail: RankedContentDetail | null,
): Promise<string | null> {
  const fromRanked = detail?.content_body?.trim()
  if (fromRanked) return fromRanked
  const docUrl = detail?.document_url || detail?.source_url || item.document_url || item.source_url
  return fetchGoogleDocHtml(docUrl)
}

function relatedFromLocal(excludeSlug: string): { title: string; slug: string }[] {
  return [...getLocalBlogPosts()]
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 3)
    .map((p) => ({ title: p.h1, slug: p.slug }))
}

function uniqueSlug(title: string, contentId: string, taken: Set<string>): string {
  const base = slugFromTitle(title)
  if (!taken.has(base)) return base
  const withId = `${base}-${contentId.slice(0, 8)}`
  if (!taken.has(withId)) return withId
  let i = 2
  while (taken.has(`${base}-${i}`)) i += 1
  return `${base}-${i}`
}

const TITLE_STOP = new Set([
  'for',
  'and',
  'in',
  'the',
  'a',
  'an',
  'to',
  'of',
  'with',
  'about',
  'how',
  'do',
  'it',
  'you',
  'your',
  'is',
  'on',
  'what',
  'when',
  'from',
])

function titleTokens(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/['’]s\b/g, '')
      .replace(/['’]/g, '')
      .split(/[^a-z0-9]+/)
      .map((w) => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w))
      .filter((w) => w.length > 2 && !TITLE_STOP.has(w)),
  )
}

function titlesAreSameArticle(a: string, b: string): boolean {
  const left = titleTokens(a)
  const right = titleTokens(b)
  let inter = 0
  const shared: string[] = []
  for (const token of left) {
    if (right.has(token)) {
      inter += 1
      shared.push(token)
    }
  }
  const union = left.size + right.size - inter
  const jaccard = union === 0 ? 0 : inter / union
  const distinctive = shared.some((t) =>
    ['semaglutide', 'ozempic', 'glp', 'tirzepatide'].includes(t),
  )
  return jaccard >= 0.32 || inter >= 4 || (distinctive && inter >= 3)
}

function isDuplicateOfLocal(title: string, localTitles: string[]): boolean {
  return localTitles.some((localTitle) => titlesAreSameArticle(title, localTitle))
}

export async function getLiveRankedBlogPosts(
  projectId?: string,
  opts: { generateCovers?: boolean; generateForSlug?: string } = {},
): Promise<BlogPostData[]> {
  if (!isRankedConfigured() && !projectId) return []
  const configured = process.env.RANKED_PROJECT_ID
  if (!process.env.RANKED_API_KEY || !configured) return []
  if (projectId && projectId !== configured) {
    console.error(`[ranked] refused to load project ${projectId} onto this site`)
    return []
  }
  const id = configured

  try {
    if (!(await configuredProjectIsThisSite())) {
      const match = await findThisSiteProject()
      if (match) {
        console.error(
          `[ranked] this domain needs RANKED_PROJECT_ID=${match.id} (${match.name}) — current id is another site`,
        )
      }
      return []
    }

    const items = await listRankedContent(id)
    const candidates = items.filter(
      (item) =>
        isBlogContentType(item.content_type) &&
        isRankedPostLive(item.status, item.scheduled_date) &&
        articleBelongsToThisSite(item.title, item.description),
    )
    const local = getLocalBlogPosts()
    const taken = new Set(local.map((p) => p.slug))
    const localTitles = local.map((p) => p.title)
    const reservedCovers = new Set(local.map((p) => p.coverImage))
    const resolved = await Promise.all(
      candidates
        .filter((item) => !isDuplicateOfLocal(item.title, localTitles))
        .map(async (item) => {
          let detail: RankedContentDetail | null = null
          try {
            detail = await getRankedContentDetail(item.id, id)
          } catch (err) {
            console.error(`[ranked] detail failed for ${item.id}`, err)
          }
          try {
            const html = await resolveArticleHtml(item, detail)
            if (!html) return null
            return { source: detail ?? item, html }
          } catch (err) {
            console.error(`[ranked] article HTML failed for ${item.id}`, err)
            return null
          }
        }),
    )

    const posts: BlogPostData[] = []
    for (const row of resolved) {
      if (!row) continue
      const { source, html } = row
      const slug = uniqueSlug(source.title, source.id, taken)
      const post = htmlToBlogPost({
        title: source.title,
        html,
        description: source.description,
        publishDate: publishDateFromRanked(source.scheduled_date, source.created_at),
        slug,
        coverImage: source.featured_image_url,
      })
      if (!post) continue
      post.coverImage = await getRankedCoverImage({
        contentId: source.id,
        title: source.title,
        slug,
        generate: Boolean(opts.generateCovers) || opts.generateForSlug === slug,
        reservedUrls: reservedCovers,
      })
      post.coverAlt = `${source.title} cover`
      post.relatedPosts = relatedFromLocal(slug)
      posts.push(post)
      taken.add(slug)
    }
    return ensureUniquePublishDates(ensureUniqueCoverImages(posts))
  } catch (err) {
    console.error('[ranked] failed to load content calendar', err)
    return []
  }
}

export async function getLiveRankedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  const posts = await getLiveRankedBlogPosts(undefined, { generateForSlug: slug })
  return posts.find((p) => p.slug === slug)
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPostData | undefined> {
  const posts = await getPublishedBlogPosts()
  return posts.find((p) => p.slug === slug)
}

export async function getPublishedBlogPosts(): Promise<BlogPostData[]> {
  const local = getLocalBlogPosts()
  const ranked = await getLiveRankedBlogPosts()
  const taken = new Set(local.map((p) => p.slug))
  const merged = [...local, ...ranked.filter((p) => !taken.has(p.slug))]
  return ensureUniquePublishDates(ensureUniqueCoverImages(merged))
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const posts = await getPublishedBlogPosts()
  return posts.map((p) => p.slug)
}

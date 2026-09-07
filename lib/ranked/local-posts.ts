import { POSTS } from '@/lib/blog'
import { DEFAULT_CTA } from './config'
import type { BlogPostData } from './types'

/** Existing compiled posts win on slug collision so a Ranked import cannot overwrite them. */
export function getLocalBlogPosts(): BlogPostData[] {
  return POSTS.map((post) => ({
    slug: post.slug,
    title: post.title,
    metaDescription: post.description,
    h1: post.title,
    publishDate: post.publishedAt.slice(0, 10),
    intro: post.excerpt,
    coverImage: post.cover,
    coverAlt: post.coverAlt ?? post.title,
    sections: [{ heading: post.title, body: [post.excerpt] }],
    cta: DEFAULT_CTA,
    relatedPosts: (post.relatedSlugs ?? [])
      .map((slug) => {
        const related = POSTS.find((p) => p.slug === slug)
        return related ? { title: related.title, slug: related.slug } : null
      })
      .filter((row): row is { title: string; slug: string } => Boolean(row)),
  }))
}

export const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://awceugene.com').replace(/\/$/, '')

export const DEFAULT_COVER = '/images/blog/default-cover.jpg'
export const DEFAULT_COVER_ALT = 'Absolute Wellness Center blog cover'

export const DEFAULT_CTA = {
  label: 'Contact us',
  href: '/contact/',
}

/** Cover prompt for Absolute Wellness Center. No patient faces / medical gore. */
export function coverPrompt(title: string): string {
  return [
    'Editorial photograph, 16:9 landscape, premium wellness clinic photography.',
    `Theme inspired by: ${title.slice(0, 120)}.`,
    'Calm natural light, chiropractic and regenerative medicine aesthetic, Eugene Oregon.',
    'Cinematic lighting, sharp, no grain, no watermark.',
    'No people faces, no medical gore, no needles in skin, no text, no letters, no logos, no captions, no readable signage.',
  ].join(' ')
}

/**
 * Slugs that already have a committed file at /images/blog/covers/{slug}.png
 * List only. Do not fs.stat public/ — that packs images into the cron bundle.
 */
export const COMMITTED_COVER_SLUGS: readonly string[] = []

/** Explicit cover files for Ranked slugs. String map only — never fs.readFile public/. */
export const COMMITTED_COVERS: Record<string, string> = {
  'eugene-glp-1-meal-prep-high-protein-budget-staples-and-local-picks':
    '/images/blog/ello-94KPme-Ibb4-unsplash.jpg',
}

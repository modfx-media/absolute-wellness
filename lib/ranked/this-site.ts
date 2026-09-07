import { SITE_ORIGIN } from './config'
import { listRankedProjects } from './client'
import type { RankedProject } from './types'

const FOREIGN_MARKET =
  /\b(orange county|huntington beach|irvine|costa mesa|newport beach|santa ana|anaheim|tustin|laguna|mission viejo|houston|austin|dallas|miami|living light|justin healthcare|cool pools)\b/i

function hostOf(url: string): string | null {
  try {
    const withProto = /^https?:\/\//i.test(url) ? url : `https://${url}`
    return new URL(withProto).hostname.replace(/^www\./, '').toLowerCase()
  } catch {
    return null
  }
}

export function thisSiteHost(): string {
  return hostOf(SITE_ORIGIN) || 'awceugene.com'
}

export function projectWebsite(project: RankedProject): string | null {
  return project.websiteUrl || project.website_url || null
}

export function projectBelongsToThisSite(project: RankedProject): boolean {
  const url = projectWebsite(project)
  if (!url) return false
  return hostOf(url) === thisSiteHost()
}

/** Drop other clients' articles if a calendar is mixed or the project ID is wrong. */
export function articleBelongsToThisSite(title: string, description: string | null): boolean {
  const hay = `${title}\n${description ?? ''}`
  return !FOREIGN_MARKET.test(hay)
}

export async function getConfiguredRankedProject(): Promise<RankedProject | null> {
  const id = process.env.RANKED_PROJECT_ID
  if (!id) return null
  const projects = await listRankedProjects()
  return projects.find((p) => p.id === id) ?? null
}

/**
 * This domain publishes one Ranked project: the one whose website is SITE_ORIGIN.
 * A foreign websiteUrl is a hard stop. Missing websiteUrl still allows fetch, but
 * articleBelongsToThisSite must filter the calendar.
 */
export async function configuredProjectIsThisSite(): Promise<boolean> {
  const id = process.env.RANKED_PROJECT_ID
  if (!id) return false

  const project = await getConfiguredRankedProject()
  if (!project) {
    console.error(
      `[ranked] RANKED_PROJECT_ID ${id} is not in this API key's project list — refusing to publish`,
    )
    return false
  }

  const url = projectWebsite(project)
  if (!url) {
    console.warn(
      `[ranked] project "${project.name}" has no website URL; publishing only articles that pass the this-site filter`,
    )
    return true
  }

  if (!projectBelongsToThisSite(project)) {
    console.error(
      `[ranked] project "${project.name}" is for ${url}, not ${SITE_ORIGIN} — refusing foreign calendar`,
    )
    return false
  }

  return true
}

export async function findThisSiteProject(): Promise<RankedProject | null> {
  const projects = await listRankedProjects()
  return projects.find(projectBelongsToThisSite) ?? null
}

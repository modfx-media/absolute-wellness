import { listRankedContent } from './client'
import { getRankedCoverImage } from './cover'
import { isBlogContentType, isRankedPostLive, slugFromTitle } from './html-to-post'
import { articleBelongsToThisSite, configuredProjectIsThisSite } from './this-site'

export async function generateLiveRankedCovers(projectId: string): Promise<string[]> {
  const expected = process.env.RANKED_PROJECT_ID
  if (!expected || projectId !== expected) {
    console.error(`[ranked] cover job blocked for foreign project ${projectId}`)
    return []
  }
  if (!(await configuredProjectIsThisSite())) {
    console.error('[ranked] cover job blocked — RANKED_PROJECT_ID is not this site')
    return []
  }

  const items = await listRankedContent(projectId)
  const slugs: string[] = []
  const reservedUrls = new Set<string>()

  for (const item of items) {
    if (
      !isBlogContentType(item.content_type) ||
      !isRankedPostLive(item.status, item.scheduled_date) ||
      !articleBelongsToThisSite(item.title, item.description)
    ) {
      continue
    }
    const slug = slugFromTitle(item.title)
    await getRankedCoverImage({
      contentId: item.id,
      title: item.title,
      slug,
      generate: true,
      reservedUrls,
    })
    slugs.push(slug)
  }

  return slugs
}

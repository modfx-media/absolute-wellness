import type { ReactNode } from 'react'
import Link from 'next/link'
import { linkifyPhone } from '@/lib/linkify-phone'

const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g

/**
 * Renders Ranked `[label](href)` markdown links as real anchors.
 * Remaining text still gets the clinic phone number linked.
 */
export function linkifyRichText(text: string): ReactNode {
  const nodes: ReactNode[] = []
  let last = 0
  let i = 0
  for (const match of text.matchAll(MD_LINK)) {
    const idx = match.index ?? 0
    if (idx > last) nodes.push(linkifyPhone(text.slice(last, idx)))
    const href = match[2]
    const label = match[1]
    if (href.startsWith('/')) {
      nodes.push(
        <Link
          key={`md-${i}`}
          href={href}
          className="font-semibold text-[#7E9146] underline underline-offset-2 hover:text-[#5a6a30]"
        >
          {label}
        </Link>,
      )
    } else {
      nodes.push(
        <a
          key={`md-${i}`}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="font-semibold text-[#7E9146] underline underline-offset-2 hover:text-[#5a6a30]"
        >
          {label}
        </a>,
      )
    }
    i += 1
    last = idx + match[0].length
  }
  if (last < text.length) nodes.push(linkifyPhone(text.slice(last)))
  if (nodes.length === 0) return linkifyPhone(text)
  return nodes
}

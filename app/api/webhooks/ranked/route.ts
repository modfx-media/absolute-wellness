import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Ranked CMS integration is disabled; ignore all incoming webhook events.
export async function POST() {
  return NextResponse.json({ ok: true, disabled: true })
}

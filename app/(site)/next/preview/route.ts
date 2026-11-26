import type { PayloadRequest } from "payload";
import { getPayload } from "payload";
import { getSafeRedirect } from "payload/shared";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import configPromise from "@payload-config";

export const dynamic = "force-dynamic";

function rejectedPath(path: string | null): boolean {
  if (path == null) return true;
  const trimmed = path.trim();
  return trimmed === "" || trimmed === "null" || trimmed === "undefined";
}

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const previewSecret = searchParams.get("previewSecret");
  const expected = process.env.PREVIEW_SECRET;

  if (!expected || previewSecret !== expected) {
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  if (rejectedPath(path)) {
    return new Response("Invalid path", { status: 400 });
  }

  const safePath = getSafeRedirect({ fallbackTo: "", redirectTo: path ?? "" });
  if (!safePath) {
    return new Response("Invalid path", { status: 400 });
  }

  let payload: Awaited<ReturnType<typeof getPayload>>;
  try {
    payload = await getPayload({ config: configPromise });
  } catch (error) {
    console.error("[preview] payload unavailable", error);
    return new Response("Preview is unavailable", { status: 503 });
  }

  let user;
  try {
    const authResult = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    });
    user = authResult.user;
  } catch (error) {
    payload.logger.error({ err: error }, "Error verifying token for live preview");
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  const draft = await draftMode();
  if (!user) {
    draft.disable();
    return new Response("You are not allowed to preview this page", { status: 403 });
  }

  draft.enable();
  redirect(safePath);
}

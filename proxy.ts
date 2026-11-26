import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SKIP_PREFIXES = ["/api", "/admin", "/next", "/_next"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (SKIP_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next();
  }
  if (pathname.includes(".") || pathname.endsWith("/")) {
    return NextResponse.next();
  }
  // NextURL.href reformats with the trailingSlash flag taken from the incoming
  // path. A slashless request has that flag off, so redirecting the cloned
  // NextURL emits Location: /blog (the same path) and the 308 loops.
  const url = new URL(request.url);
  url.pathname = `${pathname}/`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!api|admin|next|_next|.*\\..*).*)"],
};

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
  const url = request.nextUrl.clone();
  url.pathname = `${pathname}/`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!api|admin|next|_next|.*\\..*).*)"],
};

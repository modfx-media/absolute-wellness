const APEX = "https://awceugene.com";
const WWW = "https://www.awceugene.com";

function originOf(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    return new URL(withProtocol).origin;
  } catch {
    return trimmed.replace(/\/$/, "");
  }
}

/** Admin/API origin. Public canonicals stay on the apex site URL. */
export function getServerURL(): string {
  return (
    originOf(process.env.NEXT_PUBLIC_SERVER_URL) ||
    originOf(process.env.NEXT_PUBLIC_SITE_URL) ||
    APEX
  );
}

/** CORS and CSRF origins: apex, www, the configured server URL, and this deployment. */
export function getAllowedOrigins(): string[] {
  const origins = new Set<string>([APEX, WWW, getServerURL()]);
  const site = originOf(process.env.NEXT_PUBLIC_SITE_URL);
  if (site) origins.add(site);
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) origins.add(`https://${vercel}`);
  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }
  return [...origins];
}

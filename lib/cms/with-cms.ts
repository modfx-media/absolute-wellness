/**
 * Run a Payload read and fall back when the database is missing or down.
 * Public pages must keep rendering the hard-coded site.
 */
export async function withCMS<T>(load: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) return fallback;
  try {
    return await load();
  } catch (error) {
    console.error("[cms] unavailable, using fallback", error);
    return fallback;
  }
}

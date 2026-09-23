import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { GridPattern } from "@/components/home/decor";
import TestimonialsScroll from "@/components/home/TestimonialsScroll";

const BRAND = "#7E9146";

export type TestimonialItem = {
  name: string;
  quote: string;
  when: string;
};

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5H1.2v3.1C3.2 21.3 7.3 24 12 24Z" />
      <path fill="#FBBC05" d="M5.2 14.3A7.2 7.2 0 0 1 4.8 12c0-.8.1-1.6.4-2.3V6.6H1.2A12 12 0 0 0 0 12c0 1.9.5 3.8 1.2 5.4l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.1 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.6l4 3.1C6.2 6.8 8.9 4.8 12 4.8Z" />
    </svg>
  );
}

export default function Testimonials({
  items,
  rating,
  reviewCount,
  reviewsUrl,
  variant = "grid",
}: {
  items: TestimonialItem[];
  rating: number;
  reviewCount: number;
  reviewsUrl: string;
  variant?: "grid" | "scroll";
}) {
  if (items.length === 0) return null;

  const ratingLabel = rating > 0 ? rating.toFixed(1) : "";
  const countLabel = reviewCount > 0 ? reviewCount.toLocaleString("en-US") : "";

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <GridPattern className="opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <Reveal>
            <SectionPill icon={Icons.star("h-3.5 w-3.5")}>Google Reviews</SectionPill>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Real patients.{" "}
              <span style={{ color: BRAND }}>Five-star Google reviews.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              These are 5-star Google reviews with written comments from
              Absolute Wellness Center patients in Eugene.
            </p>
          </Reveal>
          {ratingLabel && countLabel ? (
            <Reveal delay={0.2}>
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-2.5 shadow-sm transition-colors hover:border-[#7E9146]/40"
              >
                <GoogleMark className="h-6 w-6" />
                <span className="text-yellow-400" aria-hidden>
                  ★★★★★
                </span>
                <span className="font-[family-name:var(--font-raleway)] text-sm font-bold text-gray-900">
                  {ratingLabel} on Google
                </span>
                <span className="text-sm text-gray-500">
                  {countLabel} reviews
                </span>
              </a>
            </Reveal>
          ) : null}
        </div>

        {variant === "scroll" ? (
          <div className="mt-16">
            <TestimonialsScroll items={items} />
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {items.map((item, index) => (
              <Reveal key={`${item.name}-${item.when}`} delay={index * 0.06}>
                <article className="flex h-full flex-col rounded-2xl bg-[#f7f9f2] p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-yellow-400" aria-label="5 star Google review">
                      ★★★★★
                    </span>
                    <GoogleMark className="h-5 w-5" />
                  </div>
                  <blockquote className="mt-5 flex-1 text-base leading-7 text-gray-700">
                    “{item.quote}”
                  </blockquote>
                  <footer className="mt-6 border-t border-black/5 pt-5">
                    <p className="font-[family-name:var(--font-raleway)] text-sm font-bold text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.when} · Google
                    </p>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border-2 px-8 py-3.5 font-[family-name:var(--font-raleway)] text-sm font-bold transition-all hover:bg-[#7E9146] hover:text-white"
              style={{ borderColor: BRAND, color: BRAND }}
            >
              View all Google reviews →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

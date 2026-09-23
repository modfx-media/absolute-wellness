"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const SERVICES = [
  "Regenerative Medicine",
  "Chiropractic Care",
  "Spinal Decompression",
  "Medical Weight Loss",
  "Nutritional IVs",
  "Joint Injections",
  "Hormone Therapy",
  "Physical Therapy",
  "Eugene, OR",
];

export type MarqueeReview = {
  name: string;
  quote: string;
};

function excerpt(quote: string, max = 88) {
  const clean = quote.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function Fade({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 z-10 w-24 ${side === "left" ? "left-0" : "right-0"}`}
      style={{
        background:
          side === "left"
            ? "linear-gradient(90deg, #f0f4e8, transparent)"
            : "linear-gradient(270deg, #f0f4e8, transparent)",
      }}
    />
  );
}

function ScrollTrack({
  children,
  duration,
  reverse = false,
}: {
  children: ReactNode;
  duration: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      className="flex w-max gap-3 whitespace-nowrap"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.div>
  );
}

export default function Marquee({ reviews = [] }: { reviews?: MarqueeReview[] }) {
  const serviceLoop = [...SERVICES, ...SERVICES];
  const reviewLoop = reviews.length > 0 ? [...reviews, ...reviews] : [];

  return (
    <div className="relative overflow-hidden border-y border-black/5 bg-[#f0f4e8] py-4">
      <Fade side="left" />
      <Fade side="right" />
      <div className="space-y-3">
        <ScrollTrack duration={45}>
          {serviceLoop.map((t, i) => (
            <span
              key={`service-${t}-${i}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#7E9146]/20 bg-white px-5 py-2 font-[family-name:var(--font-raleway)] text-sm font-bold uppercase tracking-[0.14em] text-gray-800 shadow-sm"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#7E9146" }}
              />
              {t}
            </span>
          ))}
        </ScrollTrack>

        {reviewLoop.length > 0 ? (
          <ScrollTrack duration={55} reverse>
            {reviewLoop.map((review, i) => (
              <span
                key={`review-${review.name}-${i}`}
                className="inline-flex max-w-[34rem] items-center gap-2 rounded-full border border-[#7E9146]/20 bg-white px-5 py-2 text-sm text-gray-800 shadow-sm"
              >
                <span className="text-yellow-400" aria-hidden>
                  ★★★★★
                </span>
                <span className="truncate font-[family-name:var(--font-lato)]">
                  “{excerpt(review.quote)}”
                </span>
                <span className="font-[family-name:var(--font-raleway)] text-xs font-bold uppercase tracking-[0.12em] text-[#5a6a30]">
                  {review.name}
                </span>
              </span>
            ))}
          </ScrollTrack>
        ) : null}
      </div>
    </div>
  );
}

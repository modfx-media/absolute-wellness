"use client";

import { motion, useReducedMotion } from "motion/react";

type TestimonialItem = {
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

function ReviewCard({ item }: { item: TestimonialItem }) {
  return (
    <article className="flex w-[320px] flex-shrink-0 flex-col rounded-2xl bg-[#f7f9f2] p-6 sm:w-[380px] sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="text-yellow-400" aria-label="5 star Google review">
          ★★★★★
        </span>
        <GoogleMark className="h-5 w-5" />
      </div>
      <blockquote className="mt-4 line-clamp-6 flex-1 text-sm leading-7 text-gray-700 sm:text-base">
        “{item.quote}”
      </blockquote>
      <footer className="mt-5 border-t border-black/5 pt-4">
        <p className="font-[family-name:var(--font-raleway)] text-sm font-bold text-gray-900">
          {item.name}
        </p>
        <p className="mt-1 text-xs text-gray-500">{item.when} · Google</p>
      </footer>
    </article>
  );
}

export default function TestimonialsScroll({ items }: { items: TestimonialItem[] }) {
  const reduce = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <motion.div
        className="flex w-max gap-5"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <ReviewCard key={`${item.name}-${item.when}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

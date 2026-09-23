"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Icons, SectionPill } from "./ui";

const BRAND = "#7E9146";

const SERVICES_PREVIEW = [
  { label: "Regenerative Medicine", value: "Non-surgical", icon: Icons.spark("h-4 w-4") },
  { label: "Chiropractic Care", value: "Hands-on", icon: Icons.hands("h-4 w-4") },
  { label: "IV Therapy", value: "Restorative", icon: Icons.drip("h-4 w-4") },
];

export default function Hero({
  rating = 0,
  reviewCount = 0,
  reviewsUrl = "https://www.google.com/maps",
}: {
  rating?: number;
  reviewCount?: number;
  reviewsUrl?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#070707] text-white"
    >
      {/* Background video */}
      <motion.div
        style={{ y: videoY }}
        className="absolute inset-0 -z-20 scale-105"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/young-couple-running.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Overlay 1 — base darken */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,7,0.78) 0%, rgba(7,7,7,0.55) 35%, rgba(7,7,7,0.72) 70%, rgba(7,7,7,0.95) 100%)",
        }}
      />
      {/* Overlay 2 — left-side gradient for legibility behind copy */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.55) 35%, rgba(7,7,7,0.15) 60%, rgba(7,7,7,0.45) 100%)",
        }}
      />
      {/* Overlay 3 — brand-tinted radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 85% 30%, rgba(126,145,70,0.32) 0%, transparent 70%), radial-gradient(45% 55% at 10% 80%, rgba(126,145,70,0.15) 0%, transparent 65%)",
        }}
      />
      {/* Overlay 4 — vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      {/* Overlay 5 — film grain */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />
      {/* Overlay 6 — fine grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Animated SVG motion graph — top-right ambient lines */}
      <svg
        aria-hidden
        viewBox="0 0 800 600"
        className="pointer-events-none absolute -right-20 -top-20 h-[520px] w-[680px] opacity-40"
      >
        <defs>
          <linearGradient id="awc-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#b8cd7a" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#7E9146" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b8cd7a" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M -50 ${120 + i * 60} Q 200 ${40 + i * 50}, 400 ${160 + i * 55} T 900 ${100 + i * 60}`}
            stroke="url(#awc-line)"
            strokeWidth={1.2}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, delay: 0.2 + i * 0.15, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
        {[
          { left: "12%", top: "22%", delay: 0, dur: 7 },
          { left: "78%", top: "18%", delay: 0.6, dur: 9 },
          { left: "62%", top: "70%", delay: 1.1, dur: 8 },
          { left: "30%", top: "82%", delay: 0.3, dur: 10 },
          { left: "88%", top: "55%", delay: 1.4, dur: 7 },
          { left: "45%", top: "30%", delay: 0.8, dur: 11 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: p.left,
              top: p.top,
              backgroundColor: "rgba(184,205,122,0.85)",
              boxShadow: "0 0 12px rgba(126,145,70,0.9)",
            }}
            animate={{ y: [0, -24, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Drifting brand blobs */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(126,145,70,0.45) 0%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 right-0 h-[480px] w-[480px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(184,205,122,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Light streak — animated diagonal */}
      <motion.div
        aria-hidden
        initial={{ x: "-30%", opacity: 0 }}
        animate={{ x: "130%", opacity: [0, 0.4, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/4 h-[200%] w-32 -rotate-12"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
        }}
      />

      {/* MAIN CONTENT */}
      <div className="relative mx-auto grid min-h-[94vh] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 lg:grid-cols-12 lg:gap-10 lg:py-32">
        {/* LEFT — copy */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="lg:col-span-7"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionPill icon={Icons.leaf("h-3.5 w-3.5")} inverted>
              Regenerative Medicine · Eugene, OR
            </SectionPill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-[family-name:var(--font-raleway)] text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-[80px]"
          >
            Get back to the{" "}
            <span
              className="relative inline-block"
              style={{
                background:
                  "linear-gradient(135deg, #d8e7a8 0%, #b8cd7a 40%, #7E9146 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              life you love
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full"
                style={{ background: "linear-gradient(90deg, #7E9146, transparent)" }}
              />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-8 text-gray-200/90"
          >
            Non-surgical, drug-free regenerative care, chiropractic, and IV
            therapy in a friendly, professional clinic — accepting new patients
            now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/appointments/"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 font-[family-name:var(--font-raleway)] text-base font-bold text-white shadow-2xl transition-all hover:gap-3"
              style={{
                backgroundColor: BRAND,
                boxShadow: "0 22px 50px -12px rgba(126,145,70,0.65)",
              }}
            >
              <span className="relative z-10">Request Appointment</span>
              <motion.span
                aria-hidden
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                →
              </motion.span>
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
            </Link>
            <a
              href="tel:+15414845777"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 font-[family-name:var(--font-raleway)] text-base font-bold text-white backdrop-blur transition-all hover:bg-white hover:text-gray-900"
            >
              <span className="transition-colors group-hover:text-[#7E9146]">
                {Icons.phone("h-5 w-5")}
              </span>
              (541) 484-5777
            </a>
          </motion.div>

          {/* Inline trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-gray-300"
          >
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <span className="text-yellow-400">★★★★★</span>
              {rating > 0 ? (
                <span className="font-semibold text-white">{rating.toFixed(1)}</span>
              ) : null}
              {reviewCount > 0 ? (
                <span className="text-gray-400">
                  · {reviewCount.toLocaleString("en-US")} Google reviews
                </span>
              ) : (
                <span className="text-gray-400">Google reviews</span>
              )}
            </a>
            <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 animate-pulse rounded-full"
                style={{ backgroundColor: "#22c55e" }}
              />
              Accepting new patients
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:inline-block" />
            <span>
              <span className="font-semibold text-white">Same-week</span>{" "}
              appointments
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT — motion-graphic composition */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative hidden h-[560px] lg:col-span-5 lg:block"
        >
          {/* Orbiting circular badge (back layer) */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute right-6 top-2 h-44 w-44"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path
                  id="awc-hero-ring"
                  d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
                />
              </defs>
              <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(126,145,70,0.25)" strokeDasharray="2 6" />
              <text fill="#b8cd7a" fontSize="11" fontWeight="700" letterSpacing="5">
                <textPath href="#awc-hero-ring">
                  ABSOLUTE WELLNESS • EUGENE OREGON • SINCE 2017 •
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center brand emblem inside orbit */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "backOut" }}
            className="absolute right-[88px] top-[58px] z-[1] flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-xl"
            style={{ boxShadow: "0 0 40px rgba(126,145,70,0.4)" }}
          >
            <span style={{ color: "#d8e7a8" }}>
              {Icons.leaf("h-9 w-9")}
            </span>
            {/* pulse ring */}
            <motion.span
              aria-hidden
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(184,205,122,0.6)" }}
            />
          </motion.div>

          {/* Top — Stat card (years) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="awc-float absolute left-0 top-4 w-56 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-baseline gap-2">
              <span
                className="font-[family-name:var(--font-raleway)] text-5xl font-black leading-none"
                style={{
                  background: "linear-gradient(135deg, #d8e7a8, #7E9146)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                9
              </span>
              <span className="text-sm font-bold text-white">+ years</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-300">
              Serving Eugene
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-300">
              <span style={{ color: BRAND }}>{Icons.shield("h-4 w-4")}</span>
              Trusted regenerative care
            </div>
          </motion.div>

          {/* Middle — Services preview card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="absolute right-0 top-[210px] w-72 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-[family-name:var(--font-raleway)] text-sm font-bold uppercase tracking-[0.14em] text-white">
                What we treat
              </p>
              <span
                className="inline-block h-2 w-2 animate-pulse rounded-full"
                style={{ backgroundColor: "#22c55e" }}
              />
            </div>
            <ul className="space-y-2.5">
              {SERVICES_PREVIEW.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2"
                >
                  <span
                    className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    {s.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">
                      {s.label}
                    </p>
                    <p className="text-[11px] text-gray-300">{s.value}</p>
                  </div>
                  <span className="text-gray-400">→</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Bottom — Now Accepting card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="awc-float-delayed absolute bottom-0 left-4 w-72 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: BRAND }}
              >
                {Icons.check("h-5 w-5")}
              </span>
              <div>
                <p className="font-[family-name:var(--font-raleway)] text-base font-bold text-white">
                  Now Accepting Patients
                </p>
                <p className="text-xs text-gray-300">Same-week available</p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between text-xs text-gray-300">
              <span>Capacity this week</span>
              <span className="font-bold text-white">90%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "90%" }}
                transition={{ duration: 1.4, delay: 1.4, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #7E9146, #b8cd7a)",
                }}
              />
            </div>
          </motion.div>

          {/* Decorative connecting line */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 400 560"
            fill="none"
          >
            <motion.path
              d="M 110 60 Q 260 180 320 270 Q 200 380 160 510"
              stroke="rgba(126,145,70,0.45)"
              strokeWidth={1.2}
              strokeDasharray="4 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gray-400 sm:flex"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px"
          style={{ background: "linear-gradient(to bottom, transparent, #7E9146)" }}
        />
      </motion.div>
    </section>
  );
}

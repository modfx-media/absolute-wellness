"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Icons, SectionPill } from "./ui";

const BRAND = "#7E9146";

const HOURS = [
  { day: "Mon", open: 9, close: 18 },
  { day: "Tue", open: 9, close: 18 },
  { day: "Wed", open: 9, close: 18 },
  { day: "Thu", open: 9, close: 18 },
  { day: "Fri", open: null, close: null },
  { day: "Sat", open: null, close: null },
  { day: "Sun", open: null, close: null },
] as const;

function useLiveStatus() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { open: false, label: "Loading hours…", todayIdx: -1 };
  const dow = (now.getDay() + 6) % 7; // 0=Mon
  const today = HOURS[dow];
  const hour = now.getHours() + now.getMinutes() / 60;
  const open =
    today.open !== null && today.close !== null && hour >= today.open && hour < today.close;
  const label = open
    ? `Open now · Closes at ${today.close}:00`
    : today.open !== null
      ? `Closed · Opens ${today.day} at ${today.open}:00`
      : `Closed today · Opens Monday at 9:00`;
  return { open, label, todayIdx: dow };
}

export default function LocationContact() {
  const reduce = useReducedMotion();
  const { open, label, todayIdx } = useLiveStatus();

  return (
    <section className="relative overflow-hidden bg-[#f7f9f2] py-16">
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #5a6a30 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: Dark contact panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-6 text-white shadow-2xl ring-1 ring-white/10 sm:p-7 lg:col-span-5"
          >
            {/* Decorative dot grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            {/* Brand glow corner */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
            />

            <div className="relative">
              <SectionPill icon={Icons.pin("h-3.5 w-3.5")} inverted>
                Find Us
              </SectionPill>

              <h2 className="mt-4 font-[family-name:var(--font-raleway)] text-3xl font-black tracking-tight sm:text-4xl">
                Visit Our Eugene <span style={{ color: BRAND }}>Clinic</span>
              </h2>

              {/* Live status pill */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs backdrop-blur">
                <span className="relative inline-flex h-2 w-2">
                  <span
                    className={`absolute inset-0 inline-flex rounded-full ${reduce ? "" : "animate-ping"} opacity-60`}
                    style={{ backgroundColor: open ? "#22c55e" : "#f97316" }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: open ? "#22c55e" : "#f97316" }}
                  />
                </span>
                <span className="font-semibold text-white">{label}</span>
              </div>

              {/* Contact cards */}
              <div className="mt-5 space-y-2.5">
                {[
                  {
                    icon: Icons.phone("h-5 w-5"),
                    label: "Call us",
                    value: "(541) 484-5777",
                    href: "tel:+15414845777",
                  },
                  {
                    icon: Icons.pin("h-5 w-5"),
                    label: "Address",
                    value: "2286 Oakmont Way, Eugene, OR 97401",
                    href: "https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts",
                    external: true,
                  },
                  {
                    icon: Icons.calendar("h-5 w-5"),
                    label: "Request appointment",
                    value: "Online booking available",
                    href: "/appointments/",
                  },
                ].map((row) => {
                  const Comp = row.href.startsWith("/") ? Link : "a";
                  return (
                    <Comp
                      key={row.label}
                      href={row.href}
                      {...(row.external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:-translate-y-0.5 hover:border-[#7E9146]/40 hover:bg-white/10"
                    >
                      <span
                        className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white transition-transform group-hover:scale-110 group-hover:rotate-3"
                        style={{ backgroundColor: BRAND }}
                      >
                        {row.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                          {row.label}
                        </p>
                        <p className="mt-1 truncate font-[family-name:var(--font-raleway)] text-base font-bold text-white">
                          {row.value}
                        </p>
                      </div>
                      <span className="text-gray-500 transition-all group-hover:translate-x-1 group-hover:text-[#7E9146]">
                        →
                      </span>
                    </Comp>
                  );
                })}
              </div>

              {/* Compact hours strip */}
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                    <span style={{ color: BRAND }}>{Icons.clock("h-3.5 w-3.5")}</span>
                    Hours
                  </div>
                  <span className="text-xs text-gray-400">
                    Mon–Thu <span className="font-bold text-white">9am–6pm</span> · Fri–Sun <span className="text-gray-500">Closed</span>
                  </span>
                </div>
                <div className="mt-2.5 flex gap-1">
                  {HOURS.map((h, i) => {
                    const isToday = i === todayIdx;
                    const closed = h.open === null;
                    return (
                      <div key={h.day} className="flex flex-1 flex-col items-center gap-1">
                        <span
                          className={`text-[10px] font-bold ${isToday ? "text-white" : closed ? "text-gray-600" : "text-gray-500"}`}
                        >
                          {h.day[0]}
                        </span>
                        <span
                          className="h-1 w-full rounded-full"
                          style={{
                            backgroundColor: closed
                              ? "rgba(255,255,255,0.08)"
                              : isToday
                                ? BRAND
                                : "rgba(126,145,70,0.45)",
                            boxShadow: isToday ? "0 0 8px rgba(126,145,70,0.7)" : undefined,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/appointments/"
                  className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 font-[family-name:var(--font-raleway)] text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl sm:text-base"
                  style={{
                    backgroundColor: BRAND,
                    boxShadow: "0 18px 40px -12px rgba(126,145,70,0.55)",
                  }}
                >
                  Request Appointment →
                </Link>
                <a
                  href="https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white/20 px-4 py-3 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-all hover:bg-white hover:text-gray-900 sm:text-base"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Map + modern info cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex flex-col gap-4 lg:col-span-7"
          >
            {/* Gradient frame around map */}
            <div
              className="relative flex-1 rounded-3xl p-[1.5px] shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(126,145,70,0.6) 0%, rgba(255,255,255,0.15) 40%, rgba(126,145,70,0.4) 100%)",
              }}
            >
              <div className="relative h-full min-h-[360px] overflow-hidden rounded-[calc(1.5rem-1px)] bg-white">
                <iframe
                  title="Absolute Wellness Center map"
                  src="https://www.google.com/maps?q=2286+Oakmont+Way,+Eugene,+OR+97401&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />

                {/* Pulse ring overlay - decorative */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative h-32 w-32">
                    {!reduce && (
                      <>
                        <span
                          className="absolute inset-0 rounded-full opacity-60"
                          style={{
                            backgroundColor: BRAND,
                            animation: "awc-pulse-ring 2.4s ease-out infinite",
                          }}
                        />
                        <span
                          className="absolute inset-0 rounded-full opacity-60"
                          style={{
                            backgroundColor: BRAND,
                            animation: "awc-pulse-ring 2.4s ease-out 1.2s infinite",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Top-left floating info card */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute left-5 top-5 max-w-[260px] rounded-2xl bg-white/95 p-4 shadow-xl ring-1 ring-black/10 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: BRAND }}
                    >
                      {Icons.pin("h-5 w-5")}
                    </span>
                    <div>
                      <p className="font-[family-name:var(--font-raleway)] text-sm font-bold text-gray-900">
                        Absolute Wellness Center
                      </p>
                      <p className="text-[11px] text-gray-500">
                        2286 Oakmont Way · Eugene
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#f7f9f2] px-2 py-0.5 font-semibold text-[#5a6a30]">
                      ★ 4.3
                    </span>
                    <span className="text-gray-500">98 Google reviews</span>
                  </div>
                </motion.div>

                {/* Bottom-right floating drive-time badge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="absolute bottom-5 right-5 rounded-2xl bg-[#0a0a0a]/90 p-4 text-white shadow-xl backdrop-blur"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                    From Downtown Eugene
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-raleway)] text-xl font-black">
                    ~12 min drive
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-300">
                    <span style={{ color: BRAND }}>{Icons.pin("h-3.5 w-3.5")}</span>
                    Free on-site parking
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Compact info strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-sm">
              {[
                { icon: Icons.pin("h-4 w-4"), label: "Free parking" },
                { icon: Icons.shield("h-4 w-4"), label: "Wheelchair access" },
                { icon: Icons.calendar("h-4 w-4"), label: "Same-week appts" },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                  className="flex items-center gap-2 text-xs font-semibold text-gray-700"
                >
                  <span style={{ color: BRAND }}>{c.icon}</span>
                  {c.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes awc-pulse-ring {
          0% {
            transform: scale(0.4);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

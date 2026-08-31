import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { MapPinPulse } from "@/components/MotionAccents";
import { buildPageGraph } from "@/lib/site-schema";
import ContactForm from "@/components/ContactForm";

const BRAND = "#7E9146";

const TITLE =
  "Regenerative Medicine Near Me - Contact Us | Absolute Wellness Center";
const DESCRIPTION =
  "Absolute Wellness Center - Visit our Regenerative Medicine clinic at 2286 Oakmont Way, Eugene, OR 97401 or call (541) 484-5777 to schedule!";
const URL = "https://awceugene.com/contact/";
const MAP_HREF =
  "https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts";
const FB_HREF = "https://www.facebook.com/AbsoluteWellnessCenter";
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.773763373674!2d-123.0786738238013!3d44.06738007108552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c11e43d57f03a5%3A0x8521ca537ea0eee8!2sAbsolute%20Wellness%20Center!5e0!3m2!1sen!2sba!4v1691417245166!5m2!1sen!2sba";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Absolute Wellness Center",
    locale: "en_US",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const pageSchema = buildPageGraph({
  url: URL,
  name: TITLE,
  description: DESCRIPTION,
  breadcrumb: [
    { name: "Home", item: "https://awceugene.com/" },
    { name: "Contact" },
  ],
});

const hours = [
  { day: "Monday",    time: "9:00 am – 6:00 pm", open: true },
  { day: "Tuesday",   time: "9:00 am – 6:00 pm", open: true },
  { day: "Wednesday", time: "9:00 am – 6:00 pm", open: true },
  { day: "Thursday",  time: "9:00 am – 6:00 pm", open: true },
  { day: "Friday",    time: "Closed",            open: false },
  { day: "Saturday",  time: "Closed",            open: false },
  { day: "Sunday",    time: "Closed",            open: false },
];

function FacebookIcon({ cls }: { cls?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden>
      <path d="M22 12a10 10 0 1 0-11.6 9.9V15h-2.5v-3h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 3h-2.4v6.9A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you — our team is ready to help"
        badge="Get In Touch"
        image="/images/young-couple-running.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* SECTION 1 — Contact layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-10 h-[380px] w-[380px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
            {/* LEFT */}
            <div>
              <Reveal>
                <SectionPill icon={Icons.pin("h-3.5 w-3.5")}>Find Us</SectionPill>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="mt-5">
                  <MapPinPulse size={72} />
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                  Visit Our <span style={{ color: BRAND }}>Eugene Clinic</span>
                </h2>
              </Reveal>

              <div className="mt-8 space-y-4">
                {/* Phone */}
                <Reveal delay={0.12}>
                  <a
                    href="tel:+15414845777"
                    className="group flex items-center gap-4 rounded-2xl bg-[#f7f9f2] p-6 ring-1 ring-[#7E9146]/10 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span
                      className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: "rgba(126,145,70,0.15)", color: BRAND }}
                    >
                      {Icons.phone("h-5 w-5")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
                        Phone
                      </p>
                      <p
                        className="font-[family-name:var(--font-raleway)] text-lg font-bold"
                        style={{ color: BRAND }}
                      >
                        (541) 484-5777
                      </p>
                    </div>
                  </a>
                </Reveal>

                {/* Address */}
                <Reveal delay={0.16}>
                  <a
                    href={MAP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl bg-[#f7f9f2] p-6 ring-1 ring-[#7E9146]/10 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span
                      className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: "rgba(126,145,70,0.15)", color: BRAND }}
                    >
                      {Icons.pin("h-5 w-5")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
                        Address
                      </p>
                      <p className="font-[family-name:var(--font-raleway)] text-base font-bold text-gray-900 group-hover:text-[#5a6a30]">
                        2286 Oakmont Way, Eugene, OR 97401
                      </p>
                    </div>
                  </a>
                </Reveal>

                {/* Business Hours */}
                <Reveal delay={0.2}>
                  <div className="rounded-2xl bg-[#f7f9f2] p-6 ring-1 ring-[#7E9146]/10">
                    <div className="flex items-center gap-4">
                      <span
                        className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: "rgba(126,145,70,0.15)", color: BRAND }}
                      >
                        {Icons.clock("h-5 w-5")}
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
                          Business Hours
                        </p>
                        <p className="font-[family-name:var(--font-raleway)] text-base font-bold text-gray-900">
                          Mon – Thu · 9am – 6pm
                        </p>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2 border-t border-[#7E9146]/10 pt-4">
                      {hours.map((h) => (
                        <li
                          key={h.day}
                          className="flex items-center justify-between text-sm"
                        >
                          <span
                            className={
                              h.open
                                ? "font-semibold text-gray-800"
                                : "font-medium text-gray-400"
                            }
                          >
                            {h.day}
                          </span>
                          <span className="flex items-center gap-2">
                            <span
                              className={
                                h.open
                                  ? "font-[family-name:var(--font-raleway)] font-bold"
                                  : "font-medium text-gray-400"
                              }
                              style={h.open ? { color: BRAND } : undefined}
                            >
                              {h.time}
                            </span>
                            {h.open ? (
                              <span
                                aria-label="Open"
                                className="inline-flex h-4 w-4 items-center justify-center rounded-full text-white"
                                style={{ backgroundColor: BRAND }}
                              >
                                {Icons.check("h-2.5 w-2.5")}
                              </span>
                            ) : (
                              <span
                                aria-label="Closed"
                                className="inline-block h-4 w-4 rounded-full bg-gray-200"
                              />
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/* Social */}
              <Reveal delay={0.24}>
                <div className="mt-8 flex items-center gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
                    Follow Us
                  </p>
                  <a
                    href={FB_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Absolute Wellness Center on Facebook"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-all hover:bg-[#7E9146] hover:text-white"
                    style={{ backgroundColor: "rgba(126,145,70,0.10)", color: BRAND }}
                  >
                    <FacebookIcon cls="h-5 w-5" />
                  </a>
                  <a
                    href={MAP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Absolute Wellness Center on Google Maps"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-all hover:bg-[#7E9146] hover:text-white"
                    style={{ backgroundColor: "rgba(126,145,70,0.10)", color: BRAND }}
                  >
                    {Icons.pin("h-5 w-5")}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — form */}
            <Reveal delay={0.15}>
              <ContactForm
                title="Send Us a Message"
                subtitle="We&apos;d love to hear from you. Our team typically replies within one business day."
                submitLabel="Send Message"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Google Map full width */}
      <section className="relative">
        <iframe
          src={MAP_EMBED}
          title="Absolute Wellness Center location on Google Maps"
          width="100%"
          height={400}
          className="block h-80 w-full border-0 sm:h-[400px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}

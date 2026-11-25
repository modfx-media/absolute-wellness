import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { CalendarGlow, DriftingOrbs } from "@/components/MotionAccents";
import { buildPageGraph } from "@/lib/site-schema";
import ContactForm from "@/components/ContactForm";

const BRAND = "#7E9146";

// Title matches live awceugene.com.
const TITLE = "Appointments in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Schedule an appointment at Absolute Wellness Center in Eugene, OR. Request online or call (541) 484-5777. Same-week appointments available.";
const URL = "https://awceugene.com/appointments/";
const MAP_HREF =
  "https://www.google.com/maps/place/Absolute+Wellness+Center+%7C+Car+Accident+Injury+Care/@44.0674053,-123.078739,1066m/data=!3m1!1e3!4m6!3m5!1s0x54c11e43d57f03a5:0x8521ca537ea0eee8!8m2!3d44.0673801!4d-123.0760989!16s%2Fg%2F1tkqz_bd!5m1!1e1?entry=tts";
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
    { name: "Appointments" },
  ],
});

const hours = [
  { day: "Mon – Thu", time: "9:00 am – 6:00 pm", open: true },
  { day: "Friday", time: "Closed", open: false },
  { day: "Sat – Sun", time: "Closed", open: false },
];

export default function AppointmentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Request an Appointment"
        subtitle="We'll get back to you shortly — same-week appointments available"
        badge="Book Today"
        image="/images/young-couple-running.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Appointments" }]}
      />

      {/* SECTION 1 — Appointment */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f9f2] via-white to-[#f0f4e8] py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-20 h-[480px] w-[480px] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* LEFT — contact + hours */}
            <div>
              <Reveal>
                <SectionPill icon={Icons.calendar("h-3.5 w-3.5")}>
                  Get In Touch
                </SectionPill>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                  Book Your <span style={{ color: BRAND }}>Appointment</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
                  Ready to start feeling better? Fill out the form or contact us
                  directly — our friendly staff will confirm your appointment
                  quickly.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 hidden w-fit rounded-2xl bg-[#0a0a0a] p-2 shadow-xl ring-1 ring-black/5 lg:block">
                  <CalendarGlow size={260} />
                </div>
              </Reveal>

              {/* Contact card */}
              <Reveal delay={0.18}>
                <div className="mt-8 space-y-5 rounded-2xl bg-[#f7f9f2] p-8 ring-1 ring-[#7E9146]/10">
                  <a
                    href="tel:+15414845777"
                    className="group flex items-center gap-4"
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
                      <p className="font-[family-name:var(--font-raleway)] text-lg font-bold text-gray-900 group-hover:text-[#5a6a30]">
                        (541) 484-5777
                      </p>
                    </div>
                  </a>

                  <a
                    href={MAP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4"
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
                </div>
              </Reveal>

              {/* Hours card */}
              <Reveal delay={0.22}>
                <div className="mt-6 rounded-2xl bg-[#f7f9f2] p-8 ring-1 ring-[#7E9146]/10">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "rgba(126,145,70,0.15)", color: BRAND }}
                    >
                      {Icons.clock("h-5 w-5")}
                    </span>
                    <h3 className="font-[family-name:var(--font-raleway)] text-xl font-bold text-gray-900">
                      Office Hours
                    </h3>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-center justify-between border-b border-[#7E9146]/10 pb-2.5 text-sm last:border-0 last:pb-0"
                      >
                        <span className="flex items-center gap-2 font-semibold text-gray-700">
                          {h.open && (
                            <span
                              aria-hidden
                              className="inline-block h-2 w-2 rounded-full"
                              style={{ backgroundColor: BRAND }}
                            />
                          )}
                          {h.day}
                        </span>
                        <span
                          className={
                            h.open
                              ? "font-[family-name:var(--font-raleway)] font-bold text-gray-900"
                              : "font-medium text-gray-400"
                          }
                        >
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — appointment form */}
            <Reveal delay={0.15}>
              <ContactForm
                title="Request an Appointment"
                subtitle="Fill out the form and our team will reach out to confirm your visit."
                submitLabel="Submit Request"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Google Map */}
      <section className="relative overflow-hidden bg-[#0a0a0a] py-12">
        <DriftingOrbs />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 text-white">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(126,145,70,0.2)", color: BRAND }}
              >
                {Icons.pin("h-5 w-5")}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
                  Visit Us
                </p>
                <p className="font-[family-name:var(--font-raleway)] font-bold">
                  2286 Oakmont Way, Eugene, OR 97401
                </p>
              </div>
            </div>
            <Link
              href={MAP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: BRAND }}
            >
              Get Directions
              {Icons.arrow("h-4 w-4")}
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
            <iframe
              src={MAP_EMBED}
              title="Absolute Wellness Center location on Google Maps"
              className="block h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons } from "@/components/home/ui";
import { buildPageGraph } from "@/lib/site-schema";

const BRAND = "#7E9146";

const TITLE = "Thank You | Absolute Wellness Center";
const DESCRIPTION =
  "Thank you for contacting Absolute Wellness Center in Eugene, OR. We've received your request and will be in touch shortly. For urgent matters, call (541) 484-5777.";
const URL = "https://awceugene.com/thank-you/";

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
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const pageSchema = buildPageGraph({
  url: URL,
  name: TITLE,
  description: DESCRIPTION,
  breadcrumb: [
    { name: "Home", item: "https://awceugene.com/" },
    { name: "Thank You" },
  ],
});

export default function ThankYouPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Thank You"
        subtitle="Your request has been received."
        badge="Confirmation"
        image="/images/meditation-1920.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Thank You" }]}
      />

      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: `radial-gradient(circle, ${BRAND} 0%, transparent 70%)` }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <span
              className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg"
              style={{
                backgroundColor: BRAND,
                boxShadow: "0 18px 40px -16px rgba(126,145,70,0.6)",
              }}
              aria-hidden
            >
              {Icons.check("h-10 w-10")}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-8 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              We&apos;ll be in touch{" "}
              <span style={{ color: BRAND }}>shortly.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 text-base leading-8 text-gray-600">
              Thank you for reaching out to Absolute Wellness Center. A member
              of our team has received your request and will follow up with you
              by phone or email within one business day to confirm your
              appointment.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-2 text-sm text-gray-500">
              Need help right away? Give us a call at{" "}
              <a
                href="tel:+15414845777"
                className="font-bold underline-offset-4 hover:underline"
                style={{ color: BRAND }}
              >
                (541) 484-5777
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: BRAND }}
              >
                Back to Home
                {Icons.arrow("h-4 w-4")}
              </Link>
              <Link
                href="/services/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#7E9146] px-8 py-4 font-[family-name:var(--font-raleway)] text-sm font-bold text-[#7E9146] transition-colors hover:bg-[#7E9146] hover:text-white"
              >
                Explore Our Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

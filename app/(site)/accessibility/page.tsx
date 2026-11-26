import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { ConditionProse } from "@/components/ConditionSections";
import { buildPageGraph } from "@/lib/site-schema";

const TITLE = "Accessibility in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION = "Accessibility -";
const URL = "https://awceugene.com/accessibility/";

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
    { name: "Accessibility" },
  ],
});

export default function AccessibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Accessibility"
        subtitle="Our commitment to providing full and equal access to every patient and visitor."
        badge="Accessibility"
        image="/images/walking-women-1920-web-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Accessibility" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/Accessibility/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <SectionPill icon={Icons.shield("h-3.5 w-3.5")}>Our Commitment</SectionPill>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Full and equal <span style={{ color: "#7E9146" }}>access</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <ConditionProse>
              <h3>Overview</h3>
              <p>
                At Absolute Wellness Center, we respect the dignity and
                independence of our guests and we are committed to providing
                full and equal access to everyone who visits our facility and
                website. Here&rsquo;s what you can expect from us:
              </p>

              <h3>Communication</h3>
              <p>
                We are committed to effectively communicating with our guests.
                We provide, at no charge, auxiliary aids and services which are
                reasonably necessary to achieve effective communication. We
                accept Operator Relay Service calls, and Teletypewriter
                (TTY/TDD) calls through 711, in the same manner as traditional
                telephonic channels.
              </p>

              <h3>Website Access</h3>
              <p>
                We endeavor to develop and update website content using current
                technologies that effectively communicate with and afford full
                and equal access to persons with disabilities. We make every
                effort necessary to meet online usability and design
                requirements, including those recommended by the World Wide Web
                Consortium (W3C) in its Web Content Accessibility Guidelines
                2.1 as well as requirements under the Twenty-First Century
                Communications and Video Accessibility Act of 2010.
              </p>

              <h3>Assistive Devices</h3>
              <p>
                Our customers and guests are welcome to use their own personal
                assistive devices to access our merchandise and services. If an
                assistive device or technology is incompatible with our
                facilities, we will work with our customers and guests to
                provide full and equal access through alternative measures.
              </p>

              <h3>Companions and Service Animals</h3>
              <p>
                Companions, guide dogs or other service animals are welcome to
                accompany guests with disabilities while visiting our facility.
                We will also sensitively, respectfully and discretely provide
                personal assistance when requested.
              </p>

              <h3>Interruption of Services</h3>
              <p>
                If we are temporarily unable to offer any special facilities or
                services that assist customers and guests with disabilities, we
                will immediately provide notice of this interruption and the
                anticipated time when these services will be resumed.
              </p>

              <h3>Training</h3>
              <p>
                Our entire staff receives ongoing and documented training in
                order to properly communicate with and provide sensitive,
                helpful and respectful assistance to our customers and guests
                with disabilities.
              </p>

              <h3>Modification of Policies or Procedures</h3>
              <p>
                We will make reasonable modifications to our policies or
                procedures when it is necessary to provide our customers and
                guests with full and equal access to our facility, website or
                communications channels.
              </p>
              <p>
                We are continuously working to improve the accessibility of
                content on our website. If you are looking for mouse and
                keyboard alternatives, speech recognition software such as
                Dragon NaturallySpeaking may help you navigate web pages and
                online services. This software allows the user to move focus
                around a web page or application screen through voice controls.
              </p>

              <h3>Customer Feedback</h3>
              <p>
                We actively encourage the participation of all customers and
                guests in our feedback process. In addition to sharing your
                comments in person, you may also contact us by:
              </p>
              <p>
                <strong>Mail:</strong> 2286 Oakmont Way, Eugene, OR 97401
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:awceugene@comcast.net"
                  className="text-[#7E9146] underline underline-offset-2 hover:text-[#5a6a30]"
                >
                  awceugene@comcast.net
                </a>
              </p>
              <p>
                If you feel that these standards have not been maintained in
                your situation, please let us know by calling:{" "}
                <a
                  href="tel:+15414845777"
                  className="text-[#7E9146] underline underline-offset-2 hover:text-[#5a6a30]"
                >
                  (541) 484-5777
                </a>{" "}
                we gladly accept TRS calls.
              </p>
            </ConditionProse>
          </Reveal>
        </div>
      </section>
    </>
  );
}

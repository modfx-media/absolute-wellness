import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/home/Reveal";
import { Icons, SectionPill } from "@/components/home/ui";
import { ConditionProse } from "@/components/ConditionSections";
import { buildPageGraph } from "@/lib/site-schema";

const TITLE = "Privacy Policy in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Privacy Policy - Absolute Wellness Center | Notice of Privacy Practices Effective 08/04/2020 Your Information. Your Rights. Our Responsibilities. This notice describes how";
const URL = "https://awceugene.com/privacy-policy/";

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
    { name: "Privacy Policy" },
  ],
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <PageHero
        title="Privacy Policy"
        subtitle="Notice of Privacy Practices — your information, your rights, our responsibilities."
        badge="Privacy Policy"
        image="/images/walking-women-1920-web-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      {/* [B] LIVE CONTENT — verbatim from awceugene.com/privacy-policy/ */}
      <section className="relative overflow-hidden bg-white py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, #7E9146 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <SectionPill icon={Icons.shield("h-3.5 w-3.5")}>HIPAA Notice</SectionPill>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-[family-name:var(--font-raleway)] text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              Absolute Wellness Center{" "}
              <span style={{ color: "#7E9146" }}>Notice of Privacy Practices</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <ConditionProse>
              <p>
                <strong>Effective 08/04/2020</strong>
              </p>

              <h3>Your Information. Your Rights. Our Responsibilities.</h3>
              <p>
                This notice describes how medical information about you may be
                used and disclosed and how you can get access to this
                information. Please review it carefully.
              </p>

              <h3>Your Rights</h3>
              <p>
                When it comes to your health information, you have certain
                rights. This section explains your rights and some of our
                responsibilities to help you. You can get an electronic or
                paper copy of your medical record:
              </p>
              <p>
                You can ask to see or get an electronic or paper copy of your
                medical record and other health information we have about you.
                Ask us how to do this.
              </p>
              <p>
                We will provide a copy or a summary of your health information.
                We may charge a reasonable, cost-based fee.
              </p>

              <h4>ASK US TO CORRECT YOUR MEDICAL RECORD</h4>
              <p>
                You can ask us to correct health information about you that you
                think is incorrect or incomplete. Ask us how to do this.
              </p>
              <p>
                We may say &ldquo;no&rdquo; to your request, but we&rsquo;ll
                tell you why in writing within 60 days.
              </p>

              <h4>REQUEST CONFIDENTIAL COMMUNICATIONS</h4>
              <p>
                You can ask us to contact you in a specific way (for example,
                home or office phone) or to send mail to a different address.
              </p>
              <p>We will say &ldquo;yes&rdquo; to all reasonable requests.</p>

              <h4>ASK US TO LIMIT WHAT WE USE OR SHARE</h4>
              <p>
                You can ask us not to use or share certain health information
                for treatment, payment, or our operations. We are not required
                to agree to your request, and we may say &ldquo;no&rdquo; if it
                would affect your care.
              </p>
              <p>
                If you pay for a service or health care item out-of-pocket in
                full, you can ask us not to share that information for the
                purpose of payment or our operations with your health insurer.
                We will say &ldquo;yes&rdquo; unless a law requires us to share
                that information.
              </p>

              <h4>GET A LIST OF THOSE WITH WHOM WE&rsquo;VE SHARED INFORMATION</h4>
              <p>
                You can ask for a list (accounting) of the times we&rsquo;ve
                shared your health information for six years prior to the date
                you ask, who we shared it with, and why.
              </p>
              <p>
                We will include all the disclosures except for those about
                treatment, payment, and health care operations, and certain
                other disclosures (such as any you asked us to make).
                We&rsquo;ll provide one accounting a year for free but will
                charge a reasonable, cost-based fee if you ask for another one
                within 12 months.
              </p>

              <h4>GET A COPY OF THIS PRIVACY NOTICE</h4>
              <p>
                You can ask for a paper copy of this notice at any time, even
                if you have agreed to receive the notice electronically. We
                will provide you with a paper copy promptly.
              </p>

              <h4>CHOOSE SOMEONE TO ACT FOR YOU</h4>
              <p>
                If you have given someone medical power of attorney or if
                someone is your legal guardian, that person can exercise your
                rights and make choices about your health information.
              </p>
              <p>
                We will make sure the person has this authority and can act for
                you before we take any action.
              </p>

              <h4>FILE A COMPLAINT IF YOU FEEL YOUR RIGHTS ARE VIOLATED</h4>
              <p>
                You can complain if you feel we have violated your rights by
                contacting us at 775-683-9026.
              </p>
              <p>
                You can file a complaint with the U.S. Department of Health and
                Human Services Office for Civil Rights by sending a letter to
                200 Independence Avenue, S.W., Washington, D.C. 20201, calling
                1-877-696-6775, or visiting{" "}
                <a
                  href="https://www.hhs.gov/ocr/privacy/hipaa/complaints"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#7E9146] underline underline-offset-2 hover:text-[#5a6a30]"
                >
                  www.hhs.gov/ocr/privacy/hipaa/complaints
                </a>
              </p>
              <p>We will not retaliate against you for filing a complaint.</p>

              <h3>Your Choices</h3>
              <p>
                For certain health information, you can tell us your choices
                about what we share. If you have a clear preference for how we
                share your information in the situations described below, talk
                to us. Tell us what you want us to do, and we will follow your
                instructions. In these cases, you have both the right and
                choice to tell us to:
              </p>
              <ul>
                <li>
                  Share information with your family, close friends, or others
                  involved in your care
                </li>
                <li>Share information in a disaster relief situation</li>
                <li>Include your information in a hospital directory</li>
              </ul>
              <p>
                If you are not able to tell us your preference, for example if
                you are unconscious, we may go ahead and share your information
                if we believe it is in your best interest. We may also share
                your information when needed to lessen a serious and imminent
                threat to health or safety.
              </p>
              <p>
                In these cases we never share your information unless you give
                us written permission:
              </p>
              <ul>
                <li>Marketing purposes</li>
                <li>Sale of your information</li>
                <li>Most sharing of psychotherapy notes</li>
              </ul>
              <p>
                In the case of fundraising: We may contact you for fundraising
                efforts, but you can tell us not to contact you again.
              </p>

              <h3>Our Uses and Disclosures</h3>
              <h4>HOW DO WE TYPICALLY USE OR SHARE YOUR HEALTH INFORMATION?</h4>
              <p>
                We typically use or share your health information in the
                following ways:
              </p>

              <h4>TREAT YOU</h4>
              <p>
                We can use your health information and share it with other
                professionals who are treating you. Example: A doctor treating
                you for an injury asks another doctor about your overall health
                condition.
              </p>

              <h4>RUN OUR ORGANIZATION</h4>
              <p>
                We can use and share your health information to run our
                practice, improve your care, and contact you when necessary.
                Example: We use health information about you to manage your
                treatment and services.
              </p>

              <h4>BILL FOR YOUR SERVICES</h4>
              <p>
                We can use and share your health information to bill and get
                payment from health plans or other entities. Example: We give
                information about you to your health insurance plan so it will
                pay for your services.
              </p>

              <h4>HOW ELSE CAN WE USE OR SHARE YOUR HEALTH INFORMATION?</h4>
              <p>
                We are allowed or required to share your information in other
                ways &ndash; usually in ways that contribute to the public
                good, such as public health and research. We have to meet many
                conditions in the law before we can share your information for
                these purposes. For more information see:{" "}
                <a
                  href="https://www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#7E9146] underline underline-offset-2 hover:text-[#5a6a30]"
                >
                  www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html
                </a>
              </p>

              <h4>HELP WITH PUBLIC HEALTH AND SAFETY ISSUES</h4>
              <p>
                We can share health information about you for certain
                situations such as:
              </p>
              <ul>
                <li>Preventing disease</li>
                <li>Helping with product recalls</li>
                <li>Reporting adverse reactions to medications</li>
                <li>Reporting suspected abuse, neglect, or domestic violence</li>
                <li>
                  Preventing or reducing a serious threat to anyone&rsquo;s
                  health or safety
                </li>
              </ul>

              <h4>DO RESEARCH</h4>
              <p>We can use or share your information for health research.</p>

              <h4>COMPLY WITH THE LAW</h4>
              <p>
                We will share information about you if state or federal laws
                require it, including with the Department of Health and Human
                Services if it wants to see that we&rsquo;re complying with
                federal privacy law.
              </p>

              <h4>RESPOND TO ORGAN AND TISSUE DONATION REQUESTS</h4>
              <p>
                We can share health information about you with organ
                procurement organizations.
              </p>

              <h4>WORK WITH A MEDICAL EXAMINER OR FUNERAL DIRECTOR</h4>
              <p>
                We can share health information with a coroner, medical
                examiner, or funeral director when an individual dies.
              </p>

              <h4>
                ADDRESS WORKERS&rsquo; COMPENSATION, LAW ENFORCEMENT, AND OTHER
                GOVERNMENT REQUESTS
              </h4>
              <p>We can use or share health information about you:</p>
              <ul>
                <li>For workers&rsquo; compensation claims</li>
                <li>
                  For law enforcement purposes or with a law enforcement
                  official
                </li>
                <li>
                  With health oversight agencies for activities authorized by
                  law
                </li>
                <li>
                  For special government functions such as military, national
                  security, and presidential protective services
                </li>
              </ul>

              <h4>RESPOND TO LAWSUITS AND LEGAL ACTIONS</h4>
              <p>
                We can share health information about you in response to a
                court or administrative order, or in response to a subpoena.
              </p>

              <h3>Our Responsibilities</h3>
              <p>
                We are required by law to maintain the privacy and security of
                your protected health information.
              </p>
              <p>
                We will let you know promptly if a breach occurs that may have
                compromised the privacy or security of your information.
              </p>
              <p>
                We must follow the duties and privacy practices described in
                this notice and give you a copy of it.
              </p>
              <p>
                We will not use or share your information other than as
                described here unless you tell us we can in writing. If you
                tell us we can, you may change your mind at any time. Let us
                know in writing if you change your mind.
              </p>

              <h4>SMS Registration</h4>
              <p>
                SMS consent and phone numbers will never be shared with third
                parties or affiliates under any circumstances.
              </p>

              <h4>FOR MORE INFORMATION SEE:</h4>
              <p>
                <a
                  href="https://www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[#7E9146] underline underline-offset-2 hover:text-[#5a6a30]"
                >
                  www.hhs.gov/ocr/privacy/hipaa/understanding/consumers/noticepp.html
                </a>
              </p>

              <h3>CHANGES TO THE TERMS OF THIS NOTICE</h3>
              <p>
                We can change the terms of this notice, and the changes will
                apply to all information we have about you. The new notice will
                be available upon request, in our office, and on our website.
              </p>
            </ConditionProse>
          </Reveal>
        </div>
      </section>
    </>
  );
}

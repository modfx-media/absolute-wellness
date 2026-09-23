import type { Metadata } from "next";
import { Raleway, Lato } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { isFiveStarReview } from "@/lib/reviews";
import {
  aggregateRatingJsonLd,
  medicalBusinessSchema,
  reviewJsonLd,
} from "@/lib/site-schema";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://awceugene.com"),
  alternates: { canonical: "/" },
  title: "Absolute Wellness Center | Eugene, OR",
  description:
    "Absolute Wellness Center provides regenerative medicine, chiropractic care, and IV therapy in Eugene, OR. Accepting new patients — call (541) 484-5777 or book online.",
  openGraph: {
    type: "website",
    siteName: "Absolute Wellness Center",
    locale: "en_US",
    url: "https://awceugene.com",
    title: "Absolute Wellness Center",
    description:
      "Absolute Wellness Center provides regenerative medicine, chiropractic care, and IV therapy in Eugene, OR. Accepting new patients — call (541) 484-5777 or book online.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Absolute Wellness Center - Regenerative Medicine in Eugene OR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Absolute Wellness Center",
    description:
      "Absolute Wellness Center provides regenerative medicine, chiropractic care, and IV therapy in Eugene, OR. Accepting new patients — call (541) 484-5777 or book online.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  const visible = reviews.filter(isFiveStarReview);
  const reviewSchema = {
    ...medicalBusinessSchema,
    ...(aggregateRatingJsonLd(meta.rating, meta.reviewCount)
      ? { aggregateRating: aggregateRatingJsonLd(meta.rating, meta.reviewCount) }
      : {}),
    ...(visible.length ? { review: reviewJsonLd(visible) } : {}),
  };

  return (
    <html
      lang="en"
      className={`${raleway.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#0a0a0a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-2Q667CTX7D" />
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yj6n1ijruw");
        `}
      </Script>
    </html>
  );
}

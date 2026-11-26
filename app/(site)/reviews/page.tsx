import type { Metadata } from "next";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import Testimonials from "@/components/home/Testimonials";
import PageHero from "@/components/PageHero";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";
import { isFiveStarReview } from "@/lib/reviews";
import { buildPageGraph } from "@/lib/site-schema";

const TITLE = "Google Reviews in Eugene, OR | Absolute Wellness Center";
const DESCRIPTION =
  "Read 5-star Google reviews from Absolute Wellness Center patients in Eugene, OR. Call (541) 484-5777 or request an appointment online.";
const URL = "https://awceugene.com/reviews/";

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

export default async function ReviewsPage() {
  const { reviews, meta } = await getDisplayedGoogleReviews();
  const visible = reviews.filter(isFiveStarReview);
  const pageSchema = buildPageGraph({
    url: URL,
    name: TITLE,
    description: DESCRIPTION,
    breadcrumb: [
      { name: "Home", item: "https://awceugene.com/" },
      { name: "Reviews" },
    ],
    reviews: visible,
    rating: meta.rating,
    reviewCount: meta.reviewCount,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <PageHero
        title="Google Reviews"
        subtitle="Five-star Google reviews from Absolute Wellness Center patients in Eugene, OR."
        badge="Patient Stories"
        image="/images/young-couple-running.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reviews" },
        ]}
        ctas={[
          { label: "Request Appointment", href: "/appointments/", variant: "primary" },
          { label: "View on Google", href: meta.reviewsUrl, variant: "outline" },
        ]}
      />
      <GoogleReviews>
        {({ reviews: items, meta: reviewMeta }) => (
          <Testimonials
            items={items.map((review) => ({
              name: review.name,
              quote: review.quote,
              when: review.relativeTime ?? "Posted on Google",
            }))}
            rating={reviewMeta.rating}
            reviewCount={reviewMeta.reviewCount}
            reviewsUrl={reviewMeta.reviewsUrl}
          />
        )}
      </GoogleReviews>
    </>
  );
}

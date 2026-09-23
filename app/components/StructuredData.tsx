import { googleReviewsMeta } from "@/lib/reviews";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness"],
    // Must match the `@id` used by `medicalBusinessSchema` in `lib/site-schema.ts`
    // so Google merges these into a single business entity on pages that emit
    // both (otherwise the graph node and this node each carry their own
    // aggregateRating, which trips the "Review has multiple aggregate ratings"
    // rich-result error in Search Console).
    "@id": "https://awceugene.com/#medicalbusiness",
    name: "Absolute Wellness Center",
    url: "https://awceugene.com",
    telephone: "+1-541-484-5777",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2286 Oakmont Way",
      addressLocality: "Eugene",
      addressRegion: "OR",
      postalCode: "97401",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(googleReviewsMeta.rating),
      reviewCount: String(googleReviewsMeta.reviewCount),
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

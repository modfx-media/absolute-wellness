// Shared schema fragments that mirror the live awceugene.com JSON-LD graph.
// Every subpage embeds WebPage + BreadcrumbList + this WebSite + LocalBusiness.

import { isFiveStarReview, type GoogleReview } from "./reviews";

export const SITE_URL = "https://awceugene.com";

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "Absolute Wellness Center",
  description: "Regenerative Medicine in Eugene, OR",
  potentialAction: [
    {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?s={search_term_string}`,
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        valueRequired: true,
        valueName: "search_term_string",
      },
    },
  ],
  inLanguage: "en-US",
};

// Richer MedicalBusiness representation for the clinic — used at the site
// root and on every page graph so Google has a consistent practice entity.
export const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "MedicalClinic", "LocalBusiness"],
  "@id": `${SITE_URL}/#medicalbusiness`,
  name: "Absolute Wellness Center",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/Absolute-Wellness-Center-Logo.jpg`,
  telephone: "+1-541-484-5777",
  priceRange: "$$",
  description:
    "Regenerative medicine clinic in Eugene, OR offering bioidentical hormone therapy, medical weight loss with semaglutide, peripheral neuropathy treatment, chiropractic care, spinal decompression, joint injections, and physical therapy.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2286 Oakmont Way",
    addressLocality: "Eugene",
    addressRegion: "OR",
    postalCode: "97401",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.0721,
    longitude: -123.0867,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://www.facebook.com/AbsoluteWellnessCenter"],
  medicalSpecialty: [
    "Chiropractic",
    "PhysicalTherapy",
    "Endocrine",
    "Nutrition",
    "PainMedicine",
  ],
};

export function buildServiceSchema(opts: {
  url: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: opts.name,
    url: opts.url,
    description: opts.description,
    procedureType: opts.serviceType,
    ...(opts.image ? { image: opts.image } : {}),
    provider: { "@id": `${SITE_URL}/#medicalbusiness` },
    ...(opts.areaServed && opts.areaServed.length
      ? {
          areaServed: opts.areaServed.map((a) => ({
            "@type": "City",
            name: a,
          })),
        }
      : {}),
  };
}

export function reviewJsonLd(reviews: GoogleReview[]) {
  return reviews.filter(isFiveStarReview).map((review) => ({
    "@type": "Review",
    author: { "@type": "Person", name: review.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    reviewBody: review.quote,
  }));
}

export function aggregateRatingJsonLd(rating: number, reviewCount: number) {
  if (!(rating > 0) || !(reviewCount > 0)) return undefined;
  return {
    "@type": "AggregateRating",
    ratingValue: String(rating),
    reviewCount: String(reviewCount),
    bestRating: "5",
  };
}

export function buildPageGraph(opts: {
  url: string;
  name: string;
  description: string;
  breadcrumb: { name: string; item?: string }[];
  datePublished?: string;
  dateModified?: string;
  reviews?: GoogleReview[];
  rating?: number;
  reviewCount?: number;
}) {
  const breadcrumbId = `${opts.url}#breadcrumb`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": opts.url,
        url: opts.url,
        name: opts.name,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#medicalbusiness` },
        ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
        ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
        description: opts.description,
        breadcrumb: { "@id": breadcrumbId },
        inLanguage: "en-US",
        potentialAction: [{ "@type": "ReadAction", target: [opts.url] }],
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: opts.breadcrumb.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          ...(b.item ? { item: b.item } : {}),
        })),
      },
      websiteSchema,
      {
        ...medicalBusinessSchema,
        ...(opts.rating != null && opts.reviewCount != null
          ? {
              aggregateRating: aggregateRatingJsonLd(
                opts.rating,
                opts.reviewCount,
              ),
            }
          : {}),
        ...(opts.reviews?.length
          ? { review: reviewJsonLd(opts.reviews) }
          : {}),
      },
    ],
  };
}

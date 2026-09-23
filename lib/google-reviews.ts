import { cache } from "react";
import {
  fiveStarReviews,
  googleReviewsMeta,
  isFiveStarReview,
  sortReviewsNewestFirst,
  type GoogleReview,
  type GoogleReviewsMeta,
} from "./reviews";

const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const PLACES_FIELD_MASK =
  "id,rating,userRatingCount,googleMapsUri,reviews.rating,reviews.text,reviews.originalText,reviews.authorAttribution,reviews.relativePublishTimeDescription,reviews.publishTime";

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type LegacyPlaceReview = {
  rating?: number;
  text?: string;
  author_name?: string;
  relative_time_description?: string;
  time?: number;
};

type LegacyDetailsResponse = {
  status?: string;
  error_message?: string;
  result?: { reviews?: LegacyPlaceReview[] };
};

type PlacesDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  error?: { message?: string; status?: string };
};

function uniqueFiveStarReviews(reviews: GoogleReview[]): GoogleReview[] {
  const seen = new Set<string>();
  const unique: GoogleReview[] = [];
  for (const review of reviews) {
    if (!isFiveStarReview(review)) continue;
    const key = `${review.name.trim().toLowerCase()}|${review.quote.trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(review);
  }
  return sortReviewsNewestFirst(unique);
}

function fallbackPayload(): GoogleReviewsPayload {
  const reviews = uniqueFiveStarReviews(fiveStarReviews);
  return {
    reviews,
    meta: { ...googleReviewsMeta, fiveStarCount: reviews.length },
  };
}

function mapPlaceReview(review: PlacesReview): GoogleReview | null {
  const quote = (review.text?.text ?? review.originalText?.text ?? "").trim();
  const name = review.authorAttribution?.displayName?.trim() ?? "";
  const rating = review.rating ?? 0;

  // Exact 5 only. Drop 4, 4.5, empty text, and nameless authors here.
  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relativePublishTimeDescription,
    publishedAt: review.publishTime,
  };
}

function mapLegacyReview(review: LegacyPlaceReview): GoogleReview | null {
  const quote = (review.text ?? "").trim();
  const name = review.author_name?.trim() ?? "";
  const rating = review.rating ?? 0;
  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relative_time_description,
    publishedAt:
      typeof review.time === "number"
        ? new Date(review.time * 1000).toISOString()
        : undefined,
  };
}

async function fetchNewestLegacyReviews(
  apiKey: string,
  placeId: string,
): Promise<GoogleReview[]> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&reviews_sort=newest&key=${encodeURIComponent(apiKey)}`,
    {
      next: {
        revalidate: REVIEWS_REVALIDATE_SECONDS,
        tags: ["google-reviews"],
      },
    },
  );
  const data = (await response.json()) as LegacyDetailsResponse;
  if (!response.ok || data.status !== "OK") return [];
  return (data.result?.reviews ?? [])
    .map(mapLegacyReview)
    .filter((review): review is GoogleReview => review !== null);
}

/**
 * Places API (New), then 5-star reviews with text only.
 * Google returns at most 5 most-relevant reviews. Filter that set.
 */
export const getDisplayedGoogleReviews = cache(
  async (): Promise<GoogleReviewsPayload> => {
    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY?.trim() ||
      process.env.GOOGLE_API_KEY?.trim();
    const placeId =
      process.env.GOOGLE_PLACE_ID?.trim() || googleReviewsMeta.placeId;

    if (!apiKey || placeId.startsWith("REPLACE_")) return fallbackPayload();

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": PLACES_FIELD_MASK,
          },
          next: {
            revalidate: REVIEWS_REVALIDATE_SECONDS,
            tags: ["google-reviews"],
          },
        },
      );

      const data = (await response.json()) as PlacesDetailsResponse;

      if (!response.ok || data.error) {
        console.error(
          "Google Places reviews request failed:",
          data.error?.message ?? response.statusText,
        );
        return fallbackPayload();
      }

      const newestReviews = await fetchNewestLegacyReviews(apiKey, placeId).catch(
        () => [] as GoogleReview[],
      );
      const liveReviews = (data.reviews ?? [])
        .map(mapPlaceReview)
        .filter((review): review is GoogleReview => review !== null);
      const reviews = uniqueFiveStarReviews([
        ...newestReviews,
        ...liveReviews,
        ...fiveStarReviews,
      ]);

      if (reviews.length === 0) return fallbackPayload();

      return {
        reviews,
        meta: {
          rating: data.rating ?? googleReviewsMeta.rating,
          reviewCount: data.userRatingCount ?? googleReviewsMeta.reviewCount,
          fiveStarCount: reviews.length,
          placeId,
          reviewsUrl: data.googleMapsUri ?? googleReviewsMeta.reviewsUrl,
        },
      };
    } catch (error) {
      console.error("Google Places reviews fetch error:", error);
      return fallbackPayload();
    }
  },
);

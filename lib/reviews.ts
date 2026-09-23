/**
 * Per-client Google review types + fallback.
 * Fallback quotes must be real 5-star Google reviews for THIS business.
 * Leave googleReviews empty if none are on file.
 */
export const googleReviewsMeta = {
  rating: 4.3, // Google's overall, all stars
  reviewCount: 102, // Google's total, all stars
  fiveStarCount: 6,
  placeId: "ChIJpQN_1UMewVQR6O6gflPKIYU",
  reviewsUrl: "https://maps.google.com/?cid=9593171141231439592",
} as const;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
  publishedAt?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: "Daniel Hernandez jr",
    rating: 5,
    relativeTime: "2 months ago",
    publishedAt: "2026-07-17T18:17:25.000Z",
    quote: "Great people always willing to help you feel better",
  },
  {
    name: "Oregon Dave",
    rating: 5,
    relativeTime: "2 months ago",
    publishedAt: "2026-07-08T16:16:38.000Z",
    quote: "Thorough.  Professional.  Great mannerism!",
  },
  {
    name: "Heather Hohnstein",
    rating: 5,
    relativeTime: "3 months ago",
    publishedAt: "2026-06-16T01:01:34.153Z",
    quote:
      "Dr. Wise and all the staff are fantastic! From the moment you walk in you are greeted and treated in a friendly and respectful way. I appreciate how Dr. Wise explains everything so clearly and has a great sense of humor!",
  },
  {
    name: "MDT",
    rating: 5,
    relativeTime: "6 months ago",
    publishedAt: "2026-03-25T22:23:29.863Z",
    quote:
      "If you are in pain go see these providers! They know what they are doing! They are kind and encouraging. My care plan consisted of PT, Chiro, PRP and decompression. For the first time in years I do not have back pain.",
  },
  {
    name: "MeeshaLovesDogs",
    rating: 5,
    relativeTime: "6 months ago",
    publishedAt: "2026-03-18T22:54:57.839Z",
    quote:
      "I can't say enough about this team at Absolute Wellness Center. I came to them after having an injury to my back and leg. They listened to me and put together a plan to help me get out of pain. Dr. Wise took time to answer all my questions. I worked with Jack and Kell with physical therapy and their hands on approach helped me get out of pain and back to a regular exercise routine. The NP took the time to talk about how my food choices were keeping me from getting the most from my treatments. My PCP has NEVER taken the time to do this for me so I was quite shocked to see all these people come together in one rehabilitation clinic and go so far above and beyond just to help me get out of pain. Connie at the front desk is was welcoming and happy to help with my tight work schedule. The clinic manager even gave me her card and let me know she was always available if I needed anything. If you need to do some physical therapy or need an excellent chiropractor this is the place to go!!! They truly care.",
  },
  {
    name: "Carole Angius",
    rating: 5,
    relativeTime: "9 months ago",
    publishedAt: "2025-12-18T02:30:05.302Z",
    quote:
      "I’ve been dealing with back  issues for a year now trying to find someplace that could help help me and then I found Absolute Wellness center. This is the one stop shop for all Your body ailments.  The CHIROPRACTOR Dr. Weiss is absolutely wonderful. The office staff are very helpful and kind and the physical therapist is a real sweetheart. They all are very helpful and trying their very best to solve any pain issues you may have. I’m so grateful I found this place!.",
  },
];

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return review.rating === 5 && review.quote.trim().length > 0 && review.name.trim().length > 0;
}

export function sortReviewsNewestFirst(reviews: GoogleReview[]): GoogleReview[] {
  return [...reviews].sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return bTime - aTime;
  });
}

export const fiveStarReviews = sortReviewsNewestFirst(
  googleReviews.filter(isFiveStarReview),
);

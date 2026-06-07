import { site } from "@/lib/site";
import { reviews } from "@/lib/content/reviews";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${site.url}/#hotel`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: [`${site.url}/og-image.svg`],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    starRating: { "@type": "Rating", ratingValue: 4 },
    priceRange: "MAD 880 – MAD 2 890",
    amenityFeature: [
      "Free Wi-Fi", "Free parking", "Restaurant", "Room service",
      "24-hour front desk", "Non-smoking rooms", "Air conditioning", "Garden",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    checkinTime: site.policies.checkIn,
    checkoutTime: site.policies.checkOut,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.score,
      bestRating: site.rating.max,
      ratingCount: site.rating.count,
    },
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.createdAt,
      reviewBody: r.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.score,
        bestRating: 10,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

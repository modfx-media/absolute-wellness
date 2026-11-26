import { ImageResponse } from "next/og";
import { CITIES, getCity } from "@/lib/areas";
import { notFound } from "next/navigation";

export const alt = "Absolute Wellness Center — Serving Oregon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #5a6a30 0%, #7E9146 55%, #b8cd7a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5a6a30",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            A
          </div>
          Absolute Wellness Center
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 4,
              opacity: 0.9,
            }}
          >
            Now Serving
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              lineHeight: 1,
              maxWidth: 1000,
            }}
          >
            {`${city.name}, OR`}
          </div>
          <div style={{ fontSize: 32, opacity: 0.92, maxWidth: 980 }}>
            {`Regenerative medicine, hormone therapy, weight loss, neuropathy & chiropractic care — ${Math.round(city.driveMinutes)} min from our Eugene clinic.`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            fontWeight: 600,
            borderTop: "1px solid rgba(255,255,255,0.35)",
            paddingTop: 24,
          }}
        >
          <span>{`awceugene.com/areas/${city.slug}`}</span>
          <span>(541) 484-5777</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { CITIES, SERVICES, getCity, getService } from "@/lib/areas";
import { notFound } from "next/navigation";

export const alt = "Absolute Wellness Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const out: { city: string; service: string }[] = [];
  for (const c of CITIES) for (const s of SERVICES) out.push({ city: c.slug, service: s.slug });
  return out;
}

export default async function Image({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCity(citySlug);
  const service = getService(serviceSlug);
  if (!city || !service) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
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
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5a6a30",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            A
          </div>
          Absolute Wellness Center
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 22,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 3,
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            {service.badge}
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 900,
              lineHeight: 1.05,
              maxWidth: 1050,
            }}
          >
            {`${service.name} in ${city.name}, OR`}
          </div>
          <div style={{ fontSize: 28, opacity: 0.92, maxWidth: 980 }}>
            {service.short}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
            borderTop: "1px solid rgba(255,255,255,0.35)",
            paddingTop: 20,
          }}
        >
          <span>{`awceugene.com/areas/${city.slug}/${service.slug}`}</span>
          <span>(541) 484-5777</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

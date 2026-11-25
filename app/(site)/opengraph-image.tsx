import { ImageResponse } from "next/og";

export const alt = "Absolute Wellness Center — Regenerative Medicine in Eugene, OR";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5a6a30",
              fontSize: 36,
              fontWeight: 900,
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Absolute Wellness Center
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.05, maxWidth: 920 }}>
            Regenerative Medicine in Eugene, OR
          </div>
          <div style={{ fontSize: 30, opacity: 0.92, maxWidth: 880 }}>
            BHRT · Medical Weight Loss · Neuropathy · Chiropractic · Joint Care
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
          <span>awceugene.com</span>
          <span>(541) 484-5777</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

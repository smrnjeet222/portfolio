import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Simranjeet Singh - Resume";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ResumeOpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #050505 0%, #0a0f0a 50%, #050a0f 100%)",
          color: "#e6e6e6",
          fontFamily: "monospace",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "24px",
            color: "#888",
          }}
        >
          <span style={{ color: "#ff5555" }}>●</span>
          <span style={{ color: "#f1fa8c" }}>●</span>
          <span style={{ color: "#50fa7b" }}>●</span>
          <span style={{ marginLeft: "16px" }}>resume.pdf - jeet22.xyz</span>
        </div>

        <div
          style={{
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div style={{ fontSize: "28px", color: "#6272a4", display: "flex" }}>
            <span style={{ color: "#50fa7b" }}>$ </span>
            <span>cat ~/resume.md</span>
          </div>

          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#f8f8f2",
              lineHeight: 1.05,
              letterSpacing: "-3px",
            }}
          >
            Resume
          </div>

          <div style={{ fontSize: "40px", color: "#8be9fd" }}>
            Simranjeet Singh
          </div>

          <div style={{ fontSize: "30px", color: "#bd93f9" }}>
            Senior Software Engineer · AI · Fullstack · Web3
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "22px",
            color: "#6272a4",
          }}
        >
          <span style={{ color: "#50fa7b" }}>view · download · share</span>
          <span>jeet22.xyz/resume</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

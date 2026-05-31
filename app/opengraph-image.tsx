import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Simranjeet Singh — Senior Software Engineer (AI · Fullstack · Web3)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
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
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(80,250,123,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(139,233,253,0.12), transparent 40%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "24px",
            color: "#8be9fd",
          }}
        >
          <span style={{ color: "#50fa7b" }}>●</span>
          <span style={{ color: "#f1fa8c" }}>●</span>
          <span style={{ color: "#ff5555" }}>●</span>
          <span style={{ marginLeft: "16px", color: "#888" }}>
            jeet22.xyz — ~/portfolio
          </span>
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", fontSize: "28px", color: "#6272a4" }}>
            <span style={{ color: "#50fa7b" }}>jeet@portfolio</span>
            <span style={{ color: "#888" }}>:</span>
            <span style={{ color: "#8be9fd" }}>~</span>
            <span style={{ color: "#888" }}>$ whoami</span>
          </div>

          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#f8f8f2",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            Simranjeet Singh
          </div>

          <div
            style={{
              fontSize: "36px",
              color: "#8be9fd",
              display: "flex",
              gap: "16px",
            }}
          >
            <span style={{ color: "#ff79c6" }}>{">"}</span>
            <span>Senior Software Engineer</span>
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#bd93f9",
              marginTop: "4px",
            }}
          >
            AI · Fullstack · Web3 · 5+ yrs · 0→1 builder
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "22px",
            color: "#6272a4",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span style={{ color: "#ff79c6" }}>agentic ai</span>
            <span style={{ color: "#bd93f9" }}>llm/rag</span>
            <span style={{ color: "#8be9fd" }}>typescript</span>
            <span style={{ color: "#f1fa8c" }}>react/next</span>
            <span style={{ color: "#50fa7b" }}>go/node/python</span>
            <span style={{ color: "#ffb86c" }}>solidity</span>
          </div>
          <div style={{ color: "#888" }}>jeet22.xyz</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

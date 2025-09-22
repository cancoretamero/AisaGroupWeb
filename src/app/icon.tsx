import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0E7C66 0%, #8BC34A 100%)",
          color: "#F7F7F7",
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "Inter, system-ui, sans-serif",
          letterSpacing: 4,
        }}
      >
        AG
      </div>
    ),
    {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );
}

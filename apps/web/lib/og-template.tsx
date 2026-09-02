export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function ogImageTemplate({
  headlineLines,
  sub,
}: {
  headlineLines: string[];
  sub: string;
}) {
  return (
    <div
      style={{
        background: "#0E0E1D",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 90px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 6,
          height: "100%",
          background: "#E8623C",
        }}
      />

      <div
        style={{
          color: "#E8623C",
          fontSize: 13,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 28,
          display: "flex",
        }}
      >
        nafizanam.com
      </div>

      <div
        style={{
          color: "#F4F4F8",
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 28,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {headlineLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      <div
        style={{
          color: "#F4F4F8",
          opacity: 0.45,
          fontSize: 22,
          lineHeight: 1.6,
          maxWidth: 640,
          display: "flex",
        }}
      >
        {sub}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 70,
          right: 90,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "#E8623C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 52,
          fontWeight: 700,
        }}
      >
        NA
      </div>
    </div>
  );
}

interface PageTemplateProps {
  title:     string;
  code?:     string;
  children?: React.ReactNode;
}

export default function PageTemplate({ title, code, children }: PageTemplateProps) {
  return (
    // Fixed window between the nav buttons (~13 vh) and the Jopalesi button (~16 vh from bottom).
    <main
      className="page-scroll"
      style={{
        position:  "fixed",
        top:       "13vh",
        bottom:    "16vh",
        left:      0,
        right:     "1.2rem",
        overflowY: "auto",
        padding:   "0 0 0 2rem",
      }}
    >
      {code && (
        <p
          style={{
            fontSize:      "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            opacity:       0.4,
            marginBottom:  "1.2rem",
          }}
        >
          /{code}
        </p>
      )}

      <h1
        style={{
          fontSize:      "clamp(2rem, 5vw, 3.5rem)",
          fontWeight:    300,
          letterSpacing: "-0.02em",
          lineHeight:    1,
          marginBottom:  "2rem",
        }}
      >
        {title}
      </h1>

      {children && (
        <div
          style={{
            fontSize:   "0.8rem",
            lineHeight: 1.8,
            opacity:    0.65,
            maxWidth:   "38rem",
          }}
          className="space-y-4"
        >
          {children}
        </div>
      )}
    </main>
  );
}

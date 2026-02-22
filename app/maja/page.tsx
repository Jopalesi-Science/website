export default function MajaPage() {
  return (
    <main className="min-h-screen flex flex-col justify-end px-8 pb-16 gap-6">
      <div
        style={{
          border:    "2px solid #bdb2a3",
          maxWidth:  "32rem",
          padding:   "1.2rem 1.5rem",
          background: "#0a0a0c",
        }}
      >
        <p
          style={{
            fontSize:      "0.75rem",
            letterSpacing: "0.05em",
            lineHeight:    1.75,
            color:         "#bdb2a3",
            opacity:       0.65,
            margin:        0,
          }}
        >
          Curiosity, Inquiry and Critical Exploration are forms of Expression.
          Jopalesi is a platform to share, develop and realize these expressions.
          We seek collaborations and we believe in open and accessible data.
        </p>
      </div>
      <p className="text-xs tracking-[0.2em] opacity-40 max-w-xs leading-relaxed">
        A space for things that resist easy categorisation.
      </p>
    </main>
  );
}

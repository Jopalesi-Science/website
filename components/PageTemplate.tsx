interface PageTemplateProps {
  title: string;
  code?: string;
  children: React.ReactNode;
}

export default function PageTemplate({ title, code, children }: PageTemplateProps) {
  return (
    <main className="min-h-screen flex flex-col justify-end px-8 pb-16 pt-32">
      {/* Page identifier */}
      {code && (
        <span className="text-xs tracking-[0.35em] uppercase opacity-40 mb-4">
          /{code}
        </span>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-12 leading-none">
        {title}
      </h1>

      {/* Content */}
      <div className="max-w-xl text-sm leading-relaxed opacity-70 space-y-4">
        {children}
      </div>
    </main>
  );
}

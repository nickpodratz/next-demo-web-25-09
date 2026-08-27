type PageShellProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  bare?: boolean;
};

export default function PageShell({
  title,
  description,
  children,
  className = "",
  contentClassName = "",
  bare = false,
}: PageShellProps) {
  return (
    <section className={className}>
      {(title || description) && (
        <header className="mb-8">
          {title && (
            <h1 className="text-4xl font-bold tracking-tight text-navy">{title}</h1>
          )}
          {description && (
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-navy-soft">
              {description}
            </p>
          )}
        </header>
      )}

      {bare ? (
        children
      ) : (
        <div
          className={`rounded-3xl bg-white p-8 shadow-sm sm:p-12 ${contentClassName}`}
        >
          {children}
        </div>
      )}
    </section>
  );
}

import Link from "next/link";

const baseClass =
  "inline-flex items-center justify-center rounded-full border border-navy/10 bg-white px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-colors hover:border-lilac hover:bg-lilac/10";

export default function Button({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${baseClass} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

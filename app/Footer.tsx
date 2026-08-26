import Link from "next/link";
import { navLinks } from "./navigation";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <p className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white">
            <span className="flex size-8 items-center justify-center rounded-lg bg-lemon font-mono text-xs font-bold text-navy">
              {"</>"}
            </span>
            Next&nbsp;Demo
          </p>
          <p className="pt-3 text-sm leading-relaxed">
            The Next Demo project of Web 25-09.
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</p>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm transition-colors hover:text-lemon">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-6 py-4 text-xs text-white/50">
          © {new Date().getFullYear()} Next Demo
        </p>
      </div>
    </footer>
  );
}

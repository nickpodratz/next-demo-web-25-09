"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ links }: { links: { href: string, label: string }[] }) {
  const pathname = usePathname()

  return (
    <>
      {links.map(link => (
        <span key={link.href}>
          {pathname === link.href ? (
            <span className="text-gray-400">{link.label}</span>
          ) : (
            <Link href={link.href} className="text-blue-500 hover:underline">
              {link.label}
            </Link>
          )}
        </span>
      ))}
    </>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname()
  const links = [
    { href: "/", label: "Home" },
    { href: "/users", label: "Users" },
    { href: "/login", label: "login" },
    { href: "/pokemons", label: "Pokemons" },
  ];

  return (
    <nav className="flex gap-4">
      {links.map(link => (
        <span key={link.href}>
          {pathname === link.href ? (
            <span className="text-gray-400">{link.label}</span> // disabled
          ) : (
            <Link href={link.href} className="text-blue-500 hover:underline">
              {link.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
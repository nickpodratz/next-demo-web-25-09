import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "./login/actions";
import SubmitButton from "./components/SubmitButton";
import NavLinks from "./NavLinks";

export default async function NavBar() {
  const user = await getCurrentUser()

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/pokemons", label: "Pokemons" },
    { href: "/users", label: "Users" },
  ];

  return (
    <nav className="flex gap-4 items-center p-4">
      <NavLinks links={links} />

      <span className="ml-auto flex gap-4 items-center">
        {user ? (
          <>
            <span>{user.name}</span>
            <form action={logout}>
              <SubmitButton pendingText="Logging out…" className="border-0 bg-transparent px-0 py-0 text-blue-500 hover:underline">Logout</SubmitButton>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
            <Link href="/sign_up" className="text-blue-500 hover:underline">Sign up</Link>
          </>
        )}
      </span>
    </nav>
  );
}

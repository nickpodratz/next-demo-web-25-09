import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "./login/actions";
import SubmitButton from "./components/SubmitButton";
import NavLinks from "./NavLinks";
import { navLinks } from "./navigation";

export default async function NavBar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-lg shadow-navy/30">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-6">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-lemon font-mono text-xs font-bold text-navy">
            {"</>"}
          </span>
          Next&nbsp;Demo
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          <NavLinks links={navLinks} />
        </div>

        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <span className="flex items-center gap-2 text-sm text-white/80">
                <span className="flex size-7 items-center justify-center rounded-full bg-lilac text-xs font-bold text-navy">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name}
              </span>
              <form action={logout}>
                <SubmitButton
                  pendingText="Logging out…"
                  className="rounded-full border border-white/25 bg-transparent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
                >
                  Logout
                </SubmitButton>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/sign_up"
                className="rounded-full bg-lemon px-4 py-1.5 text-sm font-semibold text-navy transition-transform hover:scale-105"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="flex items-center gap-1 overflow-x-auto px-4 pb-3 sm:hidden">
        <NavLinks links={navLinks} />
      </div>
    </header>
  );
}

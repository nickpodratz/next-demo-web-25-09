# Authentication

## Design

Sessions are stored in the database (`Session` model), keyed by a 256-bit random ID delivered as an `httpOnly` cookie (`sessionId`, `SameSite=Lax`, `Secure` in production, 7-day TTL).

Passwords are hashed with **argon2id** (64 MiB memory, 3 iterations) in `lib/password.ts`.

## Flow

- **Sign-up** (`app/sign_up/actions.ts`): validates input, creates the author, maps the unique-email constraint violation to a field error, starts a session, redirects to the profile.
- **Login** (`app/login/actions.ts`): looks up the author by email and verifies the password. When the email is unknown, it verifies against a decoy digest instead, so response timing does not reveal whether an account exists. On success it rotates the session (destroys any current one), purges expired sessions, and redirects.
- **Logout**: destroys the session, clears the cookie, redirects to `/login`.

## Reading the current user

`lib/auth.ts` exposes:

- `getCurrentUser()` — reads the cookie, returns the session's author or `null`. Wrapped in React `cache()` so one request hits the database once no matter how many components ask.
- `requireUser()` — same, but throws `Unauthorized` for use inside Server Actions.

Authorization is enforced server-side: e.g. `deletePost` checks post ownership before deleting, regardless of what the UI shows.

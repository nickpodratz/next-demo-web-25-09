# Architecture

## Project layout

```
app/            Routes, layouts, and route-local components (App Router)
app/components/ Shared UI (Button, SubmitButton)
lib/            Server-only services: auth, sessions, passwords, validation
prisma/         Schema, migrations, seed script, Prisma client singleton
scripts/        Vercel build script
docs/           These guides
```

## Rendering model

Every route is **dynamically rendered**: the root layout renders `NavBar`, which reads the session cookie via `cookies()`. Request-time APIs opt the whole tree out of static prerendering.

Conventions used throughout:

- **Server Components by default.** Only components that need state or browser APIs declare `"use client"` (`NavLinks`, `Counter`, the forms, `BlogPost`).
- **Server Actions** (`actions.ts` next to each route) handle all mutations. Forms submit directly to actions; list pages call `revalidatePath` after writes.
- **Streaming**: `/pokemons` wraps its grid in `<Suspense>` so the shell renders immediately while data loads; `error.tsx` provides the error boundary.
- **Data access** stays behind `server-only` service modules (`lib/author.service.ts`, `app/blog/service.ts`) so Prisma never leaks into client bundles.

## Fetch caching

External `fetch` calls state their caching explicitly: the Pokémon list uses `cache: "force-cache"` (stable data), the random dog uses `cache: "no-store"` (fresh on every request).

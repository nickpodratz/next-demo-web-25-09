# Next Demo

A teaching project for the Web 25-09 module, demonstrating core [Next.js](https://nextjs.org) App Router patterns: Server and Client Components, streaming with Suspense, Server Actions with form state, and database-backed authentication.

## Stack

- **Next.js 16** (App Router, Turbopack) with **React 19** and **TypeScript**
- **Tailwind CSS 4** for styling
- **Prisma 7** with **PostgreSQL** — `pg` adapter locally, Neon adapter on Vercel
- **argon2** password hashing with database-backed sessions

## Getting started

The recommended setup runs the app and PostgreSQL together via Docker:

```bash
npm run dev:up
```

This starts PostgreSQL, applies migrations, seeds sample data, and serves the app at [http://localhost:3000](http://localhost:3000).

Seeded logins: `alice@example.com` and `bob@example.com`, password `1234`.

Other Docker commands:

```bash
npm run dev:stop     # stop containers
npm run dev:reset    # stop containers and delete the database volume
npm run dev:studio   # open Prisma Studio at http://localhost:5555
```

### Without Docker

Point `DATABASE_URL` and `DATABASE_URL_UNPOOLED` in `.env` at a running PostgreSQL instance, then:

```bash
npm install
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (expects a reachable database) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`next lint` was removed in Next.js 16) |
| `npm run typecheck` | TypeScript check without emitting |

## Routes

| Route | Demonstrates |
| --- | --- |
| `/` | Home page with navigation |
| `/blog` | Server Component data fetching, Server Actions with authorization, `revalidatePath` |
| `/pokemons` | Streaming with `<Suspense>`, nested layout, `error.tsx` boundary, `next/image` |
| `/random_dog` | Uncached `fetch` (`cache: "no-store"`), nested layout |
| `/users`, `/users/[id]` | `searchParams` filtering, dynamic route params, `notFound()` |
| `/login`, `/sign_up` | `useActionState` forms, validation, sessions |
| `/server_action_form` | Minimal Server Action passed as a prop to a Client Component |

## Documentation

Short guides live in [`docs/`](docs/):

- [Architecture](docs/architecture.md) — project layout and rendering model
- [Authentication](docs/authentication.md) — sign-up, login, and session design
- [Database](docs/database.md) — Prisma setup, migrations, and seeding
- [Deployment](docs/deployment.md) — Vercel build pipeline and environments

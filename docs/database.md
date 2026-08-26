# Database

## Setup

PostgreSQL via Prisma 7. `prisma/prisma.client.ts` exports a singleton `PrismaClient` that picks its driver adapter by environment:

- **Locally / Docker**: `@prisma/adapter-pg` with a `pg` pool
- **On Vercel**: `@prisma/adapter-neon` (serverless Neon driver)

Connection strings come from `.env`:

- `DATABASE_URL` — used by the app at runtime (pooled on Neon)
- `DATABASE_URL_UNPOOLED` — used by Prisma CLI for migrations (`prisma.config.ts`)

## Models

- `Author` — user account with `passwordDigest`, unique `email`
- `Post` — blog post, optional `authorId`, cascade-deleted with its author
- `Session` — auth session with `expiresAt`, indexed by author and expiry

## Workflows

```bash
npx prisma migrate dev --name <change>   # create and apply a migration
npx prisma migrate deploy                # apply pending migrations
npx prisma db seed                       # run prisma/prisma.seed.ts
npm run dev:studio                       # Prisma Studio (Docker setup)
```

The seed script is idempotent (skips if posts exist) and refuses to run when `VERCEL_ENV` is `production`.

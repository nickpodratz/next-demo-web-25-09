# Deployment

## Vercel

`vercel.json` replaces the default build with `scripts/vercel-build.sh`:

1. `prisma generate`
2. Database step, depending on `VERCEL_ENV`:
   - **preview**: `prisma migrate reset --force` + `prisma db seed` — every preview gets a fresh, seeded database
   - **production**: `prisma migrate deploy` — apply pending migrations only, never seed
3. `next build`

The production safeguard exists twice: the build script never seeds production, and the seed script itself exits when `VERCEL_ENV` is `production`.

## Environment variables

Set in the Vercel project (and locally in `.env` / `.env.docker`):

- `DATABASE_URL` — pooled Neon connection string, used by the app
- `DATABASE_URL_UNPOOLED` — direct connection, used by Prisma CLI migrations

The Prisma client switches to the Neon adapter automatically when `VERCEL` is set (see `prisma/prisma.client.ts`).

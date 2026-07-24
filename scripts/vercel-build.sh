#!/bin/bash
set -e

npx prisma generate

if [ "$VERCEL_ENV" = "preview" ]; then
  npx prisma migrate reset --force
  npx prisma db seed
else
  npx prisma migrate deploy
fi

next build
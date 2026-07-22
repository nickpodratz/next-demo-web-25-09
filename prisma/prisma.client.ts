import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const isVercel = !!process.env.VERCEL;

const adapter = isVercel
  ? new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
  : new PrismaPg(new Pool({ connectionString: process.env.DATABASE_URL }));

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
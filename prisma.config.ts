import { loadEnvFile } from "node:process";
import { defineConfig, env } from "prisma/config";

loadEnvFile(".env.example")

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
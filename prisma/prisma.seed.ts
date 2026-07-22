import { prisma } from "./prisma.client";

// Prevent seed data in prod DB.
if (process.env.VERCEL_ENV === "production") {
  console.log("Auto-seed disabled for this environment.");
  process.exit(0);
}

async function seed() {
    const count = await prisma.post.count();

    if (count > 0) {
    console.log("Seed already applied. Skipping.");
    return;
    }

    await prisma.post.create({
        data: {
            title: "Hallo, Syntax",
            content: "Willkommen im 4. Modul von Web Dev."
        }
    })
    await prisma.post.create({
        data: {
            title: "Ein weiterer Post",
            content: "Hier nun weitere Details zum zweiten Post."
        }
    })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
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

    const alice = await prisma.author.create({
      data: {
        name: "Alice",
        email: "alice@example.com",
        posts: {
          create: [
            {
              title: "Alice's first post",
              content: "Hello from Alice!",
              published: true
            },
            {
              title: "Alice's second post",
              content: "Another day, another post",
              published: false
            },
            {
              title: "Hallo, Syntax",
              content: "Willkommen im 4. Modul von Web Dev."
            },
            {
              title: "Ein weiterer Post",
              content: "Hier nun weitere Details zum zweiten Post."
          }
          ]
        }
      }
    }
  )

  const bob = await prisma.author.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      posts: {
        create: [
          {
            title: "Bob's first post",
            content: "Hi, I'm Bob",
            published: true
          }
        ]
      }
    }
  })

  console.log("Seeded authors and posts:")
  console.log(alice, bob)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
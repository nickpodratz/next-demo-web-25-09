"use server"

import { prisma } from "@/prisma/prisma.client"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  await prisma.post.create({
    data: {
      title,
      content,
      published: true
    }
  })

  revalidatePath("/blog")
}

export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: "desc" }
    })
}
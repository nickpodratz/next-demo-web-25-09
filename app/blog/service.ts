import "server-only"
import { prisma } from "@/prisma/prisma.client";

async function createPost(title: string, content: string, authorId: number) {
      await prisma.post.create({
        data: {
          title,
          content,
          published: true,
          authorId,
        }
      })
}

async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            authorId: true,
            author: { select: { id: true, name: true } },
        }
    })
}

async function findPost(id: number) {
    return await prisma.post.findUnique({
        where: { id },
        select: { id: true, authorId: true }
    })
}

async function deletePost(id: number) {
    await prisma.post.delete({
        where: { id: id }
    })
}

const postService = {
    create: createPost,
    getAll: getPosts,
    find: findPost,
    delete: deletePost
}

export default postService

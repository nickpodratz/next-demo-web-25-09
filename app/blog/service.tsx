import { prisma } from "@/prisma/prisma.client";

async function createPost(title: string, content: string) {
      await prisma.post.create({
        data: {
          title,
          content,
          published: true
        }
      })
}

async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: "desc" }
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
    delete: deletePost
}

export default postService
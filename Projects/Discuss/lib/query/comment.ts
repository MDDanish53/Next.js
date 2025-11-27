import { Comment } from "@prisma/client"
import { prisma } from ".."

export type CommentWithAuthor = Comment & {
  user: {
    name: string | null,
    image: string | null
  }
}

export const fetchCommentsByPostId = async (postId: string): Promise<CommentWithAuthor[]> => {
  return prisma.comment.findMany({
    where: {postId},
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
}
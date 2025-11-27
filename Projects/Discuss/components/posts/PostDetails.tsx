import { prisma } from "@/lib";
import { notFound } from "next/navigation";

type PostDetailsProps = {
  postId: string;
}

const PostDetails: React.FC<PostDetailsProps> = async ({postId}) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId
    }
  })

  if(!post) notFound();
  
  return (
    <div className="bg-white rounded-t-xl border-t border-l border-r border-gray-200 shadow-sm p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">{post.content}</p>
      </div>
    </div>
  )
}

export default PostDetails;
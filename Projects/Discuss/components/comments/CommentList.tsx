import { fetchCommentsByPostId } from "@/lib/query/comment"
import ShowComment from "./ShowComment"

type CommentListProps = {
  postId: string
}

const CommentList: React.FC<CommentListProps> = async ({postId}) => {
  const comments = await fetchCommentsByPostId(postId)

  const topLevelComments = comments.filter((comment) => comment.parentId == null)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <span>💬</span>
          {topLevelComments.length} Comments
        </h1>
      </div>
      <div className="divide-y divide-gray-100">
        {topLevelComments.map((comment) => (
          <ShowComment key={comment.id} postId={comment.postId} commentId={comment.id} />
        ))}
      </div>
    </div>
  )
}

export default CommentList
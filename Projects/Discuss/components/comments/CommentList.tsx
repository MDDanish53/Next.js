import { fetchCommentsByPostId } from "@/lib/query/comment"
import ShowComment from "./ShowComment"

type CommentListProps = {
  postId: string
}

const CommentList: React.FC<CommentListProps> = async ({postId}) => {
  const comments = await fetchCommentsByPostId(postId)

  const topLevelComments = comments.filter((comment) => comment.parentId == null)
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 mt-8">
      <div className="px-6 sm:px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold">💬</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {topLevelComments.length} Comments
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Join the discussion and share your thoughts
            </p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {topLevelComments.length > 0 ? (
          topLevelComments.map((comment) => (
            <ShowComment key={comment.id} postId={comment.postId} commentId={comment.id} />
          ))
        ) : (
          <div className="px-6 sm:px-8 py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No comments yet</h3>
            <p className="text-gray-600 text-sm">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentList
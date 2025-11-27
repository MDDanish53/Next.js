import { fetchCommentsByPostId } from "@/lib/query/comment";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CreateCommentForm from "./CreateCommentForm";

type ShowCommentProps = {
  postId: string;
  commentId: string;
}

const ShowComment: React.FC<ShowCommentProps> = async ({postId, commentId}) => {
  const comments = await fetchCommentsByPostId(postId);

  const comment = comments.find((c) => c.id === commentId); // parent comment
  if(!comment) return null;
  
  const children = comments.filter((c) => c.parentId === comment.id); // child comments of parent comment
  return (
    <div className="p-4">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={comment.user.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <p className="text-gray-500 text-sm font-medium">{comment.user.name}</p>
          <p className="text-gray-800">{comment.content}</p>
          <CreateCommentForm postId={comment.postId} parentId={comment.id}/>
        </div>
      </div>
      {children.length > 0 && (
        <div className="ml-12 border-l-2 border-gray-300 pl-6 mt-4">
          {children.map((childComment) => (
            <ShowComment key={childComment.id} postId={childComment.postId} commentId={childComment.id}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShowComment
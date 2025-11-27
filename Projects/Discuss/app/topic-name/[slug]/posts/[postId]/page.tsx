import CommentList from "@/components/comments/CommentList";
import CreateCommentForm from "@/components/comments/CreateCommentForm";
import PostDetails from "@/components/posts/PostDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type TopicPostParams = {
  params: Promise<{ slug: string; postId: string }>;
};

const TopicPost: React.FC<TopicPostParams> = async ({ params }) => {
  const { slug, postId } = await params;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6 mb-6">
        <Link href={`/topic-name/${slug}`}>
          <Button variant={'outline'} className="flex items-center gap-2 hover:bg-gray-100 transition-colors">
            <ChevronLeft size={16} />
            Back to {slug.replace('-', ' ')}
          </Button>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto px-6">
        <PostDetails postId={postId} />
        <div className="border-t border-gray-300"></div>
        <CreateCommentForm postId={postId} startOpen/>
        <CommentList postId={postId} />
      </div>
    </div>
  );
};

export default TopicPost;

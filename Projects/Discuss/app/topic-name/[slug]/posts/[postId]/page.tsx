import CommentList from "@/components/comments/CommentList";
import CreateCommentForm from "@/components/comments/CreateCommentForm";
import PostDetails from "@/components/posts/PostDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

type TopicPostParams = {
  params: Promise<{ slug: string; postId: string }>;
};

const TopicPost: React.FC<TopicPostParams> = async ({ params }) => {
  const { slug, postId } = await params;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6 mb-6">
        <Link href={`/topic-name/${slug}`}>
          <Button
            variant={"outline"}
            className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to {slug.replace("-", " ")}
          </Button>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto px-6">
        <Suspense fallback={
          <div className="bg-white rounded-t-xl border-t border-l border-r border-gray-200 shadow-sm p-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        }>
          <PostDetails postId={postId} />
        </Suspense>

        <div className="border-t border-gray-300"></div>
        <CreateCommentForm postId={postId} startOpen />
        <CommentList postId={postId} />
      </div>
    </div>
  );
};

export default TopicPost;

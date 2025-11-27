import CreatePostForm from "@/components/posts/CreatePostForm";
import PostList from "@/components/posts/PostList";
import { fetchPostByTopicSlug } from "@/lib/query/post";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

const TopicPage: React.FC<TopicPageProps> = async ({ params }) => {
  const slug = (await params).slug;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-start mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex-1 mr-8">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {slug.replace('-', ' ')} Discussion
            </h1>
            <p className="text-gray-600 mt-2">Join the conversation and share your thoughts</p>
          </div>
          <div className="shrink-0">
            <CreatePostForm slug={slug} />
          </div>
        </div>
        <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
      </div>
    </div>
  );
};

export default TopicPage;

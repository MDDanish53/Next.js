import { PostWithData } from "@/lib/query/post";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";

type PostListProps = {
  fetchData: () => Promise<PostWithData[]>
}

const PostList: React.FC<PostListProps> = async ({fetchData}) => {
  const posts = await fetchData();
  return (
    <div className="space-y-3 sm:space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <Link href={`/topic-name/${post.title}/posts/${post.id}`} className="block">
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 leading-tight">
                {post.title}
              </CardTitle>
            </Link>
            
            <CardDescription className="mt-3 sm:mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {post.user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-800">{post.user.name}</span>
                </div>
                <div className="flex items-center gap-1 bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                  <span className="text-blue-500">💬</span>
                  <span className="font-medium text-gray-700">{post._count.comments}</span>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;

import { PostWithData } from "@/lib/query/post";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type PostListProps = {
  fetchData: () => Promise<PostWithData[]>
}

const PostList: React.FC<PostListProps> = async ({fetchData}) => {
  const posts = await fetchData();
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-lg transition-all duration-200 border-gray-200 bg-white rounded-xl">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">{post.title}</CardTitle>
            <CardDescription className="mt-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  By <span className="font-medium text-gray-800">{post.user.name}</span>
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <span>💬</span>
                  {post._count.comments} comments
                </span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;

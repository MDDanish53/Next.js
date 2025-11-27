import PostList from "@/components/posts/PostList";
import CreateTopicForm from "@/components/topics/CreateTopicForm";
import { Button } from "@/components/ui/button";
import { fetchTopPosts } from "@/lib/query/post";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
          <h1 className="text-xl font-bold m-2">Top Posts</h1>
          <PostList fetchData={fetchTopPosts}/>
        </div>
        <div>
          <CreateTopicForm />
        </div>
      </div>
    </>
  );
}

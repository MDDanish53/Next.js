import CreatePostForm from "@/components/posts/CreatePostForm";
import { Button } from "@/components/ui/button";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

const TopicPage: React.FC<TopicPageProps> = async ({ params }) => {
  const slug = (await params).slug;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">{slug}</div>
      <div>
       <CreatePostForm slug={slug} />
      </div>
    </div>
  );
};

export default TopicPage;

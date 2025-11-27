import PostList from "@/components/posts/PostList";
import { fetchPostBySearch } from "@/lib/query/post";

type SearchPageProps = {
  searchParams: Promise<{term: string}>
}

const page: React.FC<SearchPageProps> = async ({searchParams}) => {
  const term = (await searchParams).term;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">🔍</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Search Results
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Found results for <span className="font-semibold text-purple-600">"{term}"</span>
              </p>
            </div>
          </div>
        </div>
        <PostList fetchData={() => fetchPostBySearch(term)}/>
      </div>
    </div>
  )
}

export default page
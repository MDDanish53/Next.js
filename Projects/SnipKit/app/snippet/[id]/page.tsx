import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

const SnippetInfo = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = parseInt((await params).id); // getting the id from the params
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  
  if(!snippet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-800 rounded-lg p-6 border border-red-700">
            <h1 className="text-3xl font-bold text-white mb-2">Snippet Not Found</h1>
            <p className="text-red-300">The requested snippet could not be found.</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{snippet.title}</h1>
              <p className="text-gray-300">Snippet ID: {snippet.id}</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                Edit
              </Button>
              <Button variant="destructive" className="px-4 py-2">
                Delete
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm ml-4">{snippet.title}.js</span>
            </div>
          </div>
          <div className="p-6">
            <pre className="text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto">
              <code className="language-javascript">{snippet.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetInfo;

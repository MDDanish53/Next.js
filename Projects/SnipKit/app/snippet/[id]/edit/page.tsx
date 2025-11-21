import EditCodeForm from "@/components/EditCodeForm";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-800 to-red-700 rounded-xl p-8 border border-red-600 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">❌</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Snippet Not Found
              </h1>
              <p className="text-red-200 mb-6">
                The requested snippet could not be found or may have been
                deleted.
              </p>
              <Link href="/">
                <Button className="bg-white text-red-800 hover:bg-gray-100">
                  🏠 Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-3 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col gap-3">
        {/* Breadcrumb */}
        <div className="flex-shrink-0">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              🏠 Home
            </Link>
            <span>/</span>
            <Link href={`/snippet/${id}`} className="hover:text-white transition-colors">
              📄 {snippet.title}
            </Link>
            <span>/</span>
            <span className="text-white">✏️ Edit</span>
          </nav>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 border border-gray-600 shadow-2xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">✏️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Edit Snippet</h1>
                <p className="text-gray-300 text-sm">Modify your code snippet</p>
              </div>
            </div>
            <Link href={`/snippet/${id}`}>
              <Button variant="outline" className="px-4 py-2 rounded-lg border-gray-300 hover:bg-gray-50 transition-all duration-200">
                ❌ Cancel
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Code Editor */}
        <div className="flex-1 min-h-0">
          <EditCodeForm snippet={snippet} readOnly={false} isEditing={true}/>
        </div>
      </div>
    </div>
  );
};

export default EditPage;

import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import EditCodeForm from "@/components/EditCodeForm";
import { deleteSnippet } from "@/utils/features";
import { notFound } from "next/navigation";

const SnippetInfo = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = parseInt((await params).id); // getting the id from the params

  await new Promise((r) => setTimeout(r, 1000)) // just to show loading component
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) return notFound();

  const deleteSnippetHandler = async () => {
    "use server"
    await deleteSnippet(snippet.id)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-3 overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col gap-3">
        {/* Breadcrumb */}
        <div className="flex-shrink-0">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              🏠 Home
            </Link>
            <span>/</span>
            <span className="text-white">📄 {snippet.title}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 border border-gray-600 shadow-2xl flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm font-bold">JS</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {snippet.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-gray-300">
                  <span>🆔 ID: {snippet.id}</span>
                  <span>📅 Created recently</span>
                  <span>💻 JavaScript</span>
                  <span>📏 {snippet.code.split('\n').length} lines</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/snippet/${id}/edit`}>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200">
                  ✏️ Edit
                </Button>
              </Link>
              <form action={deleteSnippetHandler}><Button variant="destructive" className="px-4 py-2 rounded-lg shadow-lg transition-all duration-200">
                🗑️ Delete
              </Button></form>
              
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 min-h-0">
          <EditCodeForm snippet={snippet} readOnly={true} isEditing={false}/>
        </div>
      </div>
    </div>
  );
};

export default SnippetInfo;

export const generateStaticParams = async () => {
  const snippets = await prisma.snippet.findMany();
  return snippets.map((snippet) => (
    {id: snippet.id.toString()}
  ))
}
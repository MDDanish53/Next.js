import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

type SnippetsType = {
  id: string;
  title: string;
  code: string;
}[];

export default async function Home() {
  const snippets: SnippetsType = await prisma.snippet.findMany();
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to SnipKit
          </h1>
          <p className="text-gray-300">Manage your code snippets efficiently</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Snippets</h2>
            <Link href={"/snippet/new"}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                + New Snippet
              </Button>
            </Link>
          </div>
          {snippets ? (
            snippets.map((snippet) => (
              <div className="flex justify-between items-center bg-gray-900 text-white p-3 rounded-md mb-2">
                <h2>{snippet.title}</h2>
                <Link href={`/snippet/${snippet.id}`}>
                  <Button className="bg-white text-black hover:bg-gray-600">View</Button>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center py-12">
              <p>No snippets yet. Create your first snippet to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

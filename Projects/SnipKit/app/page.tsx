import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Snippet } from "@/types";

export default async function Home() {
  const snippets: Snippet[] = await prisma.snippet.findMany();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 mb-6 border border-gray-600 shadow-2xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">📝</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Welcome to SnipKit
              </h1>
              <p className="text-gray-300">Manage your code snippets efficiently</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>📊 {snippets.length} snippets</span>
            <span>⚡ Fast search</span>
            <span>🎨 Syntax highlighting</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Your Snippets</h2>
                <p className="text-gray-600">Organize and access your code collection</p>
              </div>
              <Link href={"/snippet/new"}>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
                  ✨ New Snippet
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            {snippets.length > 0 ? (
              <div className="grid gap-4">
                {snippets.map((snippet) => (
                  <div key={snippet.id} className="group bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 border border-gray-200 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:border-blue-300">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-mono text-sm">JS</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                            {snippet.title}
                          </h3>
                          <p className="text-gray-500 text-sm">JavaScript snippet • Created recently</p>
                        </div>
                      </div>
                      <Link href={`/snippet/${snippet.id}`}>
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 transition-all duration-200 hover:shadow-md">
                          👁️ View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No snippets yet</h3>
                <p className="text-gray-500 mb-4">Create your first snippet to get started!</p>
                <Link href="/snippet/new">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-lg">
                    ✨ Create First Snippet
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSnippet } from "@/utils/features";
import { useActionState } from "react";

const New = () => {
const [serverResponse, createSnippetHandler] = useActionState(createSnippet, {message: ""})

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">
            Create New Snippet
          </h1>
          <p className="text-gray-300">
            Add a new code snippet to your collection
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-red-600 font-semibold mb-4 text-center">{serverResponse.message}</h2>
          <form action={createSnippetHandler} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title
              </Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Enter snippet title..."
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="code"
                className="text-sm font-medium text-gray-700"
              >
                Code
              </Label>
              <Textarea
                id="code"
                name="code"
                rows={12}
                placeholder="Paste your code here..."
                className="w-full font-mono text-sm"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                Create Snippet
              </Button>
              <Button variant="outline" className="px-6 py-2">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;

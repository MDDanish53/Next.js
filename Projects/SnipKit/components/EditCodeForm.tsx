"use client";
import { Snippet } from "@/types";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { updateSnippet } from "@/utils/features";

const EditCodeForm = ({
  snippet,
  readOnly = false,
  isEditing = false
}: {
  snippet: Snippet;
  readOnly?: boolean;
  isEditing: boolean
}) => {
  const [editCode, setEditCode] = useState<string>(snippet.code);

  const updateCodeHandler = (value: string = "") => {
    setEditCode(value);
  }

  const updateSnippetAction = updateSnippet.bind(null, snippet.id, editCode)

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden h-full flex flex-col">
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-sm ml-4">code.js</span>
          </div>
          {isEditing && (
            <form action={updateSnippetAction}><Button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm">
              💾 Save
            </Button></form>
            
          )}
        </div>
      </div>
      <div className="flex-1">
        <Editor
          theme="vs-dark"
          height="100%"
          defaultLanguage="javascript"
          defaultValue={editCode}
          onChange={updateCodeHandler}
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
};

export default EditCodeForm;

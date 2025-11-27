"use client";
import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/createComment";
import { Loader2 } from "lucide-react";

type CreateCommentFormProps = {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
};

const CreateCommentForm: React.FC<CreateCommentFormProps> = ({
  postId,
  parentId,
  startOpen,
}) => {
  const [openComment, setOpenComment] = useState(startOpen);
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );
  return (
    <div className={parentId ? "" : "bg-white rounded-b-xl border-b border-l border-r border-gray-200 shadow-sm p-6"}>
      <Button
        onClick={() => setOpenComment(!openComment)}
        size={"sm"}
        variant={"link"}
        className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium text-xs"
      >
        💬 Reply
      </Button>
      {openComment && (
        <form action={action} className="mt-3 space-y-3">
          <Textarea
            name="content"
            placeholder="Write a reply..."
            className="bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none min-h-[60px] rounded-md text-sm"
          />
          {formState.errors.content && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-2 py-1 flex items-center gap-1">
                <span className="text-red-500">⚠️</span>
                {formState.errors.content}
              </p>
            </div>
          )}
          {formState.errors.formError && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <div className="bg-red-50 border border-red-200 rounded-md p-2 flex items-center gap-2">
                <span className="text-red-500">🚫</span>
                <p className="text-red-700 font-medium text-xs">
                  {formState.errors.formError}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              onClick={() => setOpenComment(false)}
              size={"sm"}
              variant={"outline"}
              className="px-3 py-1 text-xs"
            >
              Cancel
            </Button>
            <Button disabled={isPending}
              size={"sm"}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs"
            >
              {isPending ? (
                <>
                  <Loader2 size={12} /> Wait
                </>
              ) : (
                "Reply"
              )} 
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateCommentForm;

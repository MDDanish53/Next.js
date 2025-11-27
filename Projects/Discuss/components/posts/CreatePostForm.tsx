"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { createPost } from "@/actions/createPost"
import { useActionState } from "react"

type CreatePostFormProps = {
  slug: string
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({slug}) => {
  const [formState, action] = useActionState(createPost.bind(null, slug), {errors: {}})
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">New Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] rounded-2xl border-0 shadow-2xl bg-white">
          <form action={action}>
          <DialogHeader className="space-y-3 pb-2">
            <DialogTitle className="text-2xl font-bold text-blue-600">Create a Topic to start Discussion</DialogTitle>
            <DialogDescription className="text-gray-600 leading-relaxed">
              Write your post. Click save when you are
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Title</Label>
              <Input id="title" name="title" className={`rounded-lg transition-all ${formState.errors.title ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'} focus:ring-2`}/>
              {formState.errors.title && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    {formState.errors.title}
                  </p>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-sm font-semibold text-gray-700">Content</Label>
              <Textarea id="content" name="content" className={`rounded-lg transition-all min-h-[100px] resize-none ${formState.errors.content ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-100'} focus:ring-2`} />
              {formState.errors.content && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    {formState.errors.content}
                  </p>
                </div>
              )}
            </div>
          </div>
          {formState.errors.formError && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <span className="text-red-500 text-lg">🚫</span>
                <p className="text-red-700 font-medium">{formState.errors.formError}</p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-3 pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-full px-6 border-gray-300 hover:bg-gray-50 transition-all">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-full shadow-lg hover:shadow-xl transition-all">Save</Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreatePostForm;
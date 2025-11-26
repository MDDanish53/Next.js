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
  const [formData, action] = useActionState(createPost.bind(slug), {errors: {}})
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
              <Input id="title" name="title" className="rounded-lg border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-sm font-semibold text-gray-700">Content</Label>
              <Textarea id="content" name="content" className="rounded-lg border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all min-h-[100px] resize-none" />
            </div>
          </div>

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
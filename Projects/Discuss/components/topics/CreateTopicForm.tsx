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
import { createTopic } from "@/actions/createTopic"
import { useActionState } from "react"

const CreateTopicForm = () => {
  const [formState, action] = useActionState(createTopic, {errors: {}})
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
            <span>✨</span>
            New Topic
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[520px] rounded-3xl border-0 shadow-2xl bg-white/95 backdrop-blur-md">
          <form action={action}>
          <DialogHeader className="space-y-4 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl">💬</span>
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">Create New Topic</DialogTitle>
                <DialogDescription className="text-gray-600 text-sm mt-1">
                  Start a new discussion and engage with the community
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-6 py-2">
            <div className="space-y-3">
              <Label htmlFor="name-1" className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>🏷️</span>
                Topic Name
              </Label>
              <Input 
                id="name-1" 
                name="name" 
                placeholder="Enter a catchy topic name..."
                className={`rounded-2xl transition-all h-12 px-4 ${formState.errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/50' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-400 focus:ring-blue-100'} focus:ring-2`}
              />
              {formState.errors.name && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    {formState.errors.name}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Label htmlFor="description-1" className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span>📝</span>
                Description
              </Label>
              <Textarea 
                id="description-1" 
                name="description" 
                placeholder="Describe what this topic is about..."
                className={`rounded-2xl transition-all min-h-[120px] resize-none p-4 ${formState.errors.description ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/50' : 'border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-400 focus:ring-blue-100'} focus:ring-2`}
              />
              {formState.errors.description && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    {formState.errors.description}
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
          <DialogFooter className="gap-3 pt-6">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-2xl px-6 py-2.5 border-gray-200 hover:bg-gray-50 transition-all font-medium">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-2.5 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              🚀 Create Topic
            </Button>
          </DialogFooter>
          </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateTopicForm;
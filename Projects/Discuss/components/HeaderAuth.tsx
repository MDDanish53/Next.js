'use client'

import { useSession } from "next-auth/react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { signOutHandler } from "@/actions/signOut";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signInHandler } from "@/actions/signIn";

const HeaderAuth = () => {
  const session = useSession();

  if(session.status === "loading") return null;

  let authContent: React.ReactNode;
  if(session.data?.user) {
    authContent = (
      <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer hover:ring-4 hover:ring-blue-200 hover:scale-105 transition-all duration-200 shadow-md">
                <AvatarImage
                  src={session.data.user.image || ""}
                  alt="avatar_image"
                />
                <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 rounded-xl shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <div className="p-4">
                <h1 className="font-semibold text-gray-900 mb-1">{session.data.user.name}</h1>
                <p className="text-sm text-gray-500 mb-3">{session.data.user.email}</p>
              </div>
              <Separator />
              <div className="p-2">
                <form action={signOutHandler}>
                <Button className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg" variant="ghost">
                  <LogOut size={16} /> Sign Out
                </Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
    )
  } else {
    authContent = (
      <>
            <form action={signInHandler}>
              <Button variant={"outline"} className="rounded-full px-6 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all">Sign In</Button>
            </form>
            <form action={signInHandler}>
              <Button className="rounded-full px-6 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">Sign Up</Button>
            </form>
          </>
    )
  }
  return (
    authContent
  )
}

export default HeaderAuth
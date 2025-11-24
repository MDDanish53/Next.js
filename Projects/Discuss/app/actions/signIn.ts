"use server"
import { signIn } from "@/auth"

export const signInHandler = async () => {
  return signIn();
}
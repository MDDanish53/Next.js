"use server"
import { signOut } from "@/auth"

export const signOutHandler = async () => {
  return signOut();
}
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/index";
import GitHubProvider from "next-auth/providers/github";

if(!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing github client ID or client secret")
}

export const {handlers: {GET, POST}, auth} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({user, session}) {
      if(session && user) {
        session.user.id = user.id
      }
      return session;
    }
  }
})
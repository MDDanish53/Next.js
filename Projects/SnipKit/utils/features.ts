"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateSnippet = async (id: number, code: string) => {
  await prisma.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  revalidatePath(`/snippet/${id}`);
  redirect(`/snippet/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: {
      id,
    },
  });
  revalidatePath("/"); // updating the cached data with the new data as we have deleted a snippet
  redirect("/");
};

export const createSnippet = async (
  prevState: { message: string },
  formData: FormData
) => {
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 1) {
      return { message: "Title is required" };
    }

    if (typeof code !== "string" || code.length < 1) {
      return { message: "Code is required" };
    }

    await prisma.snippet.create({
      data: {
        title,
        code,
      },
    });
    //throw new Error("Kuch to gadbad hai daya!") // Custom Error Message using error.tsx component

    revalidatePath("/"); // updating the cached data with the new data as we have created a new snippet
  } catch (error: any) {
    return { message: error.message };
  }
  redirect("/"); // works only at server side
};

"use client";
import { useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { search } from "@/actions/search";

const Search = () => {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <Input
        defaultValue={searchParams.get("term") || ""}
        type="text"
        name="term"
        placeholder="Search posts..."
        className="w-full rounded-md border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
      />
    </form>
  );
};

export default Search;

import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import { Input } from "./ui/input";
import Search from "./Search";
import { Suspense } from "react";

const Header = async () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <Link href={"/"} className="block">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent hover:scale-105 transition-transform">
                Discuss
              </h1>
            </Link>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Suspense fallback={
                <div className="w-full h-10 bg-gray-100 rounded-2xl animate-pulse"></div>
              }>
                <Search />
              </Suspense>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <HeaderAuth />
          </div>
        </div>
        
        <div className="md:hidden pb-4">
          <Suspense fallback={
            <div className="w-full h-10 bg-gray-100 rounded-2xl animate-pulse"></div>
          }>
            <Search />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;

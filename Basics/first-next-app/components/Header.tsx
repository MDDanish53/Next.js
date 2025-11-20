import Link from "next/link";

const Header = () => {
  return (
    <header className="relative z-50 bg-white shadow-lg border-b border-gray-200">
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link href={"/"} className="hover:scale-105 transition-transform">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DroneHub
          </h1>
        </Link>
        <div className="flex space-x-8">
          <Link href={"/explore"} className="group">
            <h3 className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative">
              Explore
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </h3>
          </Link>
          <Link href={"/help"} className="group">
            <h3 className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative">
              Help
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </h3>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

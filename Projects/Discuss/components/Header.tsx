import HeaderAuth from "./HeaderAuth";
import { Input } from "./ui/input";

const Header = async () => {
  return (
    <div className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-white via-gray-50 to-white backdrop-blur-sm border-b border-gray-100 shadow-lg">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Discuss</h1>
      </div>
      <div className="flex-1 max-w-lg mx-12">
        <Input type="text" placeholder="Search discussions..." className="w-full rounded-md border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
      </div>
      <div className="flex items-center gap-4">
        <HeaderAuth />
      </div>
    </div>
  );
};

export default Header;

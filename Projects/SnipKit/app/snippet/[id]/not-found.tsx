import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SnippetNotFound = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-red-800 to-red-700 rounded-xl p-6 border border-red-600 shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">❌</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Snippet Not Found
              </h1>
              <p className="text-red-200 mb-4">
                The requested snippet could not be found.
              </p>
              <Link href="/">
                <Button className="bg-white text-red-800 hover:bg-gray-100">
                  🏠 Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default SnippetNotFound;
import Link from 'next/link';
import { Home, ArrowLeft, Users, Sparkles } from 'lucide-react';

/**
 * Renders a visually appealing 404 Not Found page with animations and a rocket icon.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg w-full border border-white/10 text-center p-10">
        {/* Animated icon container */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-white rounded-full animate-spin opacity-20"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full animate-pulse"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <span className="text-6xl animate-bounce">🚀</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gray-300 animate-pulse" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            404
          </h1>
          <Sparkles className="w-5 h-5 text-gray-300 animate-pulse delay-300" />
        </div>

        <h2 className="text-2xl font-semibold text-white mb-3">Oops! Page Not Found</h2>

        <p className="text-purple-200 mb-8 leading-relaxed">
          Looks like this page got lost in space! While you're here, why not check out our amazing
          waitlist community?
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Back to Waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}

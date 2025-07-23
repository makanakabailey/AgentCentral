import { Link } from "wouter";
import { Home, Database } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen neural-bg relative bg-dark-primary flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="holographic rounded-xl p-8 lg:p-12 max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="text-6xl lg:text-8xl font-bold gradient-text mb-4">404</h1>
            <p className="text-xl lg:text-2xl text-white font-semibold mb-2">Page Not Found</p>
            <p className="text-gray-400">The page you're looking for doesn't exist in the Social Connect ecosystem.</p>
          </div>
          
          <div className="space-y-4">
            <Link href="/">
              <button className="w-full p-3 rounded-lg bg-dark-accent/20 hover:bg-dark-accent/30 transition-colors text-white flex items-center justify-center gap-3">
                <Home className="w-5 h-5" />
                Return to Dashboard
              </button>
            </Link>
            
            <Link href="/database">
              <button className="w-full p-3 rounded-lg bg-dark-accent2/20 hover:bg-dark-accent2/30 transition-colors text-white flex items-center justify-center gap-3">
                <Database className="w-5 h-5" />
                Database Manager
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
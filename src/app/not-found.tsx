"use client";

import Link from "next/link";

export default function NotFound() {
  return (
      <main className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
        <div className="text-center p-6 max-w-md">
          <div className="flex justify-center mb-4">
            <svg
              className="w-24 h-24 text-white animate-spin-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h1 className="text-8xl font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            404
          </h1>
          <h2 className="text-3xl font-semibold mb-6">Oops! Page Not Found</h2>
          <p className="text-lg mb-8">
            It seems like you’ve wandered into a lost corner of our jewellery vault. Don’t worry, let’s get you back on track!
          </p>
          <div className="space-x-4">
            <Link href="/">
              <button className="bg-white text-purple-600 py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Back to Home
              </button>
            </Link>
 
          </div>
        </div>

        {/* Animation Style */}
        <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
      </main>

  );
}
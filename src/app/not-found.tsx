import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Large 404 number with blue 0 */}
        <div className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter">
          <span className="bg-gradient-to-b from-white via-[#D9DCE1] to-[#9BA0A8] bg-clip-text text-transparent">4</span>
          <span className="text-[#0080FF]">0</span>
          <span className="bg-gradient-to-b from-white via-[#D9DCE1] to-[#9BA0A8] bg-clip-text text-transparent">4</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-semibold text-white">
          Page not found
        </h1>
        
        <p className="text-[#9BA0A8] max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Button matching homepage style */}
        <div className="pt-4">
          <Link
            to="/"
            className="group relative inline-block px-8 py-3 rounded-md bg-black text-white text-sm font-medium border border-[#2B3038] overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#0066FF] hover:shadow-[0_0_30px_-8px_rgba(0,102,255,0.3)]"
          >
            {/* Sweeping gradient animation */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#0066FF]/0 via-[#0066FF]/5 to-[#0066FF]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2">
              Back to home
              <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">→</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
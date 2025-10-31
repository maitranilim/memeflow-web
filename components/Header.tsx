'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="logo"
          >
            <rect width="40" height="40" rx="8" fill="url(#gradient)" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontWeight="bold"
              fontFamily="Orbitron, sans-serif"
            >
              MF
            </text>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0%" stopColor="#00d4c9" />
                <stop offset="100%" stopColor="#ff4db6" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-2xl font-bold font-orbitron bg-gradient-to-r from-[#00d4c9] to-[#ff4db6] text-transparent bg-clip-text">
            MemeFlow
          </span>
        </Link>
        
        <button
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </header>
  );
}

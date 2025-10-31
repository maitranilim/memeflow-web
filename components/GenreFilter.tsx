'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const genres = ['all', 'dark-humor', 'sarcastic', 'pun', 'metaphorical', 'tech'];

interface GenreFilterProps {
  onGenreChange?: (genre: string) => void;
}

export default function GenreFilter({ onGenreChange }: GenreFilterProps) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    onGenreChange?.(genre);
  };

  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {genres.map((genre) => (
          <motion.button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedGenre === genre
                ? 'bg-gradient-to-r from-[#00d4c9] to-[#ff4db6] text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {genre === 'all' ? 'All' : genre.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

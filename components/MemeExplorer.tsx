'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import GenreFilter from '@/components/GenreFilter';
import MemeCard from '@/components/MemeCard';
import type { Genre, Meme } from '@/lib/types';

interface MemeExplorerProps {
  memes: Meme[];
}

export default function MemeExplorer({ memes }: MemeExplorerProps) {
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'all'>('all');

  const filteredMemes = useMemo(
    () => (selectedGenre === 'all' ? memes : memes.filter((meme) => meme.genre === selectedGenre)),
    [memes, selectedGenre]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center"
    >
      <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
      <MemeCard memes={filteredMemes} />
    </motion.div>
  );
}

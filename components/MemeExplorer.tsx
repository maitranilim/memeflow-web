'use client';

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
    <>
      <GenreFilter selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />
      <MemeCard memes={filteredMemes} />
    </>
  );
}

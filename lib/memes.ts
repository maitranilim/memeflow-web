import { supabase } from './supabase';
import type { Meme } from './types';

// Used when Supabase isn't configured yet, and as a fallback if the
// database request fails, so the app is never left with nothing to show.
export const sampleMemes: Meme[] = [
  {
    id: 'sample-1',
    title: 'Sample Meme 1',
    caption: 'This is a funny meme about coding',
    imageUrl: 'https://via.placeholder.com/600x400/0b1020/00d4c9?text=Meme+1',
    genre: 'tech',
    likes: 42,
    saves: 10,
  },
  {
    id: 'sample-2',
    title: 'Sample Meme 2',
    caption: 'Dark humor at its finest',
    imageUrl: 'https://via.placeholder.com/600x400/0b1020/ff4db6?text=Meme+2',
    genre: 'dark-humor',
    likes: 156,
    saves: 45,
  },
  {
    id: 'sample-3',
    title: 'Sample Meme 3',
    caption: 'A pun so bad it is good',
    imageUrl: 'https://via.placeholder.com/600x400/0b1020/00d4c9?text=Meme+3',
    genre: 'pun',
    likes: 88,
    saves: 20,
  },
];

interface MemeRow {
  id: string;
  title: string;
  caption: string | null;
  image_path: string;
  genre: string;
  likes_count: number;
  saves_count: number;
}

function toMeme(row: MemeRow): Meme {
  return {
    id: row.id,
    title: row.title,
    caption: row.caption,
    imageUrl: row.image_path,
    genre: row.genre as Meme['genre'],
    likes: row.likes_count,
    saves: row.saves_count,
  };
}

export async function getMemes(): Promise<Meme[]> {
  if (!supabase) {
    return sampleMemes;
  }

  const { data, error } = await supabase
    .from('memes')
    .select('id, title, caption, image_path, genre, likes_count, saves_count')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load memes from Supabase, showing sample data:', error.message);
    return sampleMemes;
  }

  if (!data || data.length === 0) {
    return sampleMemes;
  }

  return data.map(toMeme);
}

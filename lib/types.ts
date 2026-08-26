export type Genre = 'dark-humor' | 'sarcastic' | 'pun' | 'metaphorical' | 'tech';

export interface Meme {
  id: string;
  title: string;
  caption: string | null;
  imageUrl: string;
  genre: Genre;
  likes: number;
  saves: number;
}

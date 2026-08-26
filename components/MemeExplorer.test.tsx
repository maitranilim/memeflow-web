import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MemeExplorer from './MemeExplorer';
import type { Meme } from '@/lib/types';

const memes: Meme[] = [
  {
    id: '1',
    title: 'Tech Meme',
    caption: null,
    imageUrl: 'https://via.placeholder.com/600x400?text=Tech',
    genre: 'tech',
    likes: 0,
    saves: 0,
  },
  {
    id: '2',
    title: 'Pun Meme',
    caption: null,
    imageUrl: 'https://via.placeholder.com/600x400?text=Pun',
    genre: 'pun',
    likes: 0,
    saves: 0,
  },
];

describe('MemeExplorer', () => {
  it('shows all memes by default', () => {
    render(<MemeExplorer memes={memes} />);
    expect(screen.getByText('Tech Meme')).toBeInTheDocument();
  });

  it('filters memes down to the selected genre', async () => {
    const user = userEvent.setup();
    render(<MemeExplorer memes={memes} />);

    await user.click(screen.getByRole('button', { name: 'Pun' }));

    expect(screen.getByText('Pun Meme')).toBeInTheDocument();
    // The previous card briefly stays mounted during its exit animation.
    await waitFor(() => expect(screen.queryByText('Tech Meme')).not.toBeInTheDocument());
  });

  it('shows an empty state when no memes match the selected genre', async () => {
    const user = userEvent.setup();
    render(<MemeExplorer memes={memes} />);

    await user.click(screen.getByRole('button', { name: 'Sarcastic' }));

    expect(screen.getByText(/no memes found/i)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import MemeCard from './MemeCard';
import type { Meme } from '@/lib/types';

const memes: Meme[] = [
  {
    id: '1',
    title: 'First Meme',
    caption: 'First caption',
    imageUrl: 'https://via.placeholder.com/600x400?text=First',
    genre: 'tech',
    likes: 1,
    saves: 2,
  },
  {
    id: '2',
    title: 'Second Meme',
    caption: 'Second caption',
    imageUrl: 'https://via.placeholder.com/600x400?text=Second',
    genre: 'pun',
    likes: 3,
    saves: 4,
  },
];

describe('MemeCard', () => {
  it('shows an empty state when there are no memes', () => {
    render(<MemeCard memes={[]} />);
    expect(screen.getByText(/no memes found/i)).toBeInTheDocument();
  });

  it('shows the first meme initially', () => {
    render(<MemeCard memes={memes} />);
    expect(screen.getByText('First Meme')).toBeInTheDocument();
    expect(screen.getByText('First caption')).toBeInTheDocument();
  });

  it('navigates to the next and previous meme', async () => {
    const user = userEvent.setup();
    render(<MemeCard memes={memes} />);

    await user.click(screen.getByLabelText('Next meme'));
    expect(screen.getByText('Second Meme')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Previous meme'));
    expect(screen.getByText('First Meme')).toBeInTheDocument();
  });

  it('disables previous on the first meme and next on the last meme', () => {
    render(<MemeCard memes={memes} />);
    expect(screen.getByLabelText('Previous meme')).toBeDisabled();
    expect(screen.getByLabelText('Next meme')).not.toBeDisabled();
  });
});

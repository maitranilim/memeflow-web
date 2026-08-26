import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import GenreFilter from './GenreFilter';

describe('GenreFilter', () => {
  it('renders a pill for every genre plus "All"', () => {
    render(<GenreFilter selectedGenre="all" onGenreChange={() => {}} />);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dark Humor' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sarcastic' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pun' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Metaphorical' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tech' })).toBeInTheDocument();
  });

  it('calls onGenreChange with the clicked genre', async () => {
    const user = userEvent.setup();
    const onGenreChange = vi.fn();
    render(<GenreFilter selectedGenre="all" onGenreChange={onGenreChange} />);

    await user.click(screen.getByRole('button', { name: 'Tech' }));

    expect(onGenreChange).toHaveBeenCalledWith('tech');
  });
});

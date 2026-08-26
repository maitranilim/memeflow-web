import { describe, expect, it } from 'vitest';
import { getMemes, sampleMemes } from './memes';

describe('getMemes', () => {
  it('falls back to sample data when Supabase is not configured', async () => {
    const memes = await getMemes();
    expect(memes).toEqual(sampleMemes);
  });
});

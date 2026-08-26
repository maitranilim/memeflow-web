'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark, Share2, ChevronLeft, ChevronRight, ThumbsDown } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import type { Meme } from '@/lib/types';

interface MemeCardProps {
  memes: Meme[];
}

export default function MemeCard({ memes }: MemeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [direction, setDirection] = useState(0);

  // Keep the index in range when the meme list changes (e.g. a genre filter is applied).
  useEffect(() => {
    setCurrentIndex(0);
  }, [memes]);

  const resetInteractions = () => {
    setLiked(false);
    setDisliked(false);
    setSaved(false);
  };

  const handlePrevious = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
    setDirection(-1);
    resetInteractions();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, memes.length - 1));
    setDirection(1);
    resetInteractions();
  }, [memes.length]);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = async (memeId: string) => {
    const url = `${window.location.origin}/meme/${memeId}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrevious]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (memes.length === 0) {
    return (
      <div className="w-full max-w-2xl text-center py-16 text-gray-400">
        No memes found for this genre yet.
      </div>
    );
  }

  const currentMeme = memes[currentIndex];

  return (
    <div className="relative w-full max-w-2xl">
      {/* Previous/Next Navigation Buttons */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-3 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
        aria-label="Previous meme"
      >
        <ChevronLeft className="w-6 h-6 text-[#00d4c9]" />
      </button>

      <button
        onClick={handleNext}
        disabled={currentIndex === memes.length - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-3 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
        aria-label="Next meme"
      >
        <ChevronRight className="w-6 h-6 text-[#ff4db6]" />
      </button>

      {/* Meme Card */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentMeme.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
        >
          {/* Image */}
          <div className="relative w-full aspect-[3/2] bg-gray-800">
            <Image
              src={currentMeme.imageUrl}
              alt={currentMeme.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Caption & Info */}
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{currentMeme.title}</h2>
              {currentMeme.caption && <p className="text-gray-400">{currentMeme.caption}</p>}
            </div>

            {/* Genre Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#00d4c9] to-[#ff4db6] text-white">
                {currentMeme.genre}
              </span>
              <span className="text-sm text-gray-500">
                {currentMeme.likes} likes • {currentMeme.saves} saves
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <motion.button
                onClick={handleLike}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-colors ${
                  liked ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                aria-label="Like"
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </motion.button>

              <motion.button
                onClick={handleDislike}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-colors ${
                  disliked ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                aria-label="Dislike"
              >
                <ThumbsDown className={`w-5 h-5 ${disliked ? 'fill-current' : ''}`} />
              </motion.button>

              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full transition-colors ${
                  saved ? 'bg-[#00d4c9] text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                aria-label="Save"
              >
                <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
              </motion.button>

              <motion.button
                onClick={() => handleShare(currentMeme.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {memes.map((meme, idx) => (
          <div
            key={meme.id}
            className={`h-1 rounded-full transition-all ${
              idx === currentIndex ? 'w-8 bg-gradient-to-r from-[#00d4c9] to-[#ff4db6]' : 'w-1 bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

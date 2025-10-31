'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function UploadFAB() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-[#00d4c9] to-[#ff4db6] text-white shadow-2xl z-50"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Upload meme"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Modal - to be implemented */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-8 rounded-2xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Upload Meme</h2>
            <p className="text-gray-400 mb-4">Upload feature coming soon!</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#00d4c9] to-[#ff4db6] text-white font-medium"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}

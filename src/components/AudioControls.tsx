'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ isPlaying, onToggle }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <button
        onClick={onToggle}
        className="group relative flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl hover:bg-white/20 transition-all text-white hover:cursor-pointer"
      >
        {/* Efecto de onda cuando suena */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
        )}
        
        {isPlaying ? (
          <Pause size={24} fill="currentColor" />
        ) : (
          <Play size={24} fill="currentColor" className="ml-1" />
        )}
      </button>
    </motion.div>
  );
};
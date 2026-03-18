'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
  targetName: string;
}

export const Intro: React.FC<IntroProps> = ({ onStart, targetName }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center text-white p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Hola {targetName}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-md mx-auto">
            Preparé algo especial para vos. <br />
            Subí el volumen y disfrutá del viaje.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:cursor-pointer"
        >
          <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
            Empezar experiencia <Play size={20} fill="currentColor" />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
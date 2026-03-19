'use client';

import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

interface GiftBoxProps {
  contentImageUrl: string;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ contentImageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Variantes para la tapa: Ahora desaparece y escala un poco al "saltar"
  const lidVariants: Variants = {
    closed: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    open: {
      opacity: 0,
      scale: 1.2,
      y: -100, // Se va hacia arriba mientras desaparece
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Variantes para el regalo: Se posiciona arriba de la caja
  const contentVariants: Variants = {
    closed: {
      y: '20%', // Empezamos un poco abajo dentro de la caja
      opacity: 0,
      scale: 0.5,
      z: 0
    },
    open: {
      y: '-35%', // Sube hasta quedar arriba de la caja
      opacity: 1,
      scale: 1.4,
      transition: { 
        delay: 0.2, 
        duration: 0.8, 
        type: 'spring', 
        stiffness: 100 
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20">
      <button 
        className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        
        {/* 1. Contenido (Imagen con borde blanco) */}
        {/* IMPORTANTE: z-30 para estar POR ENCIMA de la base de la caja */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          variants={contentVariants}
        >
          <div className="bg-white p-2 shadow-2xl rotate-2"> {/* Fondo blanco y pequeña rotación para realismo */}
            <img 
              src={contentImageUrl} 
              alt="Regalo" 
              className="w-full h-auto object-contain border-[8px] border-white" // Borde de 8px
            />
          </div>
        </motion.div>

        {/* 2. Caja - Cuerpo (Cara Frontal) */}
        {/* z-20 para estar detrás del regalo pero delante de la parte trasera */}
        <div className="absolute inset-0 z-20">
          <div className="absolute bottom-0 left-0 right-0 h-4/5 bg-pink-600 rounded-b-lg shadow-xl border-t-4 border-pink-700">
            {/* Cinta vertical */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-pink-400" />
          </div>
        </div>

        {/* 3. Tapa (z-40 para estar arriba de todo al inicio) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              key="lid"
              className="absolute top-0 left-[-2px] right-[-2px] h-1/5 bg-pink-500 rounded-t-lg z-40 shadow-md origin-bottom"
              initial="closed"
              animate="closed"
              exit="open"
              variants={lidVariants}
            >
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-6 bg-pink-400" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-pink-400" />
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-10 h-10 bg-pink-400 rounded-full shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Indicador de click */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-pink-300 text-xl font-light italic whitespace-nowrap"
          >
            {isOpen ? 'Te amo infinitamente mi amor, que seas muy felíz ❤️' : 'Tocá la caja para abrirla'}
          </motion.p>
      </button>
    </div>
  );
};

export default GiftBox;
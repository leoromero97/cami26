'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface LyricSectionProps {
  lyric: string;
  artist?: string;
  onEnter: () => void; // Función que dispararemos para tocar la música
}

export const LyricSection: React.FC<LyricSectionProps> = ({ lyric, artist, onEnter }) => {
  const ref = useRef(null);
  // triggerOnce: false permite que si sube y baja, la animación se repita (opcional)
  const isInView = useInView(ref, { amount: 0.6 }); 

  useEffect(() => {
    if (isInView) {
      onEnter();
    }
  }, [isInView, onEnter]);

  return (
    <section 
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl font-serif italic mb-4 leading-tight">
          "{lyric}"
        </h2>
        {artist && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            className="text-sm uppercase tracking-[0.2em] font-light"
          >
            — {artist}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};
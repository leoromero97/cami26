'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BirthdayHero = () => {
  // 1. Empezamos con un estado vacío para los globos
  const [balloons, setBalloons] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 2. Generamos los globos SOLAMENTE en el cliente
    setIsMounted(true);
    const generatedBalloons = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * (100 - 60 + 1) + 60),
      left: `${Math.random() * 90}%`,
      delay: Math.random() * 5,
      duration: Math.random() * (6 - 4) + 4,
    }));
    setBalloons(generatedBalloons);
  }, []);

  // 3. Si no está montado, renderizamos un contenedor vacío (o solo el título)
  // para que el servidor y el primer render del cliente coincidan.
  if (!isMounted) {
    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-black" />
    );
  }

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black to-zinc-900">
      
      {/* 🎈 Globos Flotantes (ahora vienen del estado) */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ 
            y: '-110vh', 
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: balloon.duration,
            repeat: Infinity,
            delay: balloon.delay,
            ease: 'linear',
          }}
          style={{
            left: balloon.left,
            width: balloon.size,
            height: balloon.size * 1.2,
          }}
          className="absolute z-10"
        >
          <div className="w-full h-full bg-yellow-100 rounded-full relative shadow-inner shadow-white/50">
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-yellow-200" 
                 style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-10 bg-white/30" />
          </div>
        </motion.div>
      ))}

      {/* 📝 Título Principal */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
        className="z-20 text-center px-4"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
          ¡Feliz cumple mi amorrr! 🥳🎉🎂
        </h2>
        <motion.p 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-zinc-400 font-light italic text-lg"
        >
          Después de soplar la vela deslizá hacia abajo despacio...
        </motion.p>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-30" />
    </section>
  );
};
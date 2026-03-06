'use client';

import React, { useState, useRef } from 'react';
import { Intro } from '@/components/Intro';
import { LyricSection } from '@/components/LyricSection';
import { AnimatePresence } from 'framer-motion';
import { BluetoothBanner } from '@/components/BluetoothBanner';

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Referencias de audio
  const reggaetonRef = useRef<HTMLAudioElement | null>(null);
  const marilynRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    setHasStarted(true);
    // Aparece el banner 3s después de empezar
    setTimeout(() => setShowBanner(true), 3000);

    // 10 segundos después de "Empezar", suena el cumple
    setTimeout(() => {
      const audio = new Audio('/audio/reggaeton.mp3');
      reggaetonRef.current = audio;
      audio.play();
    }, 10000);
  };

  const playMarilyn = () => {
    // Si ya está sonando el reggaetón, lo bajamos suavemente (fade out)
    if (reggaetonRef.current) {
        reggaetonRef.current.pause();
    }
    
    // Si Marilyn no está sonando, la disparamos
    if (!marilynRef.current) {
      const audio = new Audio('/audio/marilyn.mp3');
      marilynRef.current = audio;
      audio.volume = 0.7;
      audio.play();
    }
  };

  return (
    <main className="bg-black text-white selection:bg-pink-500/30">
      <AnimatePresence>
        {showBanner && <BluetoothBanner onClose={() => setShowBanner(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!hasStarted && <Intro targetName="[Su Nombre]" onStart={handleStart} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Espacio inicial para que el reggaetón suene antes de la primera frase si querés */}
        <div className="h-screen flex items-center justify-center">
            <p className="text-zinc-500 italic animate-pulse">Bajá despacio...</p>
        </div>

        <LyricSection 
          lyric="Me enamoré, y no pensé Amarte tanto"
          artist="Agrupación Marilyn"
          onEnter={playMarilyn}
        />

        {/* Aquí iremos agregando más secciones */}
        <div className="h-screen flex items-center justify-center">
             <p className="text-zinc-600">Continuará...</p>
        </div>
      </div>
    </main>
  );
}
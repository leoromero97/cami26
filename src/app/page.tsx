"use client";

import React, { useState, useRef } from "react";
import { Intro } from "@/components/Intro";
import { LyricSection } from "@/components/LyricSection";
import { AnimatePresence } from "framer-motion";
import { BluetoothBanner } from "@/components/BluetoothBanner";
import { AudioControls } from "@/components/AudioControls";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); 

  const reggaetonRef = useRef<HTMLAudioElement | null>(null);
  const marilynRef = useRef<HTMLAudioElement | null>(null);
  const delaRef = useRef<HTMLAudioElement | null>(null);

  // Helper para pausar todo
  const pauseAll = () => {
    [reggaetonRef, marilynRef, delaRef].forEach(ref => {
      if (ref.current) ref.current.pause();
    });
  };

  const handleStart = () => {
    setHasStarted(true);
    setShowBanner(true);
    setIsPlaying(true);

    setTimeout(() => {
      const audio = new Audio("/audio/reggaeton.mp3");
      reggaetonRef.current = audio;
      audio.play();
    }, 3000);
  };

  const playMarilyn = () => {
    pauseAll(); // Pausamos lo anterior
    if (!marilynRef.current) {
      const audio = new Audio("/audio/me-enamore.mp3");
      marilynRef.current = audio;
      audio.volume = 0.7;
      audio.play();
    } else {
      marilynRef.current.play();
    }
    setIsPlaying(true);
  };

  const playDela = () => {
    pauseAll();
    if (!delaRef.current) {
      const audio = new Audio("/audio/relajate.mp3");
      delaRef.current = audio;
      audio.volume = 0.7;
      audio.play();
    } else {
      delaRef.current.play();
    }
    setIsPlaying(true);
  };

  // 3. Función para el botón flotante
  const togglePlayPause = () => {
    // Buscamos cuál es el audio que tiene contenido y no está en 0
    const currentAudio = [delaRef, marilynRef, reggaetonRef]
      .map(r => r.current)
      .find(a => a !== null && a.currentTime > 0);

    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="bg-black text-white selection:bg-pink-500/30">
      <AnimatePresence>
        {showBanner && <BluetoothBanner onClose={() => setShowBanner(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!hasStarted && <Intro targetName="Cami" onStart={handleStart} />}
      </AnimatePresence>

      {/* 4. Mostrar el botón solo si la experiencia empezó */}
      <AnimatePresence>
        {hasStarted && (
          <AudioControls isPlaying={isPlaying} onToggle={togglePlayPause} />
        )}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${hasStarted ? "opacity-100" : "opacity-0"}`}>
        <div className="h-screen flex items-center justify-center">
          <p className="text-zinc-500 italic animate-pulse">Bajá despacio...</p>
        </div>

        <LyricSection
          lyric="Me enamoré, y no pensé amarte tanto"
          artist="Agrupación Marilyn"
          onEnter={playMarilyn}
        />

        <LyricSection
          lyric="Tu belleza de diosa me hipnotiza y me provoca, a mí"
          artist="De La Ghetto"
          onEnter={playDela}
        />

        <div className="h-screen flex items-center justify-center">
          <p className="text-zinc-600">Continuará...</p>
          {/* Acá la caja sorpresa con las entradas */}
        </div>
      </div>
    </main>
  );
}
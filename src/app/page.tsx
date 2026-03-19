"use client";

import React, { useState, useRef } from "react";
import { Intro } from "@/components/Intro";
import { LyricSection } from "@/components/LyricSection";
import { AnimatePresence } from "framer-motion";
import { BluetoothBanner } from "@/components/BluetoothBanner";
import { AudioControls } from "@/components/AudioControls";
import { GiftBox } from "@/components/GiftBox";
import { BirthdayHero } from "@/components/BirthdayHero";
import { BluetoothModal } from "@/components/BluetoothModal";

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const reggaetonRef = useRef<HTMLAudioElement | null>(null);
  const marilynRef = useRef<HTMLAudioElement | null>(null);
  const delaRef = useRef<HTMLAudioElement | null>(null);
  const nengoRef = useRef<HTMLAudioElement | null>(null);
  const arcaRef = useRef<HTMLAudioElement | null>(null);

  const pauseAll = () => {
    [reggaetonRef, marilynRef, delaRef, nengoRef, arcaRef].forEach((ref) => {
      if (ref.current) ref.current.pause();
    });
  };

  const handleStart = () => {
    setHasStarted(true);
    setIsPlaying(true);

    setTimeout(() => {
      const audio = new Audio("/audio/reggaeton.mp3");
      reggaetonRef.current = audio;
      audio.play();

      // 🔥 Lógica de los 29 segundos
      setTimeout(() => {
        // 1. Pausamos el audio de reggaetón
        if (reggaetonRef.current) {
          reggaetonRef.current.pause();
          // Opcional: reggaetonRef.current.currentTime = 0; // Si quieres resetearlo
        }

        // 2. Cambiamos el estado del botón flotante a "pausa"
        setIsPlaying(false);

        // 3. Mostramos el modal
        setShowModal(true);
      }, 29000); // 29 segundos exactos
    }, 1000);
  };

  // 4. Nueva función para manejar la confirmación del modal
  const handleConfirmBluetooth = () => {
    // Cerramos el modal
    setShowModal(false);
    // Aquí podrías agregar una pequeña vibración (si es mobile) o
    // un sonido sutil de confirmación si quisieras.
    console.log("✅ Bluetooth confirmado por el usuario.");
  };

  const playMarilyn = () => {
    pauseAll();

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

  // ... resto de funciones play (Dela, Nengo, Arca) iguales ...

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

  const playNengo = () => {
    pauseAll();
    if (!nengoRef.current) {
      const audio = new Audio("/audio/nengo.mp3");
      nengoRef.current = audio;
      audio.volume = 0.7;
      audio.play();
    } else {
      nengoRef.current.play();
    }
    setIsPlaying(true);
  };

  const playArca = () => {
    pauseAll();
    if (!arcaRef.current) {
      const audio = new Audio("/audio/arca.mp3");
      arcaRef.current = audio;
      audio.volume = 0.7;
      audio.play();
    } else {
      arcaRef.current.play();
    }
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    const currentAudio = [arcaRef, nengoRef, delaRef, marilynRef, reggaetonRef]
      .map((r) => r.current)
      .find((a) => a !== null && a.currentTime > 0);

    if (currentAudio) {
      if (isPlaying) currentAudio.pause();
      else currentAudio.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="bg-black text-white selection:bg-pink-500/30">
      <BluetoothModal
        isOpen={showModal}
        onClose={() => setShowModal(false)} // Si cierra con la X o el fondo
        onConfirm={handleConfirmBluetooth} // Si clickea el botón grande
      />

      <AnimatePresence>
        {!hasStarted && (
          <Intro title="Hola amorcito ❤️" onStart={handleStart} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasStarted && (
          <AudioControls isPlaying={isPlaying} onToggle={togglePlayPause} />
        )}
      </AnimatePresence>

      <div
        className={`transition-opacity duration-1000 ${hasStarted ? "opacity-100" : "opacity-0"}`}
      >
        <BirthdayHero />

        {/* El banner aparecerá exactamente cuando este componente entre en vista */}
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
        <LyricSection
          lyric="Amor real, aquí se ríe, aquí se llora, pero nunca la vo'a dejar sola"
          artist="Ñengo Flow"
          onEnter={playNengo}
        />
        <LyricSection
          lyric={`Vino tinto, agua de mar, en la costa de Noruega, una aurora boreal.\nFenómeno en el cielo difícil de no mirar, así es ella, maravillosamente bella`}
          artist="Arcangel"
          onEnter={playArca}
        />
        <GiftBox contentImageUrl="/img/ticket.png" />
      </div>
    </main>
  );
}

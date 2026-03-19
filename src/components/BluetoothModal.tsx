'use client';

import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Bluetooth, X, CheckCircle2 } from 'lucide-react';

interface BluetoothModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Nueva acción para "Ya conecté"
}

export const BluetoothModal: React.FC<BluetoothModalProps> = ({ isOpen, onClose, onConfirm }) => {
  
  // Variantes para el fondo oscuro (overlay)
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Variantes para el modal (el panel central)
  const modalVariants: Variants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 25, 
        delay: 0.1 
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      y: 50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        // 1. Fondo Oscuro (Overlay) - Bloquea interacciones atrás
        <motion.div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          // Permitimos cerrar al hacer click en el fondo (opcional, pero buena UX)
          onClick={onClose} 
        >
          {/* 2. Panel del Modal (z-index mayor) */}
          <motion.div
            className="relative bg-zinc-900 border border-zinc-700 rounded-3xl p-8 shadow-2xl max-w-lg w-full overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            // Evitamos que el click dentro del modal cierre el overlay
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Botón de cerrar (X) en la esquina */}
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors p-1"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {/* Contenido Principal */}
            <div className="flex flex-col items-center text-center space-y-6">
              
              {/* Icono de Bluetooth con pulso animado */}
              <div className="relative flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-pingScale" />
                <div className="bg-blue-600 p-5 rounded-full relative z-10">
                  <Bluetooth size={40} className="text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Mejorá la Experiencia 🎧
                </h3>
                <p className="text-zinc-300 font-light text-base md:text-lg leading-relaxed">
                  Preparé algo muy especial para vos. <br />
                  Te recomiendo conectar tu <span className="font-bold text-blue-400">Bluetooth</span> para escuchar cada detalle 😉
                </p>
              </div>

              {/* Botón de Acción Principal (Confirmar) */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className="cursor-pointer group flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-zinc-100 transition-colors w-full justify-center shadow-lg"
              >
                <CheckCircle2 size={24} className="text-green-600" />
                <span>Ya conecté el bluetooth</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Necesitaremos esta animación custom en tu tailwind.config.ts para el efecto de ping
// (Si no la tienes, avísame y la agregamos juntos)
// keyframes: { pingScale: { '0%, 100%': { transform: 'scale(1)', opacity: '0' }, '50%': { transform: 'scale(1.5)', opacity: '1' } } }
// animation: { pingScale: 'pingScale 2s cubic-bezier(0, 0, 0.2, 1) infinite' }
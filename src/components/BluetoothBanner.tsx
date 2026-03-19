"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bluetooth, X } from "lucide-react";

interface BluetoothBannerProps {
  onClose?: () => void;
}

export const BluetoothBanner: React.FC<BluetoothBannerProps> = ({
  onClose,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="fixed top-4 left-4 right-4 z-50 flex justify-center"
        >
          <div className="bg-pink-100 backdrop-blur-md text-black px-6 py-3 rounded-2xl shadow-2xl border-2 border-pink-400 flex items-center gap-4 max-w-2xl">
            <div className="bg-black p-2 rounded-full animate-pulse">
              <Bluetooth size={20} className="text-white" />
            </div>

            <p className="text-sm md:text-base font-medium">
              Te recomendamos conectar el{" "}
              <span className="font-bold underline">Bluetooth</span> de tu celu para
              escuchar mejor la experiencia 😉
            </p>

            <button
              onClick={handleDismiss}
              className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Cerrar aviso"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

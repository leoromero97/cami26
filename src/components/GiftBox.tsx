"use-client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { div } from "framer-motion/client";

export interface GifboxProps {
  contentImageUrl: string;
}

export default function GiftBox({ contentImageUrl }: Readonly<GifboxProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const lidVariants: Variants = {
    closed: {
      rotateX: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    open: {
      rotateX: -110, // abrir hacia atras con perspectiva
      y: -50, // sube
      transition: { duration: 0.8, ease: "backOut" },
    },
  };

  const contentVariants: Variants = {
    closed: {
      y: "0%",
      opacity: 0,
      scale: 0.8,
    },
    open: {
      y: "-25%",
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20">
      <button
        className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer group"
        style={{ perspective: "1000px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={contentVariants}
        >
          <img
            src={contentImageUrl}
            alt="Regalo"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
        {/* Caja frontal y laterales */}
        <div className="absolute inset-0 z-20">
          {/* caja frontal */}

          <div className="absolute bottom-0 left-0 right-0 h-4/5 bg-pink-600 rounded-b-lg shadow-xl border-t-4 border-pink-700">
            {/* cinta decorativa vertlca */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-pink-400" />
          </div>
        </div>
        {/* Tapa animada 3d */}
        <motion.div
          className="absolute top-0 -left-0.5 -right-0.5 h-1/5 bg-pink-500 rounded-t-lg z-30 shadow-md origin-bottom"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={lidVariants}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* cinta decorativa horizontal en tapa */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-6 bg-pink-400" />
          {/* cinta decorativa vertical en tapa */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-pink-400" />
          {/* lazo minimalista */}
          <div className="absolute -top-3.75 left-1/2 -translate-x-1/2 w-10 h-10 bg-pink-400 rounded-full shadow-lg group-hover:scale-110 transition-transform" />
        </motion.div>
        {/* texto de indicacion sutil */}
        {!isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-pink-300 text-sm font-light italic whitespace-nowrap"
          >
            (Hacé click en la caja)
          </motion.p>
        )}
      </button>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <motion.div
      className="flex items-center space-x-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-10 h-10">
        <img 
          src="https://lh3.googleusercontent.com/JrfHUooYKBIw5QMd7Zb1v9PB8uqBqVv5mwpFUtGWjDRCcFAK96--l8RTgnBsVF53IlkVG7F0psXTIXKwz6aGlgkau5wMULIov-E-rHM=s192"
          alt="Kustom Auto Wrx - Gainesville's Premier Auto Customization Shop"
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white">
          Kustom Auto Wrx | Gainesville Auto Customization Experts
        </h1>
      </div>
    </motion.div>
  );
}
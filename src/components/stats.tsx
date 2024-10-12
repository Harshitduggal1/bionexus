"use client";

import { motion } from "framer-motion";
import NumberTicker from '@/components/ui/number-ticker';
import React from 'react';

// Animation for NumberTicker to provide ultra-smooth transitions
const numberAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      mass: 0.75,
      duration: 2, // Smooth duration to slow down number appearance
      delay: 1, // Delay to ensure number generation finishes before the rest
    },
  },
};

// Animation for container with fade-in and fade-out applied after number generation
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 2.5, // Applies after numbers generate
      staggerChildren: 0.5, // Smooth stagger between elements
      ease: "easeInOut",
    },
  },
};

// Fade-out animation to trigger after a delay
const fadeOutAnimation = {
  initial: { opacity: 1 },
  animate: {
    opacity: 0,
    transition: {
      delay: 4, // Wait before applying fade-out
      duration: 1.5, // Smooth fade-out duration
      ease: "easeInOut",
    },
  },
};

const Stats: React.FC = () => {
  return (
    < div className="min-h-52 bg-transparent mt-40">
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 items-center"
      initial="hidden"
      animate="visible"
      variants={containerAnimation}
    >
      {/* Active Users */}
      <motion.div className="flex flex-col items-center">
        <motion.h2
          className="text-xl md:text-4xl font-bold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600"
          variants={fadeOutAnimation} // Apply fade-out after number ticker
        >
          Over 10k <br /> active users
        </motion.h2>
        <motion.div variants={numberAnimation}>
          <NumberTicker
            value={11990}
            className="font-extrabold text-6xl md:text-7xl bg-clip-text bg-gradient-to-r from-purple-500 via-blue-400 to-pink-500 text-transparent animate-gradient-pulse drop-shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Paying Customers */}
      <motion.div className="flex flex-col items-center">
        <motion.h2
          className="text-xl md:text-4xl font-bold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600"
          variants={fadeOutAnimation}
        >
          2k+ Happy <br /> Paying Customers
        </motion.h2>
        <motion.div variants={numberAnimation}>
          <NumberTicker
            value={2100}
            className="font-extrabold text-6xl md:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-green-400 text-transparent animate-gradient-pulse drop-shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Agencies Joined */}
      <motion.div className="flex flex-col items-center">
        <motion.h2
          className="text-xl md:text-4xl font-bold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600"
          variants={fadeOutAnimation}
        >
          Over 500 agencies <br /> joined us 🎉
        </motion.h2>
        <motion.div variants={numberAnimation}>
          <NumberTicker
            value={619}
            className="font-extrabold text-6xl md:text-7xl bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent animate-gradient-pulse drop-shadow-lg"
          />
        </motion.div>
      </motion.div>
    </motion.div>
    </div>
  );
};

export default Stats;

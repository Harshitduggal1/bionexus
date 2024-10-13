"use client"

import React, { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Shield, Users } from 'lucide-react';
import Link from 'next/link';

type AnimationContainerProps = {
  children: ReactNode;
  delay?: number;
};

const AnimationContainer: React.FC<AnimationContainerProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.6, -0.05, 0.01, 0.99] }}
    className="transform hover:scale-105 transition-all duration-300"
  >
    {children}
  </motion.div>
);

type CardProps = {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  delay: number;
};

const Card: React.FC<CardProps> = ({ title, description, icon: Icon, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimationContainer delay={delay}>
      <motion.div
        className="relative bg-gradient-to-br from-blue-900 via-blue-900/30 to-blue-900/50 shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,255,0.3)] border border-blue-400 hover:border-blue-300 rounded-3xl transition-all duration-300 overflow-hidden ease-out"
        whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 255, 0.5)" }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/80 via-indigo-500/70 to-purple-600/50 opacity-80 blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative z-10 bg-blue-900 bg-opacity-20 backdrop-blur-sm p-8">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="inline-block bg-blue-800 mb-6 p-4 rounded-full"
          >
            <Icon className="w-12 h-12 text-blue-400 transform transition-all duration-300 hover:rotate-12" />
          </motion.div>
          <h3 className="mb-4 font-bold text-2xl text-white tracking-wide">{title}</h3>
          <p className="mb-6 text-white/70 leading-relaxed">{description}</p>
          <Link href="/dashboard" passHref>
            <motion.a
              className="inline-flex items-center bg-gradient-to-r from-blue-500 hover:from-blue-600 via-indigo-500 hover:via-indigo-600 to-purple-500 hover:to-purple-600 shadow-lg hover:shadow-xl px-6 py-3 rounded-full hover:ring-4 hover:ring-purple-500/50 font-semibold text-sm text-white transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
              <motion.span
                className="ml-2 transition-transform group-hover:translate-x-1 duration-300 ease-in-out"
                initial={{ x: 0 }}
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.a>
          </Link>
        </div>
      </motion.div>
    </AnimationContainer>
  );
};

const Services: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-transparent py-24 w-full">
      <div className="flex flex-col items-center px-4 w-full max-w-7xl">
        <AnimationContainer>
          <motion.div
            className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(147,51,234,0.5)] mb-16 p-10 rounded-3xl w-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
            <div className="relative z-10 bg-indigo-900 bg-opacity-30 backdrop-blur-sm p-8 rounded-2xl">
              <h2 className="bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-6 font-extrabold text-5xl text-transparent leading-tight">
                Revolutionize Healthcare Research
              </h2>
              <p className="mb-8 max-w-3xl text-2xl text-gray-100 leading-relaxed">
                Explore BioNexus: Our AI-powered platform designed to accelerate breakthroughs in healthcare and drug discovery.
              </p>
              <Link href="/dashboard" passHref>
                <motion.a
                  className="inline-flex items-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-sky-600 hover:via-purple-600 hover:to-blue-800 shadow-lg hover:shadow-xl px-8 py-4 rounded-full hover:ring-4 hover:ring-purple-500/50 font-bold text-lg text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Dashboard
                  <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1 duration-300 ease-in-out" />
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </AnimationContainer>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 w-full">
          <Card
            title="AI-Driven Insights"
            description="Harness the power of advanced AI algorithms to uncover hidden patterns and accelerate your research."
            icon={TrendingUp}
            delay={0.1}
          />
          <Card
            title="Drug Discovery Tools"
            description="Access state-of-the-art tools for molecular modeling, target identification, and lead optimization."
            icon={Zap}
            delay={0.2}
          />
          <Card
            title="Secure Data Management"
            description="Protect your valuable research data with our robust, HIPAA-compliant security infrastructure."
            icon={Shield}
            delay={0.3}
          />
          <Card
            title="Collaborative Platform"
            description="Connect with leading researchers worldwide and accelerate scientific breakthroughs through collaboration."
            icon={Users}
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;

"use client"


import React, { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, TrendingUp, Shield, Users } from 'lucide-react';

type AnimationContainerProps = {
  children: ReactNode;
  delay?: number;
};

const AnimationContainer: React.FC<AnimationContainerProps> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.6, -0.05, 0.01, 0.99] }}
  >
    {children}
  </motion.div>
);

type CardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.FC<{ className?: string }>;
  delay: number;
};

const Card: React.FC<CardProps> = ({ title, description, href, icon: Icon, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimationContainer delay={delay}>
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-blue-900  via-blue-900/30 to-blue-900/50 rounded-3xl shadow-2xl border border-blue-400 transition-all duration-300 ease-out"
        whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
         className="absolute inset-0 bg-gradient-to-r from-blue-500/80 via-indigo-500/70 to-purple-600/50 blur-lg opacity-80"

          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative z-10 p-8">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-12 h-12 text-blue-400 mb-6" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
          <p className="text-white/70 mb-6">{description}</p>
          <motion.a
            href={href}
            className="group inline-flex items-center px-6 py-3 bg-blue-800 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-violet-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore
            <motion.span
              className="ml-2"
              initial={{ x: 0 }}
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </AnimationContainer>
  );
};

const Services: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full py-24 bg-transparent">
      <div className="flex flex-col items-center w-full max-w-7xl px-4">
        <AnimationContainer>
          <motion.div
            className="w-full p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl mb-16 overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            />
            <div className="relative z-10">
              <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">
                Revolutionize Healthcare Research
              </h2>
              <p className="text-2xl text-gray-100 max-w-3xl">
                Explore BioNexus: Our AI-powered platform designed to accelerate breakthroughs in healthcare and drug discovery.
              </p>
            </div>
          </motion.div>
        </AnimationContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <Card
            title="AI-Driven Insights"
            description="Harness the power of advanced AI algorithms to uncover hidden patterns and accelerate your research."
            href="/ai-insights"
            icon={TrendingUp}
            delay={0.1}
          />
          <Card
            title="Drug Discovery Tools"
            description="Access state-of-the-art tools for molecular modeling, target identification, and lead optimization."
            href="/drug-discovery"
            icon={Zap}
            delay={0.2}
          />
          <Card
            title="Secure Data Management"
            description="Protect your valuable research data with our robust, HIPAA-compliant security infrastructure."
            href="/data-security"
            icon={Shield}
            delay={0.3}
          />
          <Card
            title="Collaborative Platform"
            description="Connect with leading researchers worldwide and accelerate scientific breakthroughs through collaboration."
            href="/collaboration"
            icon={Users}
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;

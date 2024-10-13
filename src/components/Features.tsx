"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dna, Microscope, Pill, Brain, LifeBuoy } from "lucide-react";
import AnimationContainer from './animation-container';

const features = [
  {
    name: "AI-Powered Drug Discovery",
    description: "Leverage advanced AI algorithms to accelerate the drug discovery process and identify promising candidates.",
    icon: Dna,
    href: "/dashboard",
    color: "from-blue-500 via-indigo-600 to-violet-700"
  },
  {
    name: "Molecular Modeling",
    description: "Utilize state-of-the-art molecular modeling and simulation tools for precise drug-target interactions.",
    icon: Microscope,
    href: "/dashboard",
    color: "from-emerald-400 via-teal-500 to-cyan-600"
  },
  {
    name: "Biomedical Data Analysis",
    description: "Harness machine learning and big data analytics to extract insights from complex biomedical datasets.",
    icon: Brain,
    href: "/dashboard",
    color: "from-amber-400 via-orange-500 to-rose-600"
  },
  {
    name: "Precision Medicine",
    description: "Advance personalized healthcare solutions by analyzing patient-specific data with AI algorithms.",
    icon: Pill,
    href: "/dashboard",
    color: "from-fuchsia-500 via-purple-600 to-pink-700"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export function Features() {
  return (
    <motion.div
      className="py-24 bg-transparent text-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <AnimationContainer>
        <motion.div
          className="max-w-4xl mx-auto text-center px-4"
          variants={containerVariants}
        >
          <div className="flex items-center justify-center mb-6">
            <LifeBuoy className="w-4 h-4 mr-2" />
            <motion.span 
              className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-white via-blue-300 to-violet-600 bg-clip-text text-center text-2xl font-bold leading-none text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Revolutionize Your Research
            </motion.span>
          </div>
          <motion.h1
            className="mt-4 text-5xl font-extrabold tracking-tight pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-indigo-300 via-pink-400 to-purple-500 bg-clip-text text-center leading-none text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Accelerate Drug Discovery with AI
          </motion.h1>
          <motion.p
            className="mt-6 text-xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white/80 via-blue-200 to-purple-300 bg-clip-text text-center font-semibold leading-relaxed text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            BioNexus AI empowers you to revolutionize healthcare research. Experience cutting-edge,
            AI-driven solutions that adapt to your scientific needs.
          </motion.p>
        </motion.div>
      </AnimationContainer>
      <motion.div
        className="mt-20 max-w-6xl mx-auto px-4"
        variants={containerVariants}
      >
        <motion.div
          className="grid gap-12 lg:grid-cols-2"
          variants={containerVariants}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              className="relative group"
              variants={itemVariants}
            >
              <AnimationContainer>
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 0.75, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                />
                <div className="relative p-8">
                  <feature.icon className="w-12 h-12 text-white mb-5" />
                  <h3 className="text-2xl font-bold mb-3">{feature.name}</h3>
                  <p className="text-gray-100 mb-6">{feature.description}</p>
                  <Link href={feature.href} passHref>
                    <motion.a
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-lg hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.a>
                  </Link>
                </div>
              </AnimationContainer>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Features;
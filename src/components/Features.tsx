"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dna, Microscope, Pill, Stethoscope, Brain, LifeBuoy } from "lucide-react";
import AnimationContainer from './animation-container';

const features = [
  {
    name: "AI-Powered Drug Discovery",
    description: "Leverage advanced AI algorithms to accelerate the drug discovery process and identify promising candidates.",
    icon: Dna,
    href: "/drug-discovery",
    color: "from-blue-400 to-cyan-300"
  },
  {
    name: "Molecular Modeling",
    description: "Utilize state-of-the-art molecular modeling and simulation tools for precise drug-target interactions.",
    icon: Microscope,
    href: "/molecular-modeling",
    color: "from-green-600 to-green-300"
  },
  {
    name: "Biomedical Data Analysis",
    description: "Harness machine learning and big data analytics to extract insights from complex biomedical datasets.",
    icon: Brain,
    href: "/data-analysis",
    color: "from-orange-500 to-yellow-400"
  },
  {
    name: "Precision Medicine",
    description: "Advance personalized healthcare solutions by analyzing patient-specific data with AI algorithms.",
    icon: Pill,
    href: "/precision-medicine",
    color: "from-purple-400 to-pink-500"
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
              className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-white to-violet-600 bg-clip-text text-center text-2xl font-bold leading-none text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Revolutionize Your Scheduling
            </motion.span>
          </div>
          <motion.h1
            className="mt-4 text-5xl font-extrabold tracking-tight pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-indigo-300 via-pink-400 to-purple-500 bg-clip-text text-center leading-none text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Schedule Meetings in Minutes
          </motion.h1>
          <motion.p
            className="mt-6 text-xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white/80 to-gray-300/50  bg-clip-text text-center font-semibold leading-relaxed text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            DAYFLOW.IO empowers you to take control of your time. Experience lightning-fast,
            secure, and effortless scheduling that adapts to your needs.
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
                      className="inline-flex items-center px-4 py-2 bg-white text-purple-600 rounded-full font-semibold text-sm transition-colors duration-300 hover:bg-purple-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
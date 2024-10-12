"use client"

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const FAQS = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const controls = useAnimation();
  const sectionRef = useRef(null);

  const faqs = [
    {
      question: 'How does BioNexus AI accelerate drug discovery?',
      answer: 'BioNexus AI leverages advanced machine learning algorithms to analyze vast datasets of molecular structures, biological pathways, and clinical outcomes, significantly reducing the time and cost of identifying promising drug candidates.',
    },
    {
      question: 'What types of data can BioNexus AI analyze for biomedical research?',
      answer: 'Our platform integrates diverse data sources including genomics, proteomics, clinical trials, and literature databases to extract meaningful insights for drug development and personalized medicine.',
    },
    {
      question: 'How does BioNexus AI support target identification?',
      answer: 'BioNexus AI employs sophisticated algorithms to analyze complex biological networks and disease pathways, helping researchers discover and validate novel therapeutic targets with a higher probability of clinical success.',
    },
    {
      question: 'Can BioNexus AI assist with molecular modeling and simulation?',
      answer: 'Yes, our platform utilizes state-of-the-art computational methods to predict drug-target interactions, analyze molecular dynamics, and optimize lead compounds, enabling data-driven decision-making in early-stage drug development.',
    },
    {
      question: 'How does BioNexus AI contribute to precision medicine?',
      answer: 'BioNexus AI analyzes patient-specific data to develop tailored treatment strategies, optimizing drug efficacy and minimizing adverse effects based on individual genetic profiles and biomarkers.',
    },
    {
      question: 'What is BioNexus AIs approach to drug repurposing?',
      answer: 'Our AI-powered platform analyzes vast datasets of drug-disease interactions to identify potential new indications for approved drugs, accelerating the development of novel treatments and reducing costs.',
    },
    {
      question: 'How secure is the data processed by BioNexus AI?',
      answer: 'We employ enterprise-grade encryption and adhere to strict data protection protocols to ensure the confidentiality and integrity of all research data processed on our platform.',
    },
    {
      question: 'Can BioNexus AI integrate with existing research tools and databases?',
      answer: 'Yes, our platform offers seamless API integration with major research tools, databases, and laboratory information management systems to enhance workflow efficiency and data consistency.',
    },
   
    
  ];
  

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const titleAnimation = gsap.to(".faq-title", {
      duration: 3,
      backgroundImage: "linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff, #00ffff)",
      backgroundSize: "300% 300%",
      backgroundClip: "text",
      color: "transparent",
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    gsap.to(".accordion-group", {
      scrollTrigger: {
        trigger: ".accordion-group",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      boxShadow: "0 0 30px rgba(255, 0, 255, 0.3)",
    });

    return () => {
      titleAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }));
  }, [controls]);

  return (
    <section ref={sectionRef} className="py-24 bg-transparent min-h-screen flex items-center justify-center overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <h1 className="faq-title text-6xl font-extrabold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            FAQs
          </h1>
          <motion.h2 
            className="text-4xl font-manrope text-center font-extrabold text-white leading-[3.25rem]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        <motion.div 
          className="accordion-group space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              custom={index}
              initial={{ opacity: 0, x: -100 }}
              animate={controls}
              className="accordion rounded-2xl overflow-hidden"
            >
              <motion.button
                className="accordion-toggle group flex items-center justify-between w-full p-6 text-left 
                           bg-gradient-to-r from-purple-800 to-indigo-900 text-white hover:from-pink-600 hover:to-purple-700
                           transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => toggleAccordion(index)}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 0, 255, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <h5 className="text-xl font-bold">{faq.question}</h5>
                <motion.svg
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="accordion-content p-6 bg-gradient-to-r from-blue-800 via-violet-600 to-purple-400
                    shadow-lg shadow-blue-700 backdrop-blur-sm border border-fuchsia-600 rounded-lg"
                  >
                    <motion.p 
                      className="text-lg text-white font-medium leading-7"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQS; 
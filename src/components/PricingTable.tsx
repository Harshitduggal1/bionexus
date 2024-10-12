"use client";

import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const PricingComparisonTable = () => {
  const plans = [
    { name: "Premium", features: ["AI-driven learning paths", "Smart course recommendations", "Unlimited training simulations", "Real-time learner analytics", "Secure payment systems", "Customizable templates", "AI-powered content suggestions", "Priority support"] },
    { name: "Enterprise", features: ["AI-driven learning paths", "Smart course recommendations", "Unlimited training simulations", "Real-time learner analytics", "Secure payment systems", "Customizable templates", "AI-powered content suggestions", "Priority support", "AI-powered diagnostics", "Full control over learning environments", "Unlimited access to AI models", "Global language support", "Dedicated account manager", "Exclusive newsletters"] },
    { name: "Customized", features: ["AI-driven learning paths", "Smart course recommendations", "Unlimited training simulations", "Real-time learner analytics", "Secure payment systems", "Customizable templates", "AI-powered content suggestions", "Priority support", "AI-powered diagnostics", "Full control over learning environments", "Unlimited access to AI models", "Global language support", "Custom workflows", "Contact us for pricing"] },
  ];

  const features = [
    "AI-driven learning paths", "Smart course recommendations", "Unlimited training simulations", "Real-time learner analytics",
    "Secure payment systems", "Customizable templates", "AI-powered content suggestions", "Priority support", "AI-powered diagnostics",
    "Full control over learning environments", "Unlimited access to AI models", "Global language support", "Dedicated account manager",
    "Exclusive newsletters", "Custom workflows", "Contact us for pricing",
  ];

  const tableRef = useRef(null);
  const isInView = useInView(tableRef, { once: false, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 1
      }
    }
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1,
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.03
      }
    }
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const checkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: { 
      scale: 1.2, 
      rotate: 360,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  const glowVariants = {
    initial: { boxShadow: "0 0 0 rgba(192,38,211,0)" },
    hover: { 
      boxShadow: "0 0 100px rgba(192,38,211,0.8)",
      transition: { duration: 0.5, yoyo: Infinity }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto p-8 bg-transparent bg-opacity-90 min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <motion.h2
        variants={titleVariants}
        className="text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 mb-16 tracking-tight"
      >
        Compare plans
      </motion.h2>
      <motion.div
        ref={tableRef}
        initial="initial"
        whileHover="hover"
        animate={controls}
        variants={glowVariants}
        className="w-full overflow-x-auto bg-gradient-to-br from-sky-900 via-purple-700 to-pink-500 p-6 rounded-3xl backdrop-blur-xl transition-all duration-500"
      >
        <motion.table 
          className="w-full text-left table-auto"
          variants={tableVariants}
        >
          <thead>
            <motion.tr 
              className="text-xl text-white font-extrabold"
              variants={rowVariants}
            >
              <motion.th variants={cellVariants} className="p-4 rounded-tl-2xl">Features</motion.th>
              {plans.map((plan, idx) => (
                <motion.th
                  key={idx}
                  variants={cellVariants}
                  className="p-4 text-center"
                >
                  <motion.div 
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#2c116e] to-[#0015ff]"
                    whileHover={{ scale: 1.1, rotateY: 360 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
                  >
                    {plan.name}
                  </motion.div>
                </motion.th>
              ))}
            </motion.tr>
          </thead>
          <tbody className="text-white">
            <AnimatePresence>
              {features.map((feature, idx) => (
                <motion.tr
                  key={idx}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`${idx % 2 === 0 ? "bg-purple-900/20" : "bg-transparent"} hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300`}
                >
                  <motion.td variants={cellVariants} className="p-4 text-lg flex items-center">
                    <motion.span
                      className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-black rounded-full px-3 py-1 mr-2 shadow-lg"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      ✔
                    </motion.span>
                    {feature}
                  </motion.td>
                  {plans.map((plan, planIdx) => (
                    <motion.td key={planIdx} variants={cellVariants} className="p-4 text-center">
                      {plan.features.includes(feature) ? (
                        <motion.span
                          variants={checkVariants}
                          whileHover="hover"
                          className="text-emerald-500 text-3xl inline-block cursor-pointer"
                        >
                          ✔
                        </motion.span>
                      ) : (
                        <motion.span
                          variants={checkVariants}
                          whileHover="hover"
                          className="text-pink-600 text-3xl inline-block cursor-pointer"
                        >
                          ✖
                        </motion.span>
                      )}
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </motion.table>
      </motion.div>
    </motion.div>
  );
};

export default PricingComparisonTable;
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

import ai1 from "@/public/ai1.png";
import ai2 from "@/public/a12.png";

interface TabData {
  [key: string]: { text: string; image: StaticImageData; href: string };
}

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("AI-Powered Drug Discovery");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const controls = useAnimation();
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const tabData: TabData = {
    "AI-Powered Drug Discovery": {
      text: `Leverage our advanced AI algorithms to accelerate the drug discovery process. Our platform integrates vast datasets of molecular structures, biological pathways, and clinical outcomes to identify promising drug candidates with higher accuracy and efficiency. This approach significantly reduces time-to-market and development costs while increasing the likelihood of successful drug development.`,
      image: ai1,
      href: "/ai-drug-discovery",
    },
    "Molecular Modeling and Simulation": {
      text: `Utilize state-of-the-art molecular modeling and simulation tools to predict drug-target interactions and optimize lead compounds. Our platform employs sophisticated computational methods to analyze molecular dynamics, binding affinities, and pharmacokinetic properties, enabling researchers to make data-driven decisions in the early stages of drug development.`,
      image: ai2,
      href: "/molecular-modeling",
    },
    "Biomedical Data Analysis": {
      text: `Harness the power of machine learning and big data analytics to extract meaningful insights from complex biomedical datasets. Our platform integrates diverse data sources, including genomics, proteomics, and clinical trials, to identify novel drug targets, predict drug efficacy, and optimize clinical trial designs.`,
      image: ai1,
      href: "/biomedical-data-analysis",
    },
    "Target Identification": {
      text: `Employ our AI-driven approach to identify and validate novel drug targets. By analyzing complex biological networks and disease pathways, our platform helps researchers discover promising therapeutic targets with a higher probability of clinical success.`,
      image: ai2,
      href: "/target-identification",
    },
    "Precision Medicine": {
      text: `Advance personalized healthcare solutions by leveraging our AI algorithms to analyze patient-specific data. Our platform enables the development of tailored treatment strategies, optimizing drug efficacy and minimizing adverse effects based on individual genetic profiles and biomarkers.`,
      image: ai2,
      href: "/precision-medicine",
    },
    "Drug Repurposing": {
      text: `Explore new therapeutic applications for existing drugs using our AI-powered drug repurposing platform. By analyzing vast datasets of drug-disease interactions, we help identify potential new indications for approved drugs, accelerating the development of novel treatments.`,
      image: ai1,
      href: "/drug-repurposing",
    },
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    gsap.fromTo(
      tabsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: "power3.out", duration: 0.8 }
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.3 },
    },
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const handleTabClick = async (tab: string) => {
    await controls.start({ opacity: 0, y: -20 });
    setActiveTab(tab);
    controls.start({ opacity: 1, y: 0 });
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 mt-16 p-4 min-h-screen font-sans">
      <motion.div
        className="border-white bg-white bg-opacity-10 shadow-2xl backdrop-blur-2xl backdrop-filter p-8 border border-opacity-20 rounded-3xl w-full max-w-4xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8 font-black text-5xl text-center text-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          BioNexus AI Healthcare Solutions
        </motion.h1>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(tabData).map((tab, index) => (
            <motion.button
              key={tab}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              className={`py-2 px-4 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white"
                  : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              }`}
              onClick={() => handleTabClick(tab)}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
              variants={tabVariants}
              animate={activeTab === tab ? "active" : "inactive"}
            >
              {tab}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white bg-opacity-5 shadow-inner backdrop-blur-lg backdrop-filter p-6 rounded-xl"
          >
            {isLoading ? (
              <motion.div
                className="flex justify-center items-center h-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="border-white border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={tabData[activeTab].image}
                    alt={activeTab}
                    priority
                    className="relative border-white shadow-2xl mb-6 border border-opacity-20 rounded-lg lg:rounded-2xl w-full object-cover"
                  />
                </motion.div>
                <motion.p
                  className="mb-6 text-lg text-white leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {tabData[activeTab].text}
                </motion.p>
                <Link href={tabData[activeTab].href} passHref>
                  <motion.button
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg hover:shadow-xl mt-4 px-8 py-3 rounded-full font-bold text-white transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Explore More
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Tabs;
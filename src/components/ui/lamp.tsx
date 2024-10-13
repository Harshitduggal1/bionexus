"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib";

import Particles from "./particles";

export default function LampDemo() {
  return (
    <LampContainer>
  
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-clip-text bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 mt-8 py-4 font-medium text-4xl text-center text-transparent md:text-7xl tracking-tight"
      >
        Revolutionizing Healthcare with 
        <br/>AI-Powered Research
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-clip-text bg-gradient-to-b from-slate-800 to-gray-300/30 mt-8 py-4 font-medium text-center text-transparent text-xl md:text-3xl leading-relaxed tracking-tight"
      >
        Accelerating Drug Discovery and Development
     through Advanced AI Analytics and Machine Learning,
   Revolutionizing Healthcare Research with
        <br/>Predictive Modeling and Data-Driven Insights
      for Faster, More Efficient Clinical Trials
        and Personalized Treatment Strategies
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative z-0 flex flex-1 justify-center items-center w-full isolate scale-y-125">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="[--conic-position:from_70deg_at_center_top] right-1/2 absolute inset-auto border-white bg-gradient-to-r from-purple-300 to-blue-300 bg-opacity-20 shadow-lg backdrop-blur-xl backdrop-filter border border-opacity-10 rounded-lg w-[30rem] h-56 text-white overflow-visible"
        >
          <div className="[mask-image:linear-gradient(to_top,white,transparent)] bottom-0 left-0 z-20 absolute bg-transparent w-[100%] h-40" />
          <div className="[mask-image:linear-gradient(to_right,white,transparent)] bottom-0 left-0 z-20 absolute bg-transparent w-40 h-[100%]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="[--conic-position:from_290deg_at_center_top] left-1/2 absolute inset-auto border-white bg-gradient-to-r from-cyan-200 to-blue-300 bg-opacity-10 shadow-cyan-300 shadow-lg backdrop-blur-3xl backdrop-brightness-110 backdrop-contrast-125 backdrop-saturate-150 border border-opacity-10 rounded-lg w-[30rem] h-56 text-white"

        >
          <div className="right-0 bottom-0 [mask-image:linear-gradient(to_left,white,transparent)] z-20 absolute bg-transparent w-40 h-[100%]" />
          <div className="[mask-image:linear-gradient(to_top,white,transparent)] right-0 bottom-0 z-20 absolute bg-transparent w-[100%] h-40" />
        </motion.div>
        <div className="top-1/2 absolute bg-transparent blur-2xl w-full h-48 translate-y-12 scale-x-150"></div>
        <div className="top-1/2 z-50 absolute bg-transparent opacity-10 backdrop-blur-md w-full h-48"></div>
        <div className="z-50 absolute inset-auto bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-600 opacity-50 blur-3xl rounded-full w-[28rem] h-36 -translate-y-1/2"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="z-30 absolute inset-auto bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 blur-2xl rounded-full w-64 h-36 -translate-y-[6rem]"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="z-50 absolute inset-auto bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-600 w-[30rem] h-0.5 -translate-y-[7rem]"
        ></motion.div>

        <div className="z-40 absolute inset-auto bg-transparent w-full h-44 -translate-y-[12.5rem]"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center px-5 -translate-y-80">
        {children}
      </div>
    </div>
  );
};

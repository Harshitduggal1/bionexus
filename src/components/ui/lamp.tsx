"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-blue-600 mt-8 py-4 font-bold text-5xl text-center text-transparent md:text-8xl tracking-tighter"
      >
        Illuminate Your World <br /> with Stunning Lamps
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
          initial={{ opacity: 0, width: "15rem" }}
          whileInView={{ opacity: 1, width: "40rem" }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="[--conic-position:from_70deg_at_center_top] right-1/2 absolute inset-auto bg-gradient-conic from-purple-600 via-pink-500 to-transparent w-[40rem] h-72 text-white overflow-visible"
        >
          <div className="[mask-image:linear-gradient(to_top,white,transparent)] bottom-0 left-0 z-20 absolute bg-transparent w-[100%] h-56" />
          <div className="[mask-image:linear-gradient(to_right,white,transparent)] bottom-0 left-0 z-20 absolute bg-transparent w-56 h-[100%]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, width: "15rem" }}
          whileInView={{ opacity: 1, width: "40rem" }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="[--conic-position:from_290deg_at_center_top] left-1/2 absolute inset-auto bg-gradient-conic from-transparent via-blue-500 to-purple-600 w-[40rem] h-72 text-white"
        >
          <div className="right-0 bottom-0 [mask-image:linear-gradient(to_left,white,transparent)] z-20 absolute bg-transparent w-56 h-[100%]" />
          <div className="[mask-image:linear-gradient(to_top,white,transparent)] right-0 bottom-0 z-20 absolute bg-transparent w-[100%] h-56" />
        </motion.div>
        <div className="top-1/2 absolute bg-gradient-to-b from-purple-600 to-transparent blur-3xl w-full h-64 translate-y-12 scale-x-150"></div>
        <div className="top-1/2 z-50 absolute bg-transparent opacity-30 backdrop-blur-xl w-full h-64"></div>
        <div className="z-50 absolute inset-auto bg-pink-500 opacity-70 blur-3xl rounded-full w-[36rem] h-48 -translate-y-1/2"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "24rem" }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="z-30 absolute inset-auto bg-blue-600 blur-3xl rounded-full w-96 h-48 -translate-y-[8rem]"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "40rem" }}
          transition={{
            delay: 0.3,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="z-50 absolute inset-auto bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 w-[40rem] h-1 -translate-y-[9rem]"
        ></motion.div>

        <div className="z-40 absolute inset-auto bg-transparent w-full h-56 -translate-y-[16rem]"></div>
      </div>

      <div className="relative z-50 flex flex-col items-center px-5 -translate-y-96">
        {children}
      </div>
    </div>
  );
};

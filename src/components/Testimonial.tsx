"use client"

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import producthunt from "@/public/producthunt.svg";

gsap.registerPlugin(ScrollTrigger);

export function Testimonial() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const quoteRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    const quote = quoteRef.current;
    const image = imageRef.current;
    const title = titleRef.current;

    gsap.fromTo(
      quote,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      image,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: image,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      title,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
        },
      }
    );
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hover: { scale: 1.05, rotate: 2 },
    tap: { scale: 0.95, rotate: -2 },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const svgVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
      },
    },
  };

  const footerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 max-w-[85rem]"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <AnimatePresence>
        <motion.blockquote
          className="lg:mx-auto lg:w-3/5 text-center"
          variants={itemVariants}
        >
          <motion.div
            className="flex justify-center items-center"
            ref={imageRef}
            variants={imageVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Image
              src={producthunt}
              alt="Hero image"
              priority
              className="max-w-full h-auto"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.p
              ref={quoteRef}
              className="relative font-medium text-xl sm:text-2xl md:text-3xl md:leading-normal"
              variants={quoteVariants}
            >
              <motion.svg
                className="top-0 absolute sm:w-24 sm:h-24 text-muted transform -translate-x-8 -translate-y-8 size-16 start-0"
                width={16}
                height={13}
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <motion.path
                  d="M7.18079 9.25611C7.18079 10.0101 6.93759 10.6211 6.45119 11.0891C5.96479 11.5311 5.35039 11.7521 4.60799 11.7521C3.71199 11.7521 2.96958 11.4531 2.38078 10.8551C1.81758 10.2571 1.53598 9.39911 1.53598 8.28111C1.53598 7.08511 1.86878 5.91511 2.53438 4.77111C3.22559 3.60111 4.18559 2.67811 5.41439 2.00211L6.29759 3.36711C5.63199 3.83511 5.09439 4.35511 4.68479 4.92711C4.30079 5.49911 4.04479 6.16211 3.91679 6.91611C4.14719 6.81211 4.41599 6.76011 4.72319 6.76011C5.43999 6.76011 6.02879 6.99411 6.48959 7.46211C6.95039 7.93011 7.18079 8.52811 7.18079 9.25611ZM14.2464 9.25611C14.2464 10.0101 14.0032 10.6211 13.5168 11.0891C13.0304 11.5311 12.416 11.7521 11.6736 11.7521C10.7776 11.7521 10.0352 11.4531 9.44639 10.8551C8.88319 10.2571 8.60159 9.39911 8.60159 8.28111C8.60159 7.08511 8.93439 5.91511 9.59999 4.77111C10.2912 3.60111 11.2512 2.67811 12.48 2.00211L13.3632 3.36711C12.6976 3.83511 12.16 4.35511 11.7504 4.92711C11.3664 5.49911 11.1104 6.16211 10.9824 6.91611C11.2128 6.81211 11.4816 6.76011 11.7888 6.76011C12.5056 6.76011 13.0944 6.99411 13.5552 7.46211C14.016 7.93011 14.2464 8.52811 14.2464 9.25611Z"
                  fill="currentColor"
                  variants={svgVariants}
                />
              </motion.svg>
              <motion.span
                className="relative z-10 bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mt-6 font-extrabold text-4xl text-transparent"
                variants={textVariants}
              >
                BioNexus: Revolutionizing AI Healthcare Drug Research!
                <br />
                I highly recommend BioNexus for drug discovery!
                <br />
                Its advanced AI algorithms and comprehensive database have transformed our research
                <br />
                capabilities. No wonder its leading the field in AI-driven healthcare!
                Experience the future of drug development with BioNexus!
              </motion.span>
            </motion.p>
          </motion.div>
          <motion.footer className="mt-6" variants={itemVariants}>
            <motion.div
              ref={titleRef}
              className="font-semibold text-6xl text-extrabold text-gray-600 dark:text-white/80"
              variants={footerVariants}
            >
              Join BIONEXUS Now⚡️
            </motion.div>
            <motion.div
              className="bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mt-6 font-extrabold text-4xl text-transparent"
              variants={textVariants}
            >
              #1 on Product Hunt
            </motion.div>
          </motion.footer>
        </motion.blockquote>
      </AnimatePresence>
    </motion.div>
  );
}
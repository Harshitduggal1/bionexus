"use client";

import { FC, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Lexend } from "next/font/google";
import { Button, ButtonProps } from "@chakra-ui/react";
import PricingComparisonTable from "./PricingTable";
import React from "react";
import {RetroGri} from "./Retrogrid";

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

const ButtonLink: FC<ButtonLinkProps> = ({ children, href, ...props }) => (
  <Button as="a" href={href} {...props}>
    {children}
  </Button>
);

const font = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const DATA_CARDS = [
    {
      price: isYearly ? 499 : 49,
      title: "Starter",
      text: "Perfect for researchers and small labs getting started with AI in healthcare.",
      list: [
        { value: "Access to basic LLM for healthcare research" },
        { value: "Limited drug discovery tools" },
        { value: "Basic data analysis capabilities" },
        { value: "Up to 100 API calls per month" },
        { value: "Email support" },
      ],
    },
    {
      price: isYearly ? 1999 : 199,
      originalPrice: isYearly ? 2499 : 249,
      title: "Professional",
      text: "Ideal for growing research teams and medium-sized pharmaceutical companies.",
      list: [
        { value: "Everything in Starter, plus:" },
        { value: "Advanced LLM for healthcare research" },
        { value: "Comprehensive drug discovery toolkit" },
        { value: "Advanced data analysis and visualization" },
        { value: "Up to 1000 API calls per month" },
        { value: "Priority email and chat support" },
        { value: "Collaboration tools for team research" },
      ],
      recommended: true,
    },
    {
      price: isYearly ? 4999 : 499,
      originalPrice: isYearly ? 5999 : 599,
      title: "Enterprise",
      text: "For large pharmaceutical companies and research institutions.",
      list: [
        { value: "Everything in Professional, plus:" },
        { value: "Customizable LLM for specific research needs" },
        { value: "Unlimited API calls" },
        { value: "Advanced drug simulation capabilities" },
        { value: "Dedicated account manager" },
        { value: "24/7 premium support" },
        { value: "On-premise deployment options" },
      ],
    },
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemAnimation = {
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

  const cardAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const gradientTextStyle = {
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    backgroundImage: "linear-gradient(to right, #4F46E5, #06B6D4)",
  };

  const numberAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  };

  return (
    <>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
        id="price"
        className="bg-transparent py-20 sm:py-32 overflow-hidden"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <section>
            <motion.div
              variants={itemAnimation}
              className="mb-16 md:mb-20 text-center"
            >
              <motion.h2
                style={{ ...font.style, ...gradientTextStyle }}
                className="mb-5 font-bold text-4xl text-white md:text-6xl tracking-tight"
                variants={itemAnimation}
              >
                Simple pricing for everyone
              </motion.h2>
              <motion.p
                variants={itemAnimation}
                className="mx-auto max-w-3xl text-lg text-white md:text-xl leading-8"
              >
                It doesnt matter what size your business is, our software wont
                work well for you.
              </motion.p>
            </motion.div>

            <motion.div
              variants={itemAnimation}
              className="flex justify-center items-center mb-12"
            >
              <motion.div
                className="flex items-center bg-indigo-800 p-1 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.button
                    key={isYearly ? "monthly" : "yearly"}
                    className={`px-6 py-3 rounded-full text-lg font-medium ${!isYearly
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : "text-white/90"}`}
                    onClick={() => setIsYearly(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Monthly
                  </motion.button>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.button
                    key={isYearly ? "yearly" : "monthly"}
                    className={`px-6 py-3 rounded-full text-lg font-medium ${isYearly
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      : "text-gray-300"}`}
                    onClick={() => setIsYearly(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Yearly
                  </motion.button>
                </AnimatePresence>
              </motion.div>
            </motion.div>
            <motion.div
              variants={containerAnimation}
              className="gap-8 grid grid-cols-1 md:grid-cols-3"
            >
              {DATA_CARDS.map((card, index) => (
                <motion.div
                  key={card.title}
                  variants={cardAnimation}
                  className={`bg-gradient-to-br from-slate-800 to-indigo-900 p-8 rounded-3xl border-2 border-transparent hover:border-indigo-500 shadow-lg transition-all duration-300 ease-in-out relative ${card.recommended ? 'border-indigo-500' : ''}`}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)" }}
                >
                  {card.recommended && (
                    <motion.div
                      className="-top-4 left-1/2 absolute bg-gradient-to-r from-blue-600  via-indigo-600 to-fuchsia-600 px-4 py-1 rounded-full font-bold text-sm text-white transform -translate-x-1/2"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Most Recommended🎉
                    </motion.div>
                  )}
                  <motion.div className="text-center" variants={itemAnimation}>
                    <h3
                      style={{ ...font.style }}
                      className="mb-4 font-bold text-2xl text-white/80"
                    >
                      {card.title}
                    </h3>
                    <p className="mb-6 text-white/80">{card.text}</p>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={card.price}
                        className="mb-2 font-bold text-4xl text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          $
                        </motion.span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          {card.price.toFixed(2)}
                        </motion.span>
                        <motion.span
                          className="text-gray-400 text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          {isYearly ? "/year" : "/month"}
                        </motion.span>
                      </motion.div>
                    </AnimatePresence>
                    {card.originalPrice && (
                      <motion.p
                        className="mb-2 text-gray-400 text-lg line-through"
                        {...numberAnimation}
                      >
                        ${card.originalPrice.toFixed(2)}
                      </motion.p>
                    )}
                    {card.originalPrice && (
                      <motion.p
                        className="mb-4 font-bold text-green-400 text-lg"
                        {...numberAnimation}
                      >
                        30% off
                      </motion.p>
                    )}
                    <ButtonLink href="/dashboard" className="bg-gradient-to-r from-pink-700 hover:from-blue-500 via-violet-700 to-blue-800 hover:via-purple-600 hover:to-fuchsia-500 px-6 py-3 rounded-full w-full font-bold text-white transition-all duration-300">
                      Get started✨
                    </ButtonLink>
                  </motion.div>
                  <motion.ul className="space-y-4 mt-8" variants={itemAnimation}>
                    {card.list.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center space-x-2 text-white/80"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                        <span>{item.value}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </motion.section>
      <PricingComparisonTable />
      <RetroGri/>
    </>
  );
}
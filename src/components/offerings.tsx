"use client";

import { offerings } from './constants';
import { LucideIcon, Microscope, Dna, Brain, Pill, HeartPulse, Stethoscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimationContainer from "./animation-container";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

const Offerings = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <motion.div 
            className="relative flex flex-col justify-center items-center py-20"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background Shapes */}
            <motion.div 
                className="lg:block top-0 -right-1/5 -z-10 absolute hidden bg-primary blur-[14rem] rounded-full w-72 h-72"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />
            <motion.div 
                className="lg:block -bottom-1/4 -left-1/4 -z-10 absolute hidden bg-primary blur-[14rem] rounded-full w-72 h-72"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [360, 180, 0],
                }}
                transition={{
                    duration: 25,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />

            <AnimationContainer>
                <motion.div 
                    className="flex flex-col justify-center items-center mx-auto max-w-2xl text-center text-white"
                    variants={itemVariants}
                >
                    <Badge variant="outline" className="flex items-center">
                        <Microscope className="mr-2 w-4 h-4" />
                        <motion.span 
                            className="bg-clip-text font-bold text-4xl text-center text-transparent text-white leading-none whitespace-pre-wrap pointer-events-none"
                            animate={{
                                backgroundPosition: ["0%", "100%"],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            BioNexus AI
                        </motion.span>
                    </Badge>
                    <motion.h2 
                        className="bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 mt-6 font-bold text-center text-transparent text-xl lg:text-7xl xl:text-4xl leading-none whitespace-pre-wrap pointer-events-none"
                        animate={{
                            backgroundPosition: ["0%", "100%"],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    >
                        Revolutionizing<br/>
                        Healthcare Research
                    </motion.h2>
                    <motion.p 
                        className="bg-clip-text bg-gradient-to-b from-purple-600 dark:from-white to-pink-600 dark:to-slate-900/10 mt-20 font-semibold text-6xl text-center text-transparent leading-none whitespace-pre-wrap pointer-events-none"
                        variants={itemVariants}
                    >
                        Accelerating drug discovery and improving patient outcomes through AI-powered healthcare research.
                    </motion.p>
                    <motion.div 
                        className="flex justify-center items-center space-x-4 mt-8"
                        variants={itemVariants}
                    >
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                            <Dna className="w-8 h-8 text-blue-400" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                            <Brain className="w-8 h-8 text-purple-400" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                            <Pill className="w-8 h-8 text-green-400" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                            <HeartPulse className="w-8 h-8 text-red-400" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                            <Stethoscope className="w-8 h-8 text-teal-400" />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button variant="outline" className="bg-gradient-to-r from-purple-600 to-blue-700 mt-8 py-6 rounded-full w-full text-lg" asChild>
                            <a href="/dashboard" className="font-bold text-xl">Learn More</a>
                        </Button>
                    </motion.div>
                </motion.div>
            </AnimationContainer>

            <motion.div 
                className="gap-6 grid grid-cols-1 md:grid-cols-3 mt-10 lg:mt-16 w-full max-w-5xl"
                variants={containerVariants}
            >
                <AnimatePresence>
                    {offerings.map((offering, index) => (
                        <AnimationContainer key={offering.id} delay={0.1 * index + 0.1}>
                            <Offering 
                                key={offering.id}
                                title={offering.title}
                                description={offering.description}
                                href={offering.href}
                                icon={offering.icon}
                            />
                        </AnimationContainer>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

const Offering = ({ title, description, icon: Icon, href }: Props) => {
    return (
        <motion.div 
            className="flex flex-col items-start bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 shadow-lg hover:shadow-2xl p-6 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 2, backgroundPosition: ["0%", "100%"] }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <motion.div 
                className="flex justify-center items-center bg-white shadow-md rounded-full w-12 h-12"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
            >
                <Icon className="w-6 h-6 text-purple-700" />
            </motion.div>
            <motion.h3 
                className="mt-4 font-medium text-lg text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                {title}
            </motion.h3>
            <motion.p 
                className="mt-2 text-gray-200 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                {description}
            </motion.p>
            <motion.div
                className="mt-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <motion.button
                    className="bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 shadow-lg hover:shadow-xl px-4 py-2 rounded-full w-full font-bold text-white transition-all duration-300"
                    whileHover={{ scale: 1.05, backgroundPosition: ["0%", "100%"] }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <a href={href} className="block w-full h-full">Learn More</a>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Offerings;

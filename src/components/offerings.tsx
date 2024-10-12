"use client";

import { offerings } from './constants';
import { LucideIcon, Microscope, Dna, Brain, Pill, HeartPulse, Stethoscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimationContainer from "./animation-container";

import { motion } from 'framer-motion';

interface Props {
    title: string;
    description: string;
    icon: LucideIcon;
}

const Offerings = () => {
    return (
        <div className="flex flex-col relative items-center justify-center py-20">
            {/* Background Shapes */}
            <div className="hidden lg:block absolute top-0 -right-1/5 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]" />
            <div className="hidden lg:block absolute -bottom-1/4 -left-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]" />

            <AnimationContainer>
                <div className="flex flex-col items-center justify-center mx-auto max-w-2xl text-white text-center">
                    <Badge variant="outline" className="flex items-center">
                        <Microscope className="w-4 h-4 mr-2" />
                        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-white to-violet-600 bg-clip-text text-center text-4xl font-bold leading-none text-transparent ">
                            BioNexus AI
                        </span>
                    </Badge>
                    <h2 className="text-xl mt-6 lg:text-7xl font-bold xl:text-4xl  pointer-events-none whitespace-pre-wrap bg-gradient-to-r from-white via-purple-500 to-blue-500 bg-clip-text text-center leading-none text-transparent">
                        Revolutionizing<br/>
                        Healthcare Research
                    </h2>
                    <p className="mt-20 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white/90 to-gray-300/80 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                        Accelerating drug discovery and improving patient outcomes through AI-powered healthcare research.
                    </p>
                    <div className="flex items-center justify-center space-x-4 mt-8">
                        <Dna className="w-8 h-8 text-blue-400" />
                        <Brain className="w-8 h-8 text-purple-400" />
                        <Pill className="w-8 h-8 text-green-400" />
                        <HeartPulse className="w-8 h-8 text-red-400" />
                        <Stethoscope className="w-8 h-8 text-teal-400" />
                    </div>
                </div>
            </AnimationContainer>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-10 lg:mt-16">
                {offerings.map((offering, index) => (
                    <AnimationContainer key={offering.id} delay={0.1 * index + 0.1}>
                        <Offering key={offering.id} {...offering} />
                    </AnimationContainer>
                ))}
            </div>
        </div>
    );
};

const Offering = ({ title, description, icon: Icon }: Props) => {
    return (
        <motion.div 
            className="flex flex-col items-start p-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
                <Icon className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="text-lg font-medium mt-4 text-white">
                {title}
            </h3>
            <p className="text-sm text-gray-200 mt-2">
                {description}
            </p>
        </motion.div>
    );
};

export default Offerings;

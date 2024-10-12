"use client";

import * as Icons from './icons'; // Ensure Icons.Ecosystem is defined in this file
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

import { BorderBeam } from '@/components/ui/border-beam';
import { Feature } from './features-list';

interface FeatureCardProps {
  feature: Feature;
  href: string; 
}

export function FeatureCard({ feature: { description, id, title }, href }: FeatureCardProps) {
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);

  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;

  const borderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!borderRef.current) return;

      const borderRect = borderRef.current.getBoundingClientRect();
      offsetX.set(e.clientX - borderRect.left);
      offsetY.set(e.clientY - borderRect.top);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [offsetX, offsetY]);

  return (
    <div
      key={id}
      className="relative flex-1 rounded-xl border border-blue-950 dark:border-blue-200 px-5 py-10 text-center"
    >
      <motion.div
        ref={borderRef}
        className="absolute inset-0 rounded-xl border-2 border-purple-400"
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
        }}
      />
      <BorderBeam size={150} duration={12} delay={9} />
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-white text-black">
        <Icons.Ecosystem className="h-5 w-5" weight="bold" /> {/* Ensure this icon is correctly defined */}
      </div>
      <h3 className="mt-6 font-extrabold text-xl text-blue-600 dark:text-white">{title}</h3>
      <p className="mt-2 text-slate-800 dark:text-white/80">{description}</p>

      {/* Ensure that the Link works properly */}
      <Link href={href} passHref>
        <div className="mt-6 inline-block px-8 py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 ease-in-out cursor-pointer">
          Learn More
        </div>
      </Link>
    </div>
  );
}

export default FeatureCard;
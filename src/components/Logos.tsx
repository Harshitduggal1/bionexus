"use client";

import WordPullUp from "@/components/ui/word-pull-up";
import acmelogo from "@/app/assets/logo-acme.png";
import apexLogo from "@/app/assets/logo-apex.png";
import celestialLogo from "@/app/assets/logo-celestial.png";
import echoLogo from "@/app/assets/logo-echo.png";
import { motion } from "framer-motion";
import pulseLogo from "@/app/assets/logo-pulse.png";
import quantumLogo from "@/app/assets/logo-quantum.png";

export const LogoTicker = () => {
  return (
    <section className="w-[90%] m-auto md:container h-[40vh] flex flex-col items-center justify-center">
      {/* Text is centered and pushed down slightly */}
      <WordPullUp
  className="
    text-2xl 
    mt-24
    text-gray-600
    md:text-6xl 
    md:leading-[5rem] 
    text-center 
    w-full 
    mb-4 
  "
  words="Companies that trust us🎉"
/>


      {/* Animation Div */}
      <div className="w-full flex items-center  overflow-hidden">
        <div className="flex flex-1 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] overflow-hidden">
          <motion.div
            initial={{ translateX: "-100%" }}
            animate={{
              translateX: "0%",
              transition: {
                repeat: Infinity,
                ease: "linear",
                duration: 20,
              },
            }}
            className="flex gap-10"
          >
            {[
              acmelogo,
              apexLogo,
              celestialLogo,
              quantumLogo,
              pulseLogo,
              echoLogo,
              acmelogo,
              apexLogo,
              celestialLogo,
              quantumLogo,
              pulseLogo,
              echoLogo,
            ].map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt={`Logo for ${logo.src}`}
                key={logo.src}
                className="w-auto h-12"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
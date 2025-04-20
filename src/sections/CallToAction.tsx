"use client";

import Button from "@/components/Button";
import starbg from "@/assets/stars.png";
import gridLine from "@/assets/grid-lines.png";
import {
  useScroll,
  useTransform,
  motion,
  useMotionTemplate,
  useMotionValue,
  useInView,
} from "framer-motion";
import { RefObject, useEffect, useRef, useCallback } from "react";

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} className="mb-5">
      <motion.div 
        className="container flex flex-col gap-4"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="flex flex-col md:flex-row lg:flex-row gap-4"
          variants={containerVariants}
        >
          <motion.div 
            variants={fadeUpVariants}
            style={{ backdropFilter: "blur(100px)" }} 
            className="backdrop-blur-lg flex-1"
          >
            <div className="h-60 w-full p-0 border border-white/20 rounded-lg">
              <div className="h-full relative w-full bg-[radial-gradient(circle_at_0%_-40%,#fcd34d,#ae5534,transparent_50%)] rounded-lg">
                <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
                  <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-5xl tracking-tighter font-sans text-center text-white">Diet plan</motion.h2>
                  <motion.p variants={fadeUpVariants} className="text-sm md:text-md text-white/50 font-sans tracking-tighter text-center max-w-xs md:tracking-tight md:max-w-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nostrum aut ab doloremque quaerat od amet!
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeUpVariants}
            style={{ backdropFilter: "blur(100px)" }} 
            className="backdrop-blur-lg flex-1"
          >
            <div className="h-60 w-full p-0 border border-white/20 rounded-lg">
              <div className="h-full relative w-full bg-[radial-gradient(circle_at_100%_-40%,aqua,#1c63a4,transparent_50%)] rounded-lg">
                <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
                  <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-5xl tracking-tighter font-sans text-center text-white">Work plan</motion.h2>
                  <motion.p variants={fadeUpVariants} className="text-sm md:text-md text-white/50 font-sans tracking-tight text-center max-w-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nostrum aut ab doloremque quaerat od amet!
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeUpVariants}
          transition={{delay:1}}
          className="w-full h-56 border border-white/20 p-0 rounded-lg relative"
        >
          <div className="absolute inset-0 h-full w-full md:bg-[radial-gradient(circle_at_-20%_-280%,#fcd34d_40%,#ae5534,transparent_60%)] bg-[radial-gradient(circle_at_-20%_-120%,#fcd34d_40%,#ae5534,transparent_60%)] lg:bg-[radial-gradient(circle_at_-20%_-280%,#fcd34d_40%,#ae5534,transparent_60%)] rounded-lg"></div>
          <div className="absolute inset-0 h-full w-full md:bg-[radial-gradient(circle_at_110%_290%,aqua_30%,#1c63a4,transparent_50%)] lg:bg-[radial-gradient(circle_at_110%_290%,aqua_30%,#1c63a4,transparent_50%)] bg-[radial-gradient(circle_at_110%_130%,aqua_0%,#1c63a4,transparent_50%)] rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
            <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-5xl tracking-tighter font-sans text-center text-white">Poster analysis</motion.h2>
            <motion.p variants={fadeUpVariants} className="text-sm md:text-md text-white/50 font-sans tracking-tight text-center max-w-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nostrum aut ab doloremque quaerat od amet!
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
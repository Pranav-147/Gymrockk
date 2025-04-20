'use client'

import Button from "@/components/Button"
import starbg from "@/assets/stars.png"
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import styles from "./Hero.module.css"

export const Hero = () => {
  return (
    <section >
      
      <div className="container p-2  lg:mt-5 md:mt-5 mt-16    ">

        <div className="text-center max-w-full mx-auto mt-8">
          <div className="text-4xl lg:text-7xl tracking-tight md:text-6xl font-medium mb-6 mx-auto sm:max-w-xs md:max-w-md lg:max-w-3xl">
            Ready to <span className="italic font-serif ">scale</span> your body with our ai
          </div>
          <div className="text-white/50 md:text-xl lg:text-xl text-md  tracking-tighter mx-auto max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam illo facilis alias enim cumq
          </div>
          <button className="bg-orange-600 mt-6 rounded-lg p-2">Sign up</button>
        </div>

        <div className="backdrop-blur mt-16 md:mt-0 lg:mt-0 items-center justify-center flex overflow-hidden">
          <motion.div 
            animate={{rotate: 360}} 
            transition={{duration: 5, repeat: Infinity, ease: "linear"}}
            className="orb z-10 relative md:top-32 lg:top-32 top-24 h-40 w-40 md:h-60 md:w-60 rounded-full shadow-[-40px_-40px_50px_#ff8c00,40px_-40px_50px_#ff8c00,40px_40px_50px_#fffa5b,-40px_40px_50px_#ff8c00]"
            style={{
              filter: "blur(10px)"
            }}
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_right,#eb5d0f,transparent)]"></div>
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_bottom_left,#eb5d0f,transparent)]"></div>
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_left,#eb5d0f,transparent)]"></div>
            <div className="absolute  inset-0 rounded-full bg-[radial-gradient(circle_at_bottom_right,#fffa5b,transparent)]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

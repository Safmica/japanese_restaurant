"use client"

import React, {useRef} from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Parallax () {
  const ref = useRef<HTMLDivElement>(null);

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0,1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0,1], ["0%", "200%"])

  return (
    <div ref={ref} className="w-full h-screen relative overflow-hidden grid place-items-center">
      <motion.h1  
        style={{
          y:textY
        }}
        className="text-9xl text-white z-10">Parallax</motion.h1>
      <motion.div
        style={{ 
          backgroundImage: 'url(/bg1.jpg)',
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y:backgroundY
         }}
         className="absolute inset-0 z-0"
         >
      </motion.div>
      <div
        style={{ 
          backgroundImage: 'url(/bg2.jpg)',
          backgroundPosition: "bottom",
          backgroundSize: "cover",
         }}
         className="absolute inset-0 z-20"
         >
      </div>
    </div>
  )
}
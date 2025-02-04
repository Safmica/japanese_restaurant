"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setScreenSize({ width: window.outerWidth, height: window.outerHeight });

    const handleResize = () => {
      setScreenSize({ width: window.outerWidth, height: window.outerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={ref} className="relative w-full min-h-screen overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }} 
        className="absolute top-0 left-0 w-full"
      >
        <Image
          src="/images/homeBackground.png"
          alt="Background"
          width={screenSize.width}
          height={screenSize.height}
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
          className="transition-opacity duration-300 opacity-100"
        />
      </motion.div>

      <motion.div 
        style={{ y: textY }} 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen"
      >
        <h1 className="text-9xl text-white font-toragon text-center">
          Kaisei
        </h1>
        <h1 className="text-4xl text-white font-jansina text-center">
          Japanese Restaurant
        </h1>
      </motion.div>

      <div className="h-[200vh] bg-gray-900"></div>
    </div>
  );
}

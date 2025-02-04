"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
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

  const scrollY = useMotionValue(0);
  
  useEffect(() => {
    const updateScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, [scrollY]);

  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20 });

  const backgroundY1 = useTransform(smoothScrollY, [0, screenSize.height], ["0%", "-50%"]);
  const backgroundY2 = useTransform(smoothScrollY, [screenSize.height, screenSize.height * 2], ["100%", "0%"]); // Gambar kedua masuk setelah pertama berhenti

  const textY1 = useTransform(smoothScrollY, [0, screenSize.height * 0.5, screenSize.height], ["0%", "0%", "-130%"]);
  const textY2 = useTransform(smoothScrollY, [0, screenSize.height * 0.3, screenSize.height * 0.5, screenSize.height], ["100%", "100%", "30%", "-100%"]);

  return (
    <div ref={ref} className="relative w-full min-h-[600vh] overflow-hidden">
      <motion.div 
        style={{ y: backgroundY1 }} 
        className="fixed top-0 left-0 w-full"
      >
        <Image
          src="/images/homeBackground.png"
          alt="Background 1"
          width={screenSize.width}
          height={screenSize.height}
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="transition-opacity duration-300 opacity-100 filter brightness-75"
        />
      </motion.div>

      <motion.div 
        style={{ y: textY1 }} 
        className="fixed left-[25%] z-10 flex flex-col items-center justify-center min-h-screen w-1/2"
      >
        <h1 className="text-9xl text-white font-toragon text-center">
          Kaiseii
        </h1>
        <h1 className="text-4xl text-white font-jansina text-center">
          Japanese Restaurant
        </h1>
      </motion.div>

      <motion.div 
        style={{ y: textY2 }} 
        className="fixed left-[25%] z-10 flex flex-col items-center justify-center min-h-screen w-1/2"
      >
        <h1 className="text-2xl text-white text-center font-olivera">
        Kaisei, where Japan’s essence comes alive, A culinary journey where traditions thrive. With flavors deep and ambiance true, Every dish brings Japan to you. From sushi’s grace to ramen’s embrace, Matcha’s warmth and tempura’s taste. In lantern-lit halls, where echoes stay, Kaisei invites you an escape away.
        </h1>
      </motion.div>

      <motion.div 
        style={{ y: backgroundY2 }} 
        className="fixed top-0 left-0 w-full"
      >
        <Image
          src="/images/bg2.jpg"
          alt="Background 2"
          width={screenSize.width}
          height={screenSize.height}
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          className="transition-opacity duration-300 opacity-100"
        />
      </motion.div>
    </div>
  );
}

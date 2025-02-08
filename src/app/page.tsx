"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";


export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

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

  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 20, mass: 0.1 });

  const backgroundY1 = useTransform(smoothScrollY, [0, screenSize.height * 0.6], ["0%", "-50%"]);
  const backgroundY2 = useTransform(smoothScrollY, [screenSize.height * 0.6, screenSize.height * 0.9, screenSize.height * 1.6], ["50%", "-5%", "-50%"])
  const backgroundY3 = useTransform(smoothScrollY, [screenSize.height * 1.6, screenSize.height * 2], ["100%", "0%"])

  const textY1 = useTransform(smoothScrollY, [0, screenSize.height * 0.9, screenSize.height * 1.4], ["0%", "0%", "-130%"]);
  const textY2 = useTransform(smoothScrollY, [0, screenSize.height * 0.7, screenSize.height * 0.9, screenSize.height * 1.4], ["100%", "100%", "30%", "-100%"]);

  return (
    <div ref={ref} className="relative w-full min-h-[300vh] overflow-hidden">
      <motion.div layout
        style={{
          y: backgroundY1,
          transform: "translateZ(0)",
          willChange: "transform"
        }} 
        className="fixed top-0 left-0 w-full"
        initial={{ scale: 1.2, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 6, 
          ease: "easeOut", 
        }}
      >
        <Image
          src="/images/homeBackground.png"
          alt="Background 1"
          width={screenSize.width}
          height={screenSize.height}
          style={{ objectFit: "cover", objectPosition: "center" }}
          quality={50}
          priority
          className="transition-opacity duration-300 opacity-100 filter brightness-75"
        />
      </motion.div>

      <motion.div layout
        ref={textRef}
        style={{ y: textY1,           transform: "translateZ(0)",
          willChange: "transform" }} 
        className="fixed left-[25%] z-10 flex flex-col items-center justify-center min-h-screen w-1/2">
        <motion.h1 
          initial={{ x: "-20%", opacity: 0 }}
          animate={{ x: 0, opacity: 1, rotate: [-5, 3, -2, 1, 0] }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 120,
            damping: 10,
            rotate: {
              duration: 1.2,
              ease: "easeInOut",
              repeat: 0,
              repeatType: "reverse",
            },
          }}
          className="text-9xl text-white font-toragon text-center"
        >
          Kaisei
        </motion.h1>

        <motion.h1 layout
          initial={{ x: "20%", opacity: 0 }}
          animate={{ x: 0, opacity: 1, rotate: [5, -3, 2, -1, 0] }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.3,
            rotate: {
              duration: 1.2,
              ease: "easeInOut",
              repeat: 0,
              repeatType: "reverse",
            },
          }}
          className="text-4xl text-white font-jansina text-center"
        >
          Japanese Restaurant
        </motion.h1>
      </motion.div>

      <motion.div layout
        style={{ y: textY2,          transform: "translateZ(0)",
          willChange: "transform" }} 
        className="fixed left-[25%] z-10 flex flex-col items-center justify-center min-h-screen w-1/2"
      >
        <h1 className="text-2xl text-white text-center font-olivera">
        Kaisei, where Japan’s essence comes alive, A culinary journey where traditions thrive. With flavors deep and ambiance true, Every dish brings Japan to you. From sushi’s grace to ramen’s embrace, Matcha’s warmth and tempura’s taste. In lantern-lit halls, where echoes stay, Kaisei invites you an escape away.
        </h1>
      </motion.div>

      <motion.div layout
        style={{
          y: backgroundY2,
          transform: "translateZ(0)",
          willChange: "transform"
        }} 
        className="fixed top-0 left-0 w-full"
      >
        <Image
          src="/images/home2.png"
          alt="Background 2"
          width={screenSize.width}
          height={screenSize.height}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%)"
          }}
          quality={50}
          typeof="webp"
          className="transition-opacity duration-300 opacity-100 brightness-75"
        />
      </motion.div>
      <motion.div
      style={{
        y : backgroundY3,
      }}
      className="fixed top-0 left-0 w-full h-screen bg-amber-100"
    />

    </div>
  );
}
